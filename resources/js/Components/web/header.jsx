import { useState } from "react";
import AppLogo from "../app-logo";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import NavMenu from "./nav-menu";
import { Link, usePage } from "@inertiajs/react";

export default function Header() {
    const [open, setOpen] = useState(false);
    const user = usePage().props.auth.user;

    return (
        <header className="fixed bg-background w-full border-b">
            <div className="h-16 container mx-auto flex justify-between items-center px-4">
                <div className="flex justify-start">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="size-10">
                            <AppLogo />
                        </div>
                        <span className="font-bold text-lg">
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
                                    <Button variant="ghost">Log in</Button>
                                </Link>
                                <Link href={route("register")}>
                                    <Button variant="outline">Register</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
