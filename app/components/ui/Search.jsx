'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useSumonnerStore } from '@/app/store/SummonerStore'


export const Search = () => {
  const router = useRouter() 
  const { setVersion, seturlListSpell,  seturlListChamp, setDataNameTag} = useSumonnerStore()

  const [riotId, setRiotId] = useState('')
  const [error, setError] = useState('')
  const [dataName, dataTag] = riotId.split('#')

  /*Carga de Imagenes de Data Dragon */
  const getChampList = async () => {
    const versionsRes = await fetch("https://ddragon.leagueoflegends.com/api/versions.json")
    if (!versionsRes.ok) {
      throw new Error("No se pudo obtener la lista de versiones")
    }
    const versionData = await versionsRes.json()
    const lastVersion = versionData[0]
    setVersion(lastVersion)
  }
  useEffect(() => {
    getSpellList()
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    if (!dataName || !dataTag) {
      setError('Por favor, ingresa un Riot ID válido')
      return
    }
    if (dataTag.length > 4) {
      setError('Por favor, ingresa un TAG válido')
      return
    }
    setError('')
    setDataNameTag({dataName, dataTag})
    router.push(`/summoner/${dataName}-${dataTag}`)

  }


  /*Carga de hechizos de Data Dragon */
  const getSpellList = async () => {
    const versionsRes = await fetch("/api/dataDragon")
    if (!versionsRes.ok) {
      throw new Error("No se pudo obtener la lista de versiones")
    }
    const data = await versionsRes.json()
    seturlListSpell(data.dataSpell)
    seturlListChamp(data.dataChamp)
    setVersion(data.version)
  }


  return (
    <section
      className="mt-20 max-w-5xl w-full mx-auto flex lg:flex-row flex-col"
      itemScope
      itemType='https://schema.org/SearchAction'
      aria-label='Buscador de perfiles de League of Legends'
    >
      <article
        className='lg:w-2/5 w-full h-full bg-dark-primary flex flex-col md:p-6 p-4'
        itemProp='potentialAction'
        itemScope
        itemType='https://schema.org/SearchAction'
      >
        <h1 className='text-xl pb-3 font-caudex font-bold' itemProp='name'>
           WARD SPY
        </h1> 
        <p className='text-neutral-400 text-[.8rem] font-montserrat font-light' itemProp='description'>
          Busca y analiza perfiles de League of Legends. Revisa estadísticas,
          historial de partidas y más para mejorar tu rendimiento en el juego.
        </p>
        <meta itemProp='target' content='/search?q={riot_id}' />
      </article>

      <article className='lg:w-3/5 w-full bg-dark-secondary flex flex-col justify-center items-center lg:px-4 px-2 py-2'>
        <form
          className='w-full'
          role='search'
          itemProp='potentialAction'
          itemScope
           itemType='https://schema.org/SearchAction'
        >
          <div className='w-full border p-1.5 border-gray-600 rounded'>
            <label
              htmlFor='riotIdInput'
              className='px-1.5 font-bold text-xs text-neutral-300 font-montserrat'
              aria-label='Ingresa tu Riot ID'
            >
              RIOT ID
            </label>
            <input
              id='riotIdInput'
              name='riotId'
              type='text'
              className='px-2 py-1 outline-none w-full text-xs placeholder:text-gray-500 
              placeholder:text-xs bg-dark-secondary text-white focus:bg-dark-secondary/80 
               transition-colors duration-200 font-montserrat tracking-widest'
              placeholder='GameName#TAG'
              aria-required='true'
              autoComplete='off'
              required
              itemProp='query-input'
              value={riotId}
              onChange={e => setRiotId(e.target.value)}
            />
          </div>
          <div className='flex flex-row w-full items-center justify-between gap-2 p-2'>
            <span
              className='text-xs text-red-500/90 font-bold font-montserrat'
              role='alert'
              aria-live='assertive'
            >
              {error}
            </span>
            <button
              type='submit'
              className='bg-white text-black text-xs font-extrabold px-2 py-1 w-24 rounded font-montserrat cursor-pointer'
              aria-label='Buscar perfil'
              itemProp='potentialAction'
              onClick={handleSubmit}
            >
              Buscar
            </button>
          </div>
        </form>
      </article>
    </section>
  )
}