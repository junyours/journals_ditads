import WebFooter from "@/Components/web-footer";
import WebHeader from "@/Components/web-header";

const WebLayout = ({ children }) => {
    return (
        <>
            <WebHeader />
            <main className="container mx-auto min-h-screen">{children}</main>
            <WebFooter />
        </>
    );
};

export default WebLayout;
