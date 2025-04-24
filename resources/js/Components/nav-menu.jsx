import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/Components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link, usePage } from "@inertiajs/react";
import { Drawer, DrawerContent } from "@/Components/ui/drawer";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import { Button } from "./ui/button";

const menus = [
    {
        title: "About Us",
        url: "/about-us",
        collapse: false,
    },
    {
        title: "Services",
        collapse: true,
        submenus: [
            {
                title: "Research Journals",
                url: "/research-journals",
            },
            {
                title: "Book Publications",
                url: "/",
            },
        ],
    },
    {
        title: "Contact Us",
        url: "/contact-us",
        collapse: false,
    },
];

export default function NavMenu({ open, onOpenChange }) {
    const isMobile = useIsMobile();
    const user = usePage().props.auth.user;

    return (
        <div className="flex justify-center">
            {isMobile ? (
                <Drawer open={open} onOpenChange={onOpenChange}>
                    <DrawerContent>
                        <Accordion type="single" collapsible>
                            <div className="flex flex-col p-4">
                                {menus.map((menu) =>
                                    menu.collapse ? (
                                        <AccordionItem
                                            key={menu.title}
                                            value={menu.title}
                                            className="border-none"
                                        >
                                            <AccordionTrigger className="py-2 px-4">
                                                {menu.title}
                                            </AccordionTrigger>
                                            {menu.submenus?.map((submenu) => (
                                                <AccordionContent
                                                    key={submenu.title}
                                                    className="p-0 flex flex-col"
                                                >
                                                    <Button
                                                        variant="ghost"
                                                        className="mx-4 justify-start"
                                                    >
                                                        {submenu.title}
                                                    </Button>
                                                </AccordionContent>
                                            ))}
                                        </AccordionItem>
                                    ) : (
                                        <Button
                                            key={menu.title}
                                            variant="ghost"
                                            className="justify-start"
                                        >
                                            {menu.title}
                                        </Button>
                                    )
                                )}
                                <div className="mt-2">
                                    {user ? (
                                        <div className="grid">
                                            <Link
                                                href={`/${user.role}/dashboard`}
                                            >
                                                <Button className="w-full">
                                                    Dashboard
                                                </Button>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-4">
                                            <Link href={route("login")}>
                                                <Button
                                                    variant="outline"
                                                    className="w-full"
                                                >
                                                    Sign in
                                                </Button>
                                            </Link>
                                            <Link href={route("register")}>
                                                <Button className="w-full">
                                                    Get started
                                                </Button>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Accordion>
                    </DrawerContent>
                </Drawer>
            ) : (
                <NavigationMenu>
                    <NavigationMenuList>
                        {menus.map((menu) =>
                            menu.collapse ? (
                                <NavigationMenuItem key={menu.title}>
                                    <NavigationMenuTrigger>
                                        {menu.title}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[500px] p-4 grid-cols-2">
                                            {menu.submenus?.map((submenu) => (
                                                <li key={submenu.title}>
                                                    <NavigationMenuLink asChild>
                                                        <Link
                                                            href={submenu.url}
                                                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                        >
                                                            <div className="text-sm font-medium leading-none">
                                                                {submenu.title}
                                                            </div>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            ) : (
                                <NavigationMenuItem key={menu.title}>
                                    <NavigationMenuLink
                                        asChild
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        <Link href={menu.url}>
                                            {menu.title}
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            )
                        )}
                    </NavigationMenuList>
                </NavigationMenu>
            )}
        </div>
    );
}
