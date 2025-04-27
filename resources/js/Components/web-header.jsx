import { useState } from "react";
import { Menu } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import NavMenu from "./nav-menu";
import AppLogo from "./app-logo";
import { Button } from "./ui/button";

export default function WebHeader() {
    const [open, setOpen] = useState(false);
    const user = usePage().props.auth.user;

    return (
        <header className="border-b">
            <div className="h-16 container mx-auto grid grid-cols-3 items-center px-4">
                <div className="flex justify-start">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="size-12">
                            <AppLogo />
                        </div>
                        <span className="font-semibold text-base">
                            {import.meta.env.VITE_APP_NAME}
                        </span>
                    </Link>
                </div>
                <NavMenu open={open} onOpenChange={() => setOpen(false)} />
                <div className="hidden max-md:flex justify-end">
                    <Button
                        onClick={() => setOpen(true)}
                        size="icon"
                        variant="outline"
                    >
                        <Menu />
                    </Button>
                </div>
                <div className="hidden md:flex justify-end">
                    <div className="flex items-center gap-2">
                        {user ? (
                            <Link href={`/${user.role}/dashboard`}>
                                <Button>Dashboard</Button>
                            </Link>
                        ) : (
                            <>
                                <Link href={route("login")}>
                                    <Button variant="outline">Sign in</Button>
                                </Link>
                                <Link href={route("register")}>
                                    <Button>Get started</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
