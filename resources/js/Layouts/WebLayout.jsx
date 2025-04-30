import WebBanner from "@/Components/web-banner";
import WebFooter from "@/Components/web-footer";
import WebHeader from "@/Components/web-header";

const WebLayout = ({ children, images }) => {
    return (
        <div className="min-h-screen">
            <WebHeader />
            <main className="min-h-svh">
                <WebBanner images={images} />
                <div className="container mx-auto p-4">{children}</div>
            </main>
            <WebFooter />
        </div>
    );
};

export default WebLayout;
