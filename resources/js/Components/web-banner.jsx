export default function WebBanner({ image, title = "" }) {
    return (
        <div className="w-full h-36 sm:h-72 -z-10 relative flex items-center justify-center">
            <div className="absolute bg-black opacity-50 inset-0"></div>
            <img
                src={image}
                alt={title}
                className="object-cover h-full w-full"
            />
            <h1 className="absolute text-white font-semibold text-xl sm:text-4xl">
                {title}
            </h1>
        </div>
    );
}
