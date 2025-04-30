import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/Components/ui/collapsible";
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
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "@inertiajs/react";
import {
    BookOpenText,
    BookText,
    ChevronRight,
    ClipboardList,
    FolderCog,
    FolderSync,
    Layers,
    LayoutDashboard,
    NotebookPen,
    UserPen,
    Users,
} from "lucide-react";

const menugroups = [
    {
        name: "Main",
        menus: [
            {
                title: "Dashboard",
                url: "/admin/dashboard",
                icon: LayoutDashboard,
                collapse: false,
            },
            {
                title: "Users",
                url: "/admin/users",
                icon: Users,
                collapse: true,
                submenus: [
                    {
                        title: "Editors",
                        url: "/editors",
                    },
                    {
                        title: "Clients",
                        url: "/clients",
                    },
                ],
            },
        ],
    },
    {
        name: "Journal",
        menus: [
            {
                title: "Services & Payments",
                url: "/admin/services_&_payments",
                icon: FolderCog,
                collapse: true,
                submenus: [
                    {
                        title: "Services",
                        url: "/services",
                    },
                    {
                        title: "Payment Methods",
                        url: "/payment_methods",
                    },
                ],
            },
            {
                title: "Requests",
                url: "/admin/requests",
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
                title: "Assigned Editors",
                url: "/admin/assigned/editors",
                icon: UserPen,
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
                title: "Published Documents",
                url: "/admin/published/documents",
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
                url: "/admin/payments/transactions",
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
    {
        name: "Web",
        menus: [
            {
                title: "Research Journals",
                url: "/admin/web/research-journals",
                icon: Layers,
                collapse: false,
            },
            {
                title: "Magazines",
                url: "/admin/web/magazines",
                icon: BookOpenText,
                collapse: false,
            },
            {
                title: "Book Publications",
                url: "/admin/web/book-publications",
                icon: BookText,
                collapse: false,
            },
        ],
    },
];

export function NavAdmin() {
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
