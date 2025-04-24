import WebBanner from "@/Components/web-banner";
import ContactUsImage from "../../../../public/images/contact-us.png";
import WebLayout from "@/Layouts/WebLayout";
import { Mail, Phone } from "lucide-react";

export default function ContactUs() {
    return (
        <div className="pt-[64px] min-h-screen">
            <WebBanner image={ContactUsImage} title="Contact Us" />
            <div className="px-4 py-10 max-w-7xl mx-auto space-y-10">
                <h1 className="text-center font-medium text-2xl break-words">
                    METRO SQUARE R118 ZONE 2, IPONAN, CDO CITY
                </h1>
            </div>
            <div className="grid sm:grid-cols-2 gap-10 place-items-center">
                <div className="flex flex-col items-center gap-1">
                    <Phone size={40} />
                    <span className="font-medium text-lg">
                        {import.meta.env.VITE_APP_PHONE}
                    </span>
                </div>
                <div className="flex flex-col items-center">
                    <Mail size={40} />
                    <span className="font-medium text-lg">
                        {import.meta.env.VITE_APP_EMAIL}
                    </span>
                </div>
            </div>
            <div className="flex justify-center py-20">
                <div className="w-[600px] h-[500px]">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.0376374267407!2d124.59567327352237!3d8.49572149711157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32fff3bb5ad3a1dd%3A0xd7dd14c89de28c9b!2sMetro%20Square!5e0!3m2!1sen!2sph!4v1745471228277!5m2!1sen!2sph"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        className="w-full h-full"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

ContactUs.layout = (page) => <WebLayout children={page} />;
