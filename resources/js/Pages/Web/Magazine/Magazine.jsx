import MagazineImage from "../../../../../public/images/Dr.NeilsonMAGAZINE.png";

export default function Magazine() {
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <img
                src={MagazineImage}
                alt="magazine"
                className="object-contain size-80"
            />
        </div>
    );
}
