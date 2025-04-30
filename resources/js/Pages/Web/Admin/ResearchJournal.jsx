import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { File, LoaderCircle, Plus, Settings2 } from "lucide-react";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import InputError from "@/Components/input-error";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/Components/ui/sheet";

const ResearchJournal = () => {
    const { journals, documents } = usePage().props;
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        id: null,
        title: "",
        author: "",
        abstract: "",
        keyword: "",
    });
    const [search, setSearch] = useState("");

    const handleOpen = () => {
        setOpen(!open);
        clearErrors();
    };

    const handleSave = () => {
        clearErrors();
        post(route("admin.web.research.journal.upload"), {
            onSuccess: () => {
                handleOpen();
            },
        });
    };

    const searchTimeoutRef = useRef(null);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(() => {
            router.get(
                route("admin.web.research.journal"),
                { search: value },
                { preserveState: true }
            );
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
        router.get(url, {}, { preserveState: true });
    };

    return (
        <>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="w-full sm:max-w-xs">
                        <Input
                            value={search}
                            onChange={handleSearch}
                            placeholder="Search"
                        />
                    </div>
                    <Button onClick={() => handleOpen()} variant="outline">
                        <Plus />
                        Upload
                    </Button>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Document Name</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {journals.data.length > 0 ? (
                            journals.data.map((journal, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{journal.title}</TableCell>
                                    <TableCell>
                                        {journal.assign_editor.published_file
                                            .split("/")
                                            .pop()}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <span className="sr-only">
                                                        Open menu
                                                    </span>
                                                    <Settings2 />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        window.open(
                                                            `/storage/journal/published_files/${journal.assign_editor.published_file}`,
                                                            "_blank"
                                                        )
                                                    }
                                                    className="cursor-pointer"
                                                >
                                                    <File />
                                                    Read Full Document
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="h-24 text-center"
                                >
                                    {search
                                        ? `No matching found for "${search}"`
                                        : "No data available."}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                {journals.data.length > 0 && (
                    <div className="flex justify-end">
                        <div>
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() =>
                                                handlePage(
                                                    journals.prev_page_url
                                                )
                                            }
                                            className="cursor-pointer"
                                        />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() =>
                                                handlePage(
                                                    journals.next_page_url
                                                )
                                            }
                                            className="cursor-pointer"
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                )}
            </div>

            <Sheet
                open={open}
                onOpenChange={() => {
                    if (!processing) {
                        handleOpen();
                    }
                }}
            >
                <SheetContent className="flex flex-col">
                    <SheetHeader>
                        <SheetTitle>Upload Research Journal</SheetTitle>
                        <SheetDescription>
                            Upload a published journal to display on the site.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="flex-1 space-y-4 overflow-y-auto px-2 pb-2">
                        <div className="space-y-1">
                            <Label>Document</Label>
                            <Select
                                value={data.id || ""}
                                onValueChange={(val) => setData("id", val)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    {documents.map((document, index) => (
                                        <SelectItem
                                            key={index}
                                            value={document.id}
                                        >
                                            {document.published_file}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.id} />
                        </div>
                        <div className="space-y-1">
                            <Label>Title</Label>
                            <Input
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                            />
                            <InputError message={errors.title} />
                        </div>
                        <div className="space-y-1">
                            <Label>Author/s</Label>
                            <Input
                                value={data.author}
                                onChange={(e) =>
                                    setData("author", e.target.value)
                                }
                            />
                            <InputError message={errors.author} />
                        </div>
                        <div className="space-y-1">
                            <Label>Abstract</Label>
                            <Textarea
                                value={data.abstract}
                                onChange={(e) =>
                                    setData("abstract", e.target.value)
                                }
                            />
                            <InputError message={errors.abstract} />
                        </div>
                        <div className="space-y-1">
                            <Label>Keyword/s</Label>
                            <Input
                                value={data.keyword}
                                onChange={(e) =>
                                    setData("keyword", e.target.value)
                                }
                            />
                            <InputError message={errors.keyword} />
                        </div>
                    </div>
                    <SheetFooter>
                        <Button
                            onClick={handleOpen}
                            variant="ghost"
                            disabled={processing}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleSave} disabled={processing}>
                            {processing && (
                                <LoaderCircle className="size-4 animate-spin" />
                            )}
                            Save
                        </Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </>
    );
};

ResearchJournal.layout = (page) => (
    <AuthenticatedLayout children={page} title="Research Journals" />
);

export default ResearchJournal;
