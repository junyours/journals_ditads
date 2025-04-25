import WebBanner from "@/Components/web-banner";
import WebFooter from "@/Components/web-footer";
import WebHeader from "@/Components/web-header";

const WebLayout = ({ children, image, title = "", isOpacity = false}) => {
    return (
        <>
            <WebHeader />
            <main className="min-h-screen">
                <WebBanner image={image} title={title} className="pt-16" isOpacity={isOpacity} />
                <div className="container mx-auto">{children}</div>
            </main>
            <WebFooter />
        </>
    );
};

export default WebLayout;
