import { Input } from "@/Components/ui/input";
import BookPublicationImage from "../../../../public/images/book-publication.jpg";
import WebLayout from "@/Layouts/WebLayout";
import { Calendar, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { useEffect, useState } from "react";

const images = [BookPublicationImage];
export default function BookPublication() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('')

    useEffect(() => {
        async function fetchData() {
            const response = await axios();
            setData(response);
        }

        fetchData();
    }, []);

    return (
        <div className="mt-4 mb-4 items-center flex flex-col justify-center space-y-4">
            {/* search bar */}
            <div className="relative flex items-center px-4 w-full sm:w-auto">
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="w-full sm:w-[500px]" />
                <Search className="text-gray-400 absolute right-6" size={20} />
            </div>

            {/* Cards container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full px-4 gap-4">
                {data.filter(data => data.title.toLowerCase().includes(search.toLowerCase()) || data.authors.toLowerCase().includes(search.toLowerCase()))
                    .map((data, index) => (
                        <Card key={index}>
                            <CardHeader className='pb-2'>
                                <CardTitle className="flex gap-2 text-sm text-green-800 opacity-80 items-center content-center font-semibold">
                                    <Calendar size={14} /> {data.date}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="w-full h-52 overflow-hidden">
                                    <img
                                        src={data.image}
                                        alt="Random"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h2 className="text-xl font-semibold opacity-95">{data.title}</h2>
                                <p className="text-md opacity-80">{data.authors}</p>
                            </CardContent>
                        </Card>
                    ))}
            </div>
        </div>
    )

    function axios() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const data = [
                    {
                        "date": "April 26, 2025",
                        "image": "https://random-image-pepebigotes.vercel.app/api/random-image?rand=0.6789392677180858",
                        "title": "Exploring the Culinary Potential of Venison Shank and Frankfurter: A Comprehensive Study on Meat Varieties",
                        "authors": "Prof. Realin C. Aranza, Dr. Michael Bryan G. De Castro, Assoc. Prof. Bernadette M. Panibio; Edited by Dr. Adrian Lawrence P. Carvajal and Dr. Richard D. Sanchez"
                    },
                    {
                        "date": "January 9, 2025",
                        "image": "https://random-image-pepebigotes.vercel.app/api/random-image?rand=0.019564431926247128",
                        "title": "A Comparative Analysis of Capicola, Andouille, and Beef Ribs: Trends in Gourmet Meats",
                        "authors": "Prof. Realin C. Aranza, Dr. Michael Bryan G. De Castro, Assoc. Prof. Bernadette M. Panibio; Edited by Dr. Adrian Lawrence P. Carvajal and Dr. Richard D. Sanchez"
                    },
                    {
                        "date": "January 22, 2025",
                        "image": "https://random-image-pepebigotes.vercel.app/api/random-image?rand=0.9430815135365741",
                        "title": "The Evolution of Chuck Tenderloin and Salami: Understanding Meat Processing and Preservation",
                        "authors": "Prof. Realin C. Aranza, Dr. Michael Bryan G. De Castro, Assoc. Prof. Bernadette M. Panibio; Edited by Dr. Adrian Lawrence P. Carvajal and Dr. Richard D. Sanchez"
                    },
                    {
                        "date": "February 28, 2025",
                        "image": "https://random-image-pepebigotes.vercel.app/api/random-image?rand=0.3138481537616564",
                        "title": "Brisket and T-Bone Beef Ribs: A Study on the Impact of Grilling Techniques on Meat Quality",
                        "authors": "Prof. Realin C. Aranza, Dr. Michael Bryan G. De Castro, Assoc. Prof. Bernadette M. Panibio; Edited by Dr. Adrian Lawrence P. Carvajal and Dr. Richard D. Sanchez"
                    },
                    {
                        "date": "April 9, 2025",
                        "image": "https://random-image-pepebigotes.vercel.app/api/random-image?rand=0.8600956972725708",
                        "title": "The Impact of Sirloin and Pancetta on Modern Culinary Practices: A Research Perspective",
                        "authors": "Prof. Realin C. Aranza, Dr. Michael Bryan G. De Castro, Assoc. Prof. Bernadette M. Panibio; Edited by Dr. Adrian Lawrence P. Carvajal and Dr. Richard D. Sanchez"
                    },
                    {
                        "date": "January 23, 2025",
                        "image": "https://random-image-pepebigotes.vercel.app/api/random-image?rand=0.6911087923113045",
                        "title": "Swine and Andouille: An In-Depth Review of Pork Products in Contemporary Cuisine",
                        "authors": "Prof. Realin C. Aranza, Dr. Michael Bryan G. De Castro, Assoc. Prof. Bernadette M. Panibio; Edited by Dr. Adrian Lawrence P. Carvajal and Dr. Richard D. Sanchez"
                    },
                    {
                        "date": "March 10, 2025",
                        "image": "https://random-image-pepebigotes.vercel.app/api/random-image?rand=0.8506244444351911",
                        "title": "Venison and Pork Swine Sausage: A Global Exploration of Traditional Meat Curing Practices",
                        "authors": "Prof. Realin C. Aranza, Dr. Michael Bryan G. De Castro, Assoc. Prof. Bernadette M. Panibio; Edited by Dr. Adrian Lawrence P. Carvajal and Dr. Richard D. Sanchez"
                    },
                    {
                        "date": "January 25, 2025",
                        "image": "https://random-image-pepebigotes.vercel.app/api/random-image?rand=0.46331755868503277",
                        "title": "Porchetta and Andouille: Examining the Role of Processed Meats in Culinary Innovation",
                        "authors": "Prof. Realin C. Aranza, Dr. Michael Bryan G. De Castro, Assoc. Prof. Bernadette M. Panibio; Edited by Dr. Adrian Lawrence P. Carvajal and Dr. Richard D. Sanchez"
                    },
                    {
                        "date": "March 29, 2025",
                        "image": "https://random-image-pepebigotes.vercel.app/api/random-image?rand=0.11130692525651198",
                        "title": "Pastrami and Alcatra: An Interdisciplinary Approach to Meat Preservation and Flavor Profiles",
                        "authors": "Prof. Realin C. Aranza, Dr. Michael Bryan G. De Castro, Assoc. Prof. Bernadette M. Panibio; Edited by Dr. Adrian Lawrence P. Carvajal and Dr. Richard D. Sanchez"
                    },
                    {
                        "date": "April 15, 2025",
                        "image": "https://random-image-pepebigotes.vercel.app/api/random-image?rand=0.5013913512552503",
                        "title": "Ribeye and Venison: A Detailed Study of High-Quality Cuts and Their Culinary Versatility",
                        "authors": "Prof. Realin C. Aranza, Dr. Michael Bryan G. De Castro, Assoc. Prof. Bernadette M. Panibio; Edited by Dr. Adrian Lawrence P. Carvajal and Dr. Richard D. Sanchez"
                    }
                ];
                resolve(data);
            }, 500);
        });
    }
}

BookPublication.layout = (page) => <WebLayout children={page} images={images} />;
