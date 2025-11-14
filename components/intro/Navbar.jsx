"use client"
import { ButtonLeave } from "@/components/ui/ButtonLeave"
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { ButtonMode } from '@/components/ui/ButtonMode'
import { FaGithub } from "react-icons/fa"
import { Tooltip } from "react-tooltip"

export const Navbar = ({ toggleMode, mode }) => {
  const router = useRouter()
  const pathname = usePathname()

  const handleChange = (e) => {
    const newValue = e.target.value
    if (newValue) router.push(newValue)
  }

  return (
    <nav className='bg-background border-b border-border font-mono' aria-label="Navegación principal">
      {/* Skip to main content for better accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-accent text-accent-foreground px-3 py-2 rounded">
        Saltar al contenido
      </a>
      <div className='text-font-serif flex justify-between items-center p-2 h-16 max-w-5xl w-full mx-auto px-4'
      >
        <Link href="/"
          data-tooltip-id="titles" data-tooltip-content="Ir a la página principal"
          className="font-caudex text-sm md:text-2xl font-bold text-primary-foreground hover:opacity-90 flex flex-row-reverse items-center gap-2 justify-between" aria-current={pathname === '/' ? 'page' : undefined}>
          Lolcito Espia
          <ButtonLeave />
        </Link>
        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-6'>
          <Link
            href="/ia"
            className="text-primary-foreground text-sm font-bold"
            title="IA"
            aria-current={pathname === '/ia' ? 'page' : undefined}
          >
            IA
          </Link>
          <a
            href="https://github.com/GeorgeContreras241"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-foreground hover:scale-105 p-2 rounded-full hover:bg-accent transition-transform"
            aria-label="GitHub"
          >
            <FaGithub className="h-6 w-6" />
          </a>
          <ButtonMode toggleMode={toggleMode} mode={mode} />
        </div>
        {/* Mobile Navigation */}
        <label htmlFor="mobile-nav" className="sr-only">Menú de navegación</label>
        <select
          id="mobile-nav"
          onChange={handleChange}
          className='md:hidden bg-gray-800 text-white text-sm rounded px-3 py-1 border border-gray-600'
          aria-label="Menú de navegación"
          defaultValue=""
        >
          <option value="">Menú</option>
          <option value="/liveGame">Live game</option>
          <option value="/clash">Clash</option>
          <option value="/matchHistory">Match history</option>
          <option value="/ia">IA</option>
        </select>
      </div>
      <Tooltip id="titles" place="bottom" className="!text-[.7rem] !opacity-60 !p-1 !bg-secondary/90 !font-bold !text-neutral-300" />
    </nav>
  )
}