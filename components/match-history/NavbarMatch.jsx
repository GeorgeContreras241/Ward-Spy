import { Button } from "@/components/ui/button";

export const NavbarMatch = ({ setRouterPath }) => {
    return (
        <nav
            className="max-w-5xl w-full border border-border rounded-[0.5rem] mx-auto bg-dark-secondary text-white 
            flex flex-row items-center gap-2 justify-between font-sans px-6 py-2 mt-2 overflow-auto">
            <Button className="font-bold text-xs cursor-pointer rounded-[0.5rem] px-3 "
                onClick={() => setRouterPath(1)}>Match History</Button>
            <Button className="font-bold text-xs cursor-pointer rounded-[0.5rem] px-3 mr-auto"
                onClick={() => setRouterPath(4)}>Champions Most Played</Button>
            <div className="flex flex-row gap-2">
                <Button className="font-bold text-xs cursor-pointer rounded-[0.5rem] px-3"
                    onClick={() => setRouterPath(2)}>Live Game</Button>
                <Button className="font-bold text-xs cursor-pointer rounded-[0.5rem] px-3"
                    onClick={() => setRouterPath(3)}>Clash</Button>

            </div>
        </nav>
    )
}
