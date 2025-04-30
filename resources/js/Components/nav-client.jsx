import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from "@/Components/ui/sidebar";
import { Link } from "@inertiajs/react";
import {
    ChevronRight,
    ClipboardList,
    FolderSync,
    LayoutDashboard,
    Loader,
    NotebookPen,
} from "lucide-react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "./ui/collapsible";
import { useIsMobile } from "@/hooks/use-mobile";

const menugroups = [
    {
        name: "Main",
        menus: [
            {
                title: "Dashboard",
                url: "/client/dashboard",
                icon: LayoutDashboard,
                collapse: false,
            },
        ],
    },
    {
        name: "Journal",
        menus: [
            {
                title: "My Requests",
                url: "/client/my-requests",
                icon: NotebookPen,
                collapse: true,
                submenus: [
                    {
                        title: "Pending",
                        url: "/pending",
                    },
                    {
                        title: "Approved",
                        url: "/approved",
                    },
                    {
                        title: "Rejected",
                        url: "/rejected",
                    },
                ],
            },
            {
                title: "Progress Requests",
                url: "/client/progress/requests",
                icon: Loader,
                collapse: false,
            },
            {
                title: "Published Documents",
                url: "/client/published/documents",
                icon: FolderSync,
                collapse: true,
                submenus: [
                    {
                        title: "Unpaid",
                        url: "/unpaid",
                    },
                    {
                        title: "Paid",
                        url: "/paid",
                    },
                ],
            },
            {
                title: "Payment Transactions",
                url: "/client/payments/transactions",
                icon: ClipboardList,
                collapse: true,
                submenus: [
                    {
                        title: "Pending",
                        url: "/pending",
                    },
                    {
                        title: "Approved",
                        url: "/approved",
                    },
                    {
                        title: "Rejected",
                        url: "/rejected",
                    },
                ],
            },
        ],
    },
];

export function NavClient() {
    const { setOpenMobile } = useSidebar();
    const isMobile = useIsMobile();
    const currentPath = window.location.pathname;

    return menugroups.map((menugroup) => (
        <SidebarGroup key={menugroup.name}>
            <SidebarGroupLabel>{menugroup.name}</SidebarGroupLabel>
            <SidebarMenu>
                {menugroup.menus.map((menu) =>
                    menu.collapse ? (
                        <Collapsible
                            key={menu.title}
                            asChild
                            className="group/collapsible"
                            defaultOpen={
                                currentPath.startsWith(menu.url) ? true : false
                            }
                        >
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton tooltip={menu.title}>
                                        <menu.icon />
                                        <span>{menu.title}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {menu.submenus?.map((submenu) => (
                                            <SidebarMenuSubItem
                                                key={submenu.title}
                                                onClick={() => {
                                                    if (isMobile) {
                                                        setOpenMobile(false);
                                                    }
                                                }}
                                            >
                                                <SidebarMenuSubButton
                                                    asChild
                                                    isActive={
                                                        currentPath.startsWith(
                                                            menu.url +
                                                                submenu.url
                                                        )
                                                            ? true
                                                            : false
                                                    }
                                                >
                                                    <Link
                                                        href={
                                                            menu.url +
                                                            submenu.url
                                                        }
                                                    >
                                                        <span>
                                                            {submenu.title}
                                                        </span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ) : (
                        <SidebarMenuItem
                            key={menu.title}
                            onClick={() => {
                                if (isMobile) {
                                    setOpenMobile(false);
                                }
                            }}
                        >
                            <SidebarMenuButton
                                tooltip={menu.title}
                                asChild
                                isActive={
                                    currentPath.startsWith(menu.url)
                                        ? true
                                        : false
                                }
                            >
                                <Link href={menu.url}>
                                    <menu.icon />
                                    <span>{menu.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                )}
            </SidebarMenu>
        </SidebarGroup>
    ));
}
