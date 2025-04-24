import { Link } from "@inertiajs/react";
import AppLogo from "./app-logo";

export default function WebFooter() {
    return (
        <footer className="bg-background border-t">
            <div className="container mx-auto px-4 py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link href="/" className="flex items-center">
                            <div className="size-16 me-3">
                                <AppLogo />
                            </div>
                            <span className="self-center text-2xl font-bold whitespace-nowrap">
                                {import.meta.env.VITE_APP_NAME}
                            </span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase">
                                Contact Us
                            </h2>
                            <ul className="font-medium">
                                <li className="mb-4">
                                    <a
                                        href={`mailto:${
                                            import.meta.env.VITE_APP_EMAIL
                                        }`}
                                        className="hover:underline break-words"
                                    >
                                        {import.meta.env.VITE_APP_EMAIL}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={`tel:${
                                            import.meta.env.VITE_APP_PHONE
                                        }`}
                                        className="hover:underline break-words"
                                    >
                                        {import.meta.env.VITE_APP_PHONE}
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase">
                                Follow us
                            </h2>
                            <ul className="font-medium">
                                <li className="mb-4">
                                    <a
                                        href={import.meta.env.VITE_APP_FACEBOOK}
                                        target="_blank"
                                        className="hover:underline break-words"
                                    >
                                        Facebook
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase">
                                Legal
                            </h2>
                            <ul className="font-medium">
                                <li className="mb-4">
                                    <a
                                        href="#"
                                        className="hover:underline break-words"
                                    >
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:underline break-words"
                                    >
                                        Terms &amp; Conditions
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-t sm:mx-auto lg:my-8" />
                <div className="flex justify-center">
                    <span className="text-sm">
                        © {new Date().getFullYear()}{" "}
                        <a href="/" className="hover:underline">
                            {import.meta.env.VITE_APP_NAME}
                        </a>
                        . All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
}
