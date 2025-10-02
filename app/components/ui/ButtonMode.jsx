
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineModeNight } from "react-icons/md";
export const ButtonMode = ({ toggleMode, mode }) => {

  return (
    <div>
        <button onClick={ () => toggleMode() }  className="flex items-center justify-center cursor-pointer hover:bg-accent p-2 rounded-full hover:scale-105 transition-all" disabled>
            {mode === "light" ? <MdOutlineLightMode className="h-6 w-6 cursor-pointer"/> : <MdOutlineModeNight className="h-6 w-6 cursor-pointer" />}
        </button>
    </div>
  )
}
