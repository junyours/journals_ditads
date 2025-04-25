export default function WebBanner({
    image,
    title = "",
    className = "",
    isOpacity = false,
}) {
    return (
        <div
            className={`w-full h-52 sm:h-96 -z-10 relative flex items-center justify-center ${className}`}
        >
            <div
                className={`absolute bg-black opacity-50 inset-0 ${
                    isOpacity ? "hidden" : ""
                }`}
            ></div>
            <img
                src={image}
                alt={title}
                className="object-cover h-full w-full"
            />
            <h1 className="mx-4 absolute text-white font-semibold text-xl text-center sm:text-4xl">
                {title}
            </h1>
        </div>
    );
}
