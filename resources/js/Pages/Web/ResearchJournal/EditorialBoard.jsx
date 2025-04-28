import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";

export default function EditorialBoard({ editors }) {
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {editors.map((editor, index) => (
                <Card key={index} className="shadow-none">
                    <div className="h-[250px] w-full">
                        <img
                            src={`/storage/users/avatar/${editor.avatar}`}
                            alt="avatar"
                            className="object-cover size-full rounded-t-lg"
                        />
                    </div>
                    <CardHeader className="space-y-4">
                        <div className="space-y-2">
                            <div>
                                <h1 className="font-medium">{editor.name}</h1>
                                <p className="text-xs">{editor.email}</p>
                            </div>
                            <CardTitle className="capitalize">
                                {editor.position}
                            </CardTitle>
                        </div>
                        <CardDescription>{editor.school}</CardDescription>
                    </CardHeader>
                </Card>
            ))}
        </div>
    );
}
