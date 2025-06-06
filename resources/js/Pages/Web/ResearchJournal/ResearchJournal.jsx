import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import { router, usePage } from "@inertiajs/react";
import PDF from "../../../../../public/images/pdf.png";
import { Input } from "@/Components/ui/input";
import { useEffect, useRef, useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";

const ResearchJournal = ({ journals }) => {
    const [search, setSearch] = useState("");

    const searchTimeoutRef = useRef(null);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(() => {
            router.get(
                "research-journals",
                { search: value },
                { preserveState: true, preserveScroll: true }
            );
        }, 1000);
    };

    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, []);

    const handlePage = (url) => {
        router.get(url, {}, { preserveState: true });
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <div className="w-full sm:max-w-xs">
                    <Input
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search"
                    />
                </div>
            </div>
            {journals.data.length > 0 ? (
                journals.data.map((journal, index) => (
                    <Accordion key={index} type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="hover:no-underline">
                                <div>
                                    <h1>{journal.title}</h1>
                                    <p className="font-normal italic">
                                        {journal.author}
                                    </p>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col">
                                        <h1 className="font-medium">
                                            Author/s:
                                        </h1>
                                        <p className="italic">
                                            {journal.author}
                                        </p>
                                    </div>
                                    <div className="flex max-sm:flex-col sm:gap-2 whitespace-nowrap">
                                        <h1 className="font-medium">
                                            Volume & Issue:
                                        </h1>
                                        <div className="flex gap-2">
                                            <p>Volume: {journal.volume},</p>
                                            <p>Issue: {journal.issue},</p>
                                            <p>
                                                {new Date(
                                                    journal.created_at
                                                ).toLocaleString("en-US", {
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <h1 className="font-medium">
                                            Abstract:
                                        </h1>
                                        <p className="text-justify">
                                            {journal.abstract}
                                        </p>
                                    </div>
                                    <a
                                        href={`/storage/journal/published_files/${journal.assign_editor.published_file}`}
                                        target="_blank"
                                        className="w-fit"
                                    >
                                        <div className="group flex items-center gap-2">
                                            <img src={PDF} className="size-8" />
                                            <span className="group-hover:underline">
                                                Read Full Document
                                            </span>
                                        </div>
                                    </a>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))
            ) : (
                <div className="h-24 flex items-center justify-center">
                    <span>
                        {search
                            ? `No matching found for "${search}"`
                            : "No data available."}
                    </span>
                </div>
            )}
            {journals.total > journals.per_page && (
                <div className="flex justify-end">
                    <div>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() =>
                                            handlePage(journals.prev_page_url)
                                        }
                                        className="cursor-pointer"
                                    />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() =>
                                            handlePage(journals.next_page_url)
                                        }
                                        className="cursor-pointer"
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResearchJournal;
