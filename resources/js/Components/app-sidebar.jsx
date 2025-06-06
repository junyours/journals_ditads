import * as React from "react";
import { NavUser } from "@/Components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/Components/ui/sidebar";
import { Link, usePage } from "@inertiajs/react";
import { NavAdmin } from "./nav-admin";
import { NavClient } from "./nav-client";
import NavEditor from "./nav-editor";
import AppLogo from "./app-logo";

export function AppSidebar() {
    const user = usePage().props.auth.user;

    return (
        <Sidebar variant="floating" collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Link href={route("welcome")}>
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            >
                                <div className="flex aspect-square size-8 items-center justify-center">
                                    <AppLogo />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        {import.meta.env.VITE_APP_NAME}
                                    </span>
                                </div>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {user.role === "admin" && <NavAdmin />}
                {user.role === "editor" && <NavEditor />}
                {user.role === "client" && <NavClient />}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
