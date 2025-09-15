

export const NavbarMatch = ({ setRouterPath }) => {
    return (
        <nav
            className="max-w-4xl w-full mx-auto bg-dark-secondary text-white flex flex-row items-center justify-between font-sans p-2 mt-2">
            <button className="font-bold text-sm cursor-pointer bg-blue-800 md:px-6  px-2 py-1 rounded-lg hover:bg-blue-700"
                onClick={() => setRouterPath(1)}>Match History</button>
            <div className="flex flex-row gap-6">
                <button className="font-bold text-sm cursor-pointer bg-blue-800 md:px-6  px-2 py-1 rounded-lg hover:bg-blue-700"
                    onClick={() => setRouterPath(2)}>Live Game</button>
                <button className="font-bold text-sm cursor-pointer bg-blue-800 md:px-6  px-2 py-1 rounded-lg hover:bg-blue-700"
                    onClick={() => setRouterPath(3)}>Clash</button>
            </div>
        </nav>
    )
}
