import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function BookPublication() {
    return <div>BookPublication</div>;
}

BookPublication.layout = (page) => (
    <AuthenticatedLayout children={page} title="Book Publications" />
);
