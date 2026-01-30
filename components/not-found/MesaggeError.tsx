export const MesaggeError = ({status, message}: {status: number | null, message: string}) => {
    return (
        <div className="flex items-center justify-center md:mt-20 mt-10 p-4">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-12">
                <div className="text-center md:text-left">
                    {status? <h1 className="md:text-8xl text-6xl font-bold text-blue-600 mb-4">{status}</h1> : null}
                    <h2 className="md:text-3xl text-2xl font-semibold text-gray-300 mb-4">¡Ups! {message}</h2>
                    <p className="md:text-md text-sm text-gray-400 mb-6">Parece que has tomado un portal equivocado</p>
                    <a
                        href="/"
                        className="inline-block bg-blue-900 hover:bg-blue-950 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
                    >
                        Volver al inicio
                    </a>
                </div>
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                    <img
                        src="/images/Bard_0.webp"
                        alt="Bard"
                        className="img-bardo w-full h-full object-cover"
                    />
                    <div className="background"></div>
                </div>
            </div>
        </div>
    )
}