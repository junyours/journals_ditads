import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { router, useForm, usePage } from "@inertiajs/react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination"
import { useEffect, useRef, useState } from "react"
import { Input } from "@/Components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { Download, Settings2, UserPen } from "lucide-react"
import { Button } from "@/Components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"

const Rejected = () => {
  const { assigns, editors } = usePage().props
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false)
  const { processing, setData, post, reset } = useForm({
    editor_id: null,
    id: null
  })

  const handleOpen = (id) => {
    if (id) {
      setData('id', id)
    } else {
      reset()
    }
    setOpen(!open)
  }

  const handleChangeEditor = () => {
    post(route('admin.assigned.editor.update.editor'), {
      onSuccess: () => {
        handleOpen()
      }
    })
  }

  const searchTimeoutRef = useRef(null);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      router.get(route('admin.assigned.editor.rejected'), { search: value }, { preserveState: true });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const handlePage = (url) => {
    router.get(url, {}, { preserveState: true })
  }

  return (
    <>
      <div className='space-y-4'>
        <div className='w-full sm:max-w-xs'>
          <Input value={search} onChange={handleSearch} placeholder="Search" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Request Number</TableHead>
              <TableHead>Client Name</TableHead>
              <TableHead>Editor Name</TableHead>
              <TableHead>Edited Document</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assigns.data.length > 0 ? (
              assigns.data.map((assign, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    {assign.request.request_number}
                  </TableCell>
                  <TableCell>
                    {assign.request.user.name}
                  </TableCell>
                  <TableCell>
                    {assign.user.name}
                  </TableCell>
                  <TableCell>
                    {assign.edited_file.split('/').pop()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <Settings2 />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => window.open(route('journal.download', { file: `edited_files/${assign.edited_file}` }), '_blank')} className="cursor-pointer">
                          <Download />Download Document
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleOpen(assign.id)} className="cursor-pointer">
                          <UserPen />Change Editor
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  {search ? `No matching found for "${search}"` : "No data available."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {assigns.data.length > 0 && (
          <div className='flex justify-end'>
            <div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious onClick={() => handlePage(assigns.prev_page_url)} className="cursor-pointer" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext onClick={() => handlePage(assigns.next_page_url)} className="cursor-pointer" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={() => handleOpen()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Editor</DialogTitle>
          </DialogHeader>
          <Select onValueChange={(val) => setData('editor_id', val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {editors.map((editor, index) => (
                  <SelectItem key={index} value={editor.id}>
                    {editor.first_name} {editor.last_name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button onClick={handleChangeEditor} disabled={processing}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

Rejected.layout = page => <AuthenticatedLayout children={page} title="Rejected Assigned Editors" />

export default Rejected