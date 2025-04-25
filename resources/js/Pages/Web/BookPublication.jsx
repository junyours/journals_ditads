import BookPublicationImage from "../../../../public/images/book-publication.jpg";
import WebLayout from "@/Layouts/WebLayout";

export default function BookPublication() {
    return <div></div>;
}

BookPublication.layout = (page) => (
    <WebLayout
        children={page}
        title="Book Publications"
        image={BookPublicationImage}
    />
);
