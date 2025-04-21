import React from "react";
import AimScope from "./AimScope";
import AboutPublisher from "./AboutPublisher";
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
import WebHeader from "@/Components/web-header";
import ResearchJournalImage from "../../../../../public/images/research-journal.png";

const contents = [
    {
        title: "Aims and Scope",
        page: AimScope,
    },
    {
        title: "About the Publisher",
        page: AboutPublisher,
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
        title: "Research Journals",
        page: ResearchJournal,
    },
];

export default function Layout() {
    return (
        <div className="pt-[64px] min-h-screen">
            <WebHeader title="Research Journals" image={ResearchJournalImage} />
            <div className="px-4 py-20">
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
        </div>
    );
}

Layout.layout = (page) => <WebLayout children={page} />;
