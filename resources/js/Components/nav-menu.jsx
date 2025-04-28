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
import AppLogo from "./app-logo";
import JournalLogo from "./journal-logo";
import MagazineLogo from "./magazine-logo";

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
                title: "Research Journal",
                description:
                    "International Multidisciplinary Research Journal is a peer-reviewed, open-access journal with a broad, multidisciplinary scope. It is dedicated to publishing recent advances across diverse fields, focusing on the structural and functional principles of scientific research. The journal aims to provide an inclusive forum for researchers from all disciplines to share their findings and contribute to the advancement of knowledge across a wide range of subjects.",
                url: "/research-journals",
                logo: JournalLogo,
            },
            // {
            //     title: "Magazine",
            //     description:
            //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae delectus, vitae dolorum, reprehenderit tempora illo debitis, optio eaque sequi officia quaerat sit. Tenetur tempora incidunt hic assumenda ratione officia ut?",
            //     url: "/",
            //     logo: MagazineLogo,
            // },
        ],
    },
    {
        title: "Book Publication",
        url: "/book-publications",
        collapse: false,
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
                                                    <Link href={submenu.url}>
                                                        <Button
                                                            onClick={() => {
                                                                if (isMobile) {
                                                                    onOpenChange(
                                                                        false
                                                                    );
                                                                }
                                                            }}
                                                            variant="ghost"
                                                            className="mx-4 justify-start w-full"
                                                        >
                                                            {submenu.title}
                                                        </Button>
                                                    </Link>
                                                </AccordionContent>
                                            ))}
                                        </AccordionItem>
                                    ) : (
                                        <Link href={menu.url}>
                                            <Button
                                                onClick={() => {
                                                    if (isMobile) {
                                                        onOpenChange(false);
                                                    }
                                                }}
                                                key={menu.title}
                                                variant="ghost"
                                                className="justify-start w-full"
                                            >
                                                {menu.title}
                                            </Button>
                                        </Link>
                                    )
                                )}
                                <div className="mt-2">
                                    {user ? (
                                        <div className="grid">
                                            <Link
                                                href={`/${user.role}/dashboard`}
                                            >
                                                <Button
                                                    onClick={() => {
                                                        if (isMobile) {
                                                            onOpenChange(false);
                                                        }
                                                    }}
                                                    className="w-full"
                                                >
                                                    Dashboard
                                                </Button>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-4">
                                            <Link href={route("login")}>
                                                <Button
                                                    onClick={() => {
                                                        if (isMobile) {
                                                            onOpenChange(false);
                                                        }
                                                    }}
                                                    variant="outline"
                                                    className="w-full"
                                                >
                                                    Sign in
                                                </Button>
                                            </Link>
                                            <Link href={route("register")}>
                                                <Button
                                                    onClick={() => {
                                                        if (isMobile) {
                                                            onOpenChange(false);
                                                        }
                                                    }}
                                                    className="w-full"
                                                >
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
                                        <ul className="grid gap-3 p-4 w-[500px] grid-cols-[.75fr_1fr] items-center">
                                            <li className="row-span-2">
                                                <NavigationMenuLink asChild>
                                                    <Link
                                                        href="/"
                                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none "
                                                    >
                                                        <AppLogo />
                                                    </Link>
                                                </NavigationMenuLink>
                                            </li>
                                            {menu.submenus?.map((submenu) => (
                                                <li key={submenu.title}>
                                                    <NavigationMenuLink asChild>
                                                        <Link
                                                            href={submenu.url}
                                                            className="block select-none rounded-md p-3 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <div className="size-12 shrink-0">
                                                                    <submenu.logo />
                                                                </div>
                                                                <div className="space-y-1">
                                                                    <div className="text-sm font-medium leading-none">
                                                                        {
                                                                            submenu.title
                                                                        }
                                                                    </div>
                                                                    <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                                                                        {
                                                                            submenu.description
                                                                        }
                                                                    </p>
                                                                </div>
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
