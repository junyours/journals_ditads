import { Input } from "@/Components/ui/input";
import BookPublicationImage from "../../../../public/images/book-publication.png";
import WebLayout from "@/Layouts/WebLayout";
import { Calendar, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { useEffect, useState } from "react";
import { getBooks } from "./ResearchJournal/BookPublication/DataBookPublication";

const images = [BookPublicationImage];
export default function BookPublication() {
    const [search, setSearch] = useState('')
    const books = getBooks();

    return (
        <div className="mt-4 mb-4 items-center flex flex-col justify-center space-y-4">
            {/* search bar */}
            <div className="relative flex items-center px-4 w-full sm:w-auto">
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="w-full sm:w-[500px]" />
                <Search className="text-gray-400 absolute right-6" size={20} />
            </div>

            {/* Cards container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full px-4 gap-4">
                {books.filter(data => data.title.toLowerCase().includes(search.toLowerCase()) || data.authors.toLowerCase().includes(search.toLowerCase()))
                    .map((data, index) => (
                        <Card key={index}>
                            <CardHeader className='pb-2'>
                                <CardTitle className="flex gap-2 text-sm text-green-800 opacity-80 items-center content-center font-semibold">
                                    {/* <Calendar size={14} /> {data.date} */}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="w-full h-60 overflow-hidden">
                                    <img
                                        src={`/BookCovers/${data.image}`}
                                        alt="Random"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h2 className="text-xl font-semibold opacity-95">{data.title}</h2>
                                <p className="text-md opacity-80">{data.authors}</p>
                                <p className="line-clamp-4">{data.about}</p>
                            </CardContent>
                        </Card>
                    ))}
            </div>
        </div>
    )
}

BookPublication.layout = (page) => <WebLayout children={page} images={images} />;
