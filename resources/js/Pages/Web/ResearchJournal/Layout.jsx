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
import ResearchJournalImage from "../../../../../public/images/research-journal.jpg";
import EditorialBoard from "./EditorialBoard";

const images = [ResearchJournalImage];

const contents = [
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
    },
    {
        title: "Research Journals",
        page: ResearchJournal,
    },
];

export default function Layout() {
    return (
        <div className="px-4 py-10">
            {contents.map((content, index) => (
                <Accordion key={index} type="single" collapsible>
                    <AccordionItem value={`item-${index}`}>
                        <AccordionTrigger>{content.title}</AccordionTrigger>
                        <AccordionContent className="p-4">
                            <content.page />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            ))}
        </div>
    );
}

Layout.layout = (page) => <WebLayout children={page} images={images} />;
