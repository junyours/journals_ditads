import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Magazine() {
  return (
    <div>Magazine</div>
  )
}

Magazine.layout = (page) => (
    <AuthenticatedLayout children={page} title="Magazines" />
);
