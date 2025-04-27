import WebBanner from "@/Components/web-banner";
import WebFooter from "@/Components/web-footer";
import WebHeader from "@/Components/web-header";

const WebLayout = ({ children, images }) => {
    return (
        <div className="min-h-screen">
            <WebHeader />
            <WebBanner images={images} />
            <main className="container mx-auto">{children}</main>
            <WebFooter />
        </div>
    );
};

export default WebLayout;
