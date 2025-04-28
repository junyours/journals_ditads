import AimScope from "./AimScope";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import SubmissionGuideline from "./SubmissionGuideline";
import ReviewProcess from "./ReviewProcess";
import ResearchJournal from "./ResearchJournal";
import WebLayout from "@/Layouts/WebLayout";
import ResearchJournalBanner from "../../../../../public/images/journal-banner.png";
import EditorialBoard from "./EditorialBoard";
import { usePage } from "@inertiajs/react";
import AboutJournal from "./AboutJournal";

const images = [ResearchJournalBanner];

export default function Layout() {
    const { journals, editors } = usePage().props;

    const contents = [
        {
            title: "About the Journal",
            page: AboutJournal,
        },
        {
            title: "Aims and Scope",
            page: AimScope,
        },
        {
            title: "Submission Guidelines",
            page: SubmissionGuideline,
        },
        {
            title: "Review Process",
            page: ReviewProcess,
        },
        {
            title: "Editorial Board",
            page: EditorialBoard,
            props: { editors },
        },
        {
            title: "Research Journals",
            page: ResearchJournal,
            props: { journals },
        },
    ];

    return (
        <div className="px-4 py-10">
            {contents.map((content, index) => (
                <Accordion key={index} type="single" collapsible>
                    <AccordionItem value={`item-${index}`}>
                        <AccordionTrigger>{content.title}</AccordionTrigger>
                        <AccordionContent className="p-4">
                            <content.page {...(content.props || {})} />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            ))}
        </div>
    );
}

Layout.layout = (page) => <WebLayout children={page} images={images} />;
