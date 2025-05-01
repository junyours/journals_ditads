import { Input } from "@/Components/ui/input";
import BookPublicationImage from "../../../../public/images/book-publication.png";
import WebLayout from "@/Layouts/WebLayout";
import { Calendar, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { useEffect, useState } from "react";
import { getBooks } from "./ResearchJournal/BookPublication/DataBookPublication";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { MoveRight } from "lucide-react";

const images = [BookPublicationImage];
export default function BookPublication() {
    const [search, setSearch] = useState('')
    const books = getBooks();
    const [bookOpenId, setBookOpenId] = useState(1)
    const [dialogOpen, setDialogOpen] = useState(false)
    const selectedBook = books.find(book => book.id == bookOpenId);
    console.log(selectedBook)
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
                                <h3>ISBN: {data.ISBN}</h3>
                                <p className="text-md opacity-80">{data.authors}</p>
                                <p className="line-clamp-4">{data.about}</p>
                                <button onClick={() => {
                                    setDialogOpen(true);
                                    setBookOpenId(data.id);
                                }}>
                                    <p className="text-green-800 flex gap-1 cursor-pointer self-end">Read More <MoveRight /></p>
                                </button>
                            </CardContent>
                        </Card>
                    ))}
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen} >
                <DialogContent className="sm:max-w-[800px] h-[600px] overflow-auto">
                    <DialogHeader>
                        <DialogTitle>{selectedBook.title}</DialogTitle>
                        <p>ISBN: {selectedBook.ISBN}</p>
                        <DialogDescription>
                            {selectedBook.authors}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <p>{selectedBook.about}</p>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

BookPublication.layout = (page) => <WebLayout children={page} images={images} />;
