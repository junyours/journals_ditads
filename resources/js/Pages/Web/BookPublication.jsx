import BookPublicationImage from "../../../../public/images/book-publication.jpg";
import WebLayout from "@/Layouts/WebLayout";

const images = [BookPublicationImage];

export default function BookPublication() {
    return <div></div>;
}

BookPublication.layout = (page) => <WebLayout children={page} images={images} />;
