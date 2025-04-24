import Header from "@/Components/web/header";
import Footer from "@/Components/web/footer";

const WebLayout = ({ children }) => {
    return (
        <>
            <Header />
            <main className="container mx-auto min-h-screen">{children}</main>
            <Footer />
        </>
    );
};

export default WebLayout;
