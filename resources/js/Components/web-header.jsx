export default function WebHeader({ image, title = "" }) {
    return (
        <div className="w-full h-36 sm:h-72 -z-10 relative flex items-center justify-center">
            <img
                src={image}
                alt={title}
                className="object-cover h-full w-full"
            />
            <h1 className="absolute text-white font-semibold text-xl sm:text-4xl drop-shadow-md">
                {title}
            </h1>
        </div>
    );
}
