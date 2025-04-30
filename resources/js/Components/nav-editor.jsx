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
    FileInputIcon,
    FolderSync,
    LayoutDashboard,
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
                url: "/editor/dashboard",
                icon: LayoutDashboard,
                collapse: false,
            },
        ],
    },
    {
        name: "Journal",
        menus: [
            {
                title: "Assigned Documents",
                url: "/editor/assigned/documents",
                icon: FileInputIcon,
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
                url: "/editor/published/documents",
                icon: FolderSync,
                collapse: true,
                submenus: [
                    {
                        title: "Pending",
                        url: "/pending",
                    },
                    {
                        title: "Reports",
                        url: "/reports",
                    },
                ],
            },
        ],
    },
];

const NavEditor = () => {
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
};

export default NavEditor;
