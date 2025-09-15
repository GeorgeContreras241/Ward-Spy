"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaGithub } from "react-icons/fa"

export const Navbar = () => {
  const router = useRouter()

  const handleChange = (e) => {
    const newValue = e.target.value
    if (newValue) router.push(newValue)
  }

  return (
    <nav className='bg-gray-900/80  backdrop-blur-sm fixed w-full'>
      <div className='flex justify-between items-center p-2 h-16 max-w-5xl w-full mx-auto px-4'>
        <Link href="/" className="font-caudex text-2xl font-bold text-white hover:opacity-90">
          Lolcito Espia
        </Link>
        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-6'>
          <Link 
            href="/ia" 
            className="text-white hover:text-gray-200 hover:scale-110 transition-all"
          >
            IA
          </Link>
          <a 
            href="https://github.com/GeorgeContreras241" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:scale-110 transition-transform"
            aria-label="GitHub"
          >
            <FaGithub className="h-6 w-6" />
          </a>
        </div>
        {/* Mobile Navigation */}
        <select 
          onChange={handleChange} 
          className='md:hidden bg-gray-800 text-white text-sm rounded px-3 py-1 border border-gray-600'
          aria-label="Menú de navegación"
        >
          <option value="">Menú</option>
          <option value="/liveGame">Live game</option>
          <option value="/clash">Clash</option>
          <option value="/matchHistory">Match history</option>
          <option value="/ia">IA</option>
        </select>
      </div>
    </nav>
  )
}