import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Link, useForm } from "@inertiajs/react";
import { InputPassword } from "@/Components/input-password";
import GuestLayout from "@/Layouts/GuestLayout";
import { LoaderCircle } from "lucide-react";
import InputError from "@/Components/input-error";

export default function Register() {
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleRegister = (e) => {
        e.preventDefault();
        clearErrors();
        post(route("register"));
    };

    return (
        <GuestLayout
            title="Register an account"
            description="Enter your details below to create your account."
        >
            <form onSubmit={handleRegister} className="space-y-6">
                <div className="space-y-4">
                    <div className="space-y-1">
                        <Label>Name</Label>
                        <Input
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        <InputError message={errors.name} />
                    </div>
                    <div className="space-y-1">
                        <Label>Email address</Label>
                        <Input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <InputError message={errors.email} />
                    </div>
                    <div className="space-y-1">
                        <Label>Password</Label>
                        <InputPassword
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                        <InputError message={errors.password} />
                    </div>
                    <div className="space-y-1">
                        <Label>Confirm password</Label>
                        <InputPassword
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>
                </div>
                <Button className="w-full" disabled={processing}>
                    {processing && (
                        <LoaderCircle className="size-4 animate-spin" />
                    )}
                    Create account
                </Button>
                <div className="text-muted-foreground text-center text-sm">
                    Already have an account?{" "}
                    <Link href={route("login")} className="hover:underline">
                        Log in
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
