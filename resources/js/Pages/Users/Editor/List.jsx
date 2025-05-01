import { Button } from "@/Components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { useForm, usePage } from "@inertiajs/react";
import InputError from "@/Components/input-error";
import { toast } from "sonner";
import {
    LoaderCircle,
    User,
    Plus,
    MoreHorizontal,
    UserPen,
} from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/Components/ui/sheet";
import { DataTable } from "@/Components/table/data-table";
import { ColumnHeader } from "@/Components/table/column-header";
import Avatar from "../../../../../public/images/user.png";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

const positions = ["Editor in chief", "Associate editor", "Editorial board"];

const List = () => {
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            id: null,
            name: "",
            email: "",
            avatar: null,
            position: "",
            school: "",
        });
    const { editors } = usePage().props;
    const [previewAvatar, setPreviewAvatar] = useState(null);
    const [editData, setEditData] = useState(false);

    const handleOpen = (editor = null) => {
        if (editor) {
            setEditData(true);
            setData({
                id: editor.id,
                name: editor.name,
                email: editor.email,
                position: editor.position,
                school: editor.school,
            });
            if (editor.avatar) {
                setPreviewAvatar(`/storage/users/avatar/${editor.avatar}`);
            } else {
                setPreviewAvatar(null);
            }
        } else {
            setEditData(false);
            reset();
            setPreviewAvatar(null);
        }
        setOpen(!open);
        clearErrors();
    };

    const handleAdd = () => {
        clearErrors();
        post(route("admin.user.add.editor"), {
            onSuccess: () => {
                reset();
                handleOpen();
                toast.success("Editor added successfully.");
            },
        });
    };

    const handleUpdate = () => {
        clearErrors();
        post(route("admin.user.update.editor"), {
            onSuccess: () => {
                reset();
                handleOpen();
                toast.success("Editor updated successfully.");
            },
        });
    };

    const columns = [
        {
            accessorKey: "avatar",
            header: "",
            cell: ({ row }) => {
                const editor = row.original;
                return (
                    <div className="size-8">
                        <img
                            src={
                                editor.avatar
                                    ? `/storage/users/avatar/${editor.avatar}`
                                    : Avatar
                            }
                            alt="user"
                            className="rounded-full object-cover"
                        />
                    </div>
                );
            },
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "position",
            header: ({ column }) => (
                <ColumnHeader column={column} title="Position" />
            ),
        },
        {
            accessorKey: "email",
            header: ({ column }) => (
                <ColumnHeader column={column} title="Email" />
            ),
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const editor = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => handleOpen(editor)}
                            >
                                <UserPen />
                                Edit
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    return (
        <>
            <DataTable
                columns={columns}
                data={editors}
                button={
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpen()}
                    >
                        <Plus />
                        Add
                    </Button>
                }
            />

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
                        <SheetTitle>
                            {editData ? "Edit Editor" : "Add Editor"}
                        </SheetTitle>
                        <SheetDescription>
                            Please provide the required information below.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="flex-1 space-y-4 overflow-y-auto px-2 pb-2">
                        <div className="space-y-1">
                            <Label>Avatar</Label>
                            <div className="flex items-center gap-4">
                                <div className="size-20">
                                    {previewAvatar ? (
                                        <img
                                            src={previewAvatar}
                                            alt="profile-picture"
                                            className="object-cover size-full"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center size-full bg-muted">
                                            <User size={40} />
                                        </div>
                                    )}
                                </div>
                                <Button
                                    onClick={() =>
                                        document
                                            .getElementById("avatar")
                                            .click()
                                    }
                                    size="sm"
                                    variant="outline"
                                >
                                    {previewAvatar ? "Change" : "Upload"}
                                </Button>
                                <input
                                    accept=".jpg,.jpeg,.png"
                                    id="avatar"
                                    type="file"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        setData("avatar", file);
                                        if (file) {
                                            const imageUrl =
                                                URL.createObjectURL(file);
                                            setPreviewAvatar(imageUrl);
                                        } else {
                                            setPreviewAvatar(null);
                                        }
                                    }}
                                    hidden
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <Label>Position</Label>
                            <Select
                                value={data.position}
                                onValueChange={(val) =>
                                    setData("position", val)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {positions.map((position) => (
                                            <SelectItem
                                                key={position}
                                                value={position}
                                            >
                                                {position}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.position} />
                        </div>
                        <div className="space-y-1">
                            <Label>Name</Label>
                            <Input
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div className="space-y-1">
                            <Label>School</Label>
                            <Input
                                value={data.school}
                                onChange={(e) =>
                                    setData("school", e.target.value)
                                }
                            />
                            <InputError message={errors.school} />
                        </div>
                        <div className="space-y-1">
                            <Label>Email Address</Label>
                            <Input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <InputError message={errors.email} />
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
                        <Button
                            onClick={editData ? handleUpdate : handleAdd}
                            disabled={processing}
                        >
                            {processing && (
                                <LoaderCircle className="size-4 animate-spin" />
                            )}
                            {editData ? "Update" : "Save"}
                        </Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </>
    );
};

List.layout = (page) => <AuthenticatedLayout children={page} title="Editors" />;

export default List;
