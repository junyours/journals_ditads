import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";
import { DataTable } from "@/Components/table/data-table";
import { ColumnHeader } from "@/Components/table/column-header";
import Avatar from "../../../../../public/images/user.png";

const columns = [
    {
        accessorKey: "avatar",
        header: "",
        cell: ({ row }) => {
            const client = row.original;
            return (
                <div className="size-8">
                    <img
                        src={
                            client.avatar
                                ? `/storage/users/avatar/${client.avatar}`
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
        accessorKey: "email",
        header: ({ column }) => <ColumnHeader column={column} title="Email" />,
    },
];

const List = () => {
    const { clients } = usePage().props;

    return <DataTable columns={columns} data={clients} />;
};

List.layout = (page) => <AuthenticatedLayout children={page} title="Clients" />;

export default List;
