import WebHeader from "@/Components/web-header";
import WebLayout from "@/Layouts/WebLayout";
import React from "react";
import AboutUsImage from "../../../../public/images/about-us.png";
import Vision from "../../../../public/images/vision.jpg";
import Mission from "../../../../public/images/mission.jpg";

export default function AboutUs() {
    return (
        <div className="pt-[64px] min-h-screen">
            <WebHeader title="About Us" image={AboutUsImage} />
            <div className="px-4 py-20 max-w-7xl mx-auto space-y-20">
                <h1 className="text-center font-medium text-2xl">
                    The Digital Institute Training and Development Services
                    (DITADS) offers the following services: Research Consultant,
                    Statistics and Data Analyst, Feasibility Studies Consultant,
                    Operations/Systems Analyst, Business Planning, and
                    Seminar/Training/Workshops to equip clients with the
                    necessary skills while promoting fulfillment in their
                    undertakings.
                </h1>
                <div className="space-y-10">
                    <h1 className="font-semibold text-4xl text-primary">
                        History
                    </h1>
                    <p className="text-justify">
                        Neilson and Wilson made up the name zas Digital
                        Institute Training and Development Services (DIT.ADS) on
                        June 19, 2019. The concept of the business started when
                        Neilson, the son, and Wilson, the father attended the
                        Seminar on Research held at Davao City. The two (Neilson
                        and Wilson) together with the support of the family
                        members envisioned to help the students and teachers in
                        the city of Cagayan de Oro and those who find difficulty
                        in engaging research especially when a research paper
                        required the use of descriptive and inferential
                        statistical tools. The pioneered also anticipated that
                        in the coming years digital training for research will
                        be in demand and could be easily learned by anybody
                        interested in research through the use of Statistical
                        Package for the Social Sciences (SPSS) software. SPSS is
                        software for editing and analyzing all sorts of data.
                        The pioneering leaders of the business firmly believed
                        in the concept that “Research and development (R&D) is a
                        valuable tool for growing and improving the individual
                        and the business. R&D involves researching the market
                        and the customer needs and developing new and improved
                        products and services to fit these needs. Businesses
                        that have an R&D strategy have a greater chance of
                        success than businesses that don’t. An R&D strategy can
                        lead to innovation and increased productivity and can
                        boost the business’s competitive advantage.”
                    </p>
                </div>
                <div className="space-y-10">
                    <h1 className="font-semibold text-4xl text-primary">
                        Business Profile
                    </h1>
                    <p className="text-justify">
                        Zas DIGITAL INSTITUTE TRAINING AND DEVELOPMENT SERVICES
                        (DIT.ADS) provides Management, Marketing, Finance,
                        Accounting, Real Estate, Environmental Planning,
                        Production Planning, Data Analysis, Data Interpretation,
                        Academic and Business Research, Hospitality consultancy,
                        and Training services. It also offers customized
                        training sessions to students, managers, and company
                        owners.
                    </p>
                </div>
                <div className="grid grid-rows-2 gap-10">
                    <div className="flex gap-10 max-md:flex-col-reverse">
                        <div className="flex-1">
                            <img
                                src={Vision}
                                alt="vision"
                                className="size-full rounded-lg"
                            />
                        </div>
                        <div className="space-y-5 flex-1">
                            <h1 className="font-semibold text-4xl text-primary">
                                Vision
                            </h1>
                            <p>
                                To be the leading research institute in Mindanao
                                by 2025.” To create dependable management,
                                marketing, finance, accounting, hospitality
                                consultancy business, and training services that
                                provide employment and business opportunities to
                                common and highly respected people in the
                                community.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-10 max-md:flex-col">
                        <div className="space-y-5 flex-1">
                            <h1 className="font-semibold text-4xl text-primary">
                                Mission
                            </h1>
                            <p>
                                To provide customized training services in the
                                fields of Management, Marketing, Finance,
                                Accounting, Real Estate, Environmental Planning,
                                Production Planning, Data Analysis, and Data
                                Interpretation, Academic and Business Research,
                                Hospitality consultancy, and Training services.
                                To empower the firms and workers in their
                                respective fields and to enhance their
                                potentials that add value to their endeavors and
                                businesses.
                            </p>
                        </div>
                        <div className="flex-1">
                            <img
                                src={Mission}
                                alt="mission"
                                className="size-full rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

AboutUs.layout = (page) => <WebLayout children={page} />;
