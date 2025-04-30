import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import WebLayout from "@/Layouts/WebLayout";
import MagazineBanner from "../../../../../public/images/magazine-banner.png";
import AimScope from "./AimScope";
import EditorialBoard from "./EditorialBoard";
import { usePage } from "@inertiajs/react";

const images = [MagazineBanner];

export default function Layout() {
    const { editors } = usePage().props;

    const contents = [
        {
            title: "Aims and Scope",
            page: AimScope,
        },
        {
            title: "Editorial Board",
            page: EditorialBoard,
            props: { editors },
        },
    ];

    return contents.map((content, index) => (
        <Accordion key={index} type="single" collapsible>
            <AccordionItem value={`item-${index}`}>
                <AccordionTrigger>{content.title}</AccordionTrigger>
                <AccordionContent className="p-4">
                    <content.page {...(content.props || {})} />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    ));
}

Layout.layout = (page) => <WebLayout children={page} images={images} />;
