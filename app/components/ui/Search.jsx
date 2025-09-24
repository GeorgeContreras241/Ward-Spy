'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useSumonnerStore } from '@/app/store/SummonerStore'
import { useFetch } from '@/app/hooks/useFetch'


export const Search = () => {
  const router = useRouter()
  const { setVersion, seturlListSpell, seturlListChamp, setDataNameTag } = useSumonnerStore()
  const [riotId, setRiotId] = useState('')
  const [error, setError] = useState('')
  const [dataName, dataTag] = riotId.split('#')

  const { data: dragonData, error: fetchError } = useFetch({
    stringUrl: "/api/dataDragon"
  })

  useEffect(() => {
    if (dragonData) {
      seturlListSpell(dragonData.dataSpell)
      seturlListChamp(dragonData.dataChamp)
      setVersion(dragonData.version)
    }
  }, [dragonData])

  useEffect(() => {
    if (fetchError) {
      console.error('Error al cargar datos de DataDragon:', fetchError)
      setError('Error al cargar los datos del juego. Intenta de nuevo más tarde.')
    }
  }, [fetchError])

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
    setDataNameTag({ dataName, dataTag })
    router.push(`/summoner/${dataName}-${dataTag}`)
  }


  return (
    <section
      className="bg-card  mt-1 md:mt-5 rounded-[var(--radius)] shadow-shadow-2xs max-w-5xl w-full mx-auto flex lg:flex-row flex-col border border-border"
      aria-label='Buscador de perfiles de League of Legends'
    >
      <article
        className='lg:w-2/5 w-full h-full bg-dark-primary flex flex-col md:p-6 p-4'
      >
        <h1 className='text-card-foreground text-xl pb-3 font-caudex font-bold' itemProp='name'>
          WARD SPY
        </h1>
        <p className='text-popover-foreground text-[.8rem] font-montserrat font-light' itemProp='description'>
          Busca y analiza perfiles de League of Legends. Revisa estadísticas,
          historial de partidas y más para mejorar tu rendimiento en el juego.
        </p>
      </article>

      <article className='lg:w-3/5 w-full bg-dark-secondary flex flex-col justify-center items-center lg:px-4 px-2 py-2'>
        <form
          className='w-full'
          role='search'
          onSubmit={handleSubmit}
          itemScope
          itemType='https://schema.org/SearchAction'
        >
          {/* Schema.org SearchAction definition */}
          <meta itemProp='target' content='/summoner/{query}' />
          <div className='w-full border p-1.5 border-border rounded-[var(--radius)] shadow-shadow-xs'>
            <label
              htmlFor='riotIdInput'
              className='px-1.5 font-bold text-xs text-secondary-foreground font-montserrat'
              aria-label='Ingresa tu Riot ID'
            >
              RIOT ID
            </label>
            <input
              id='riotIdInput'
              name='riotId'
              type='text'
              className='px-2 py-1 outline-none w-full text-xs placeholder:text-popover-foreground rounded-[var(--radius)]
              placeholder:text-xs bg-dark-secondary text-white focus:bg-dark-secondary/80 
               transition-colors duration-200 font-montserrat tracking-widest'
              placeholder='GameName#TAG'
              aria-required='true'
              autoComplete='off'
              required
              itemProp='query-input'
              value={riotId}
              onChange={e => setRiotId(e.target.value)}
              pattern={'[^#]+#[A-Za-z0-9]{1,4}'}
              title='Formato: GameName#TAG (TAG de 1 a 4 caracteres alfanuméricos)'
              aria-invalid={Boolean(error)}
              aria-describedby='riotIdError'
              autoCapitalize='off'
              autoCorrect='off'
              spellCheck={false}
              inputMode='text'
            />
          </div>
          <div className='flex flex-row w-full items-center justify-between gap-2 p-2'>
            <span
              className='text-xs text-red-500/90 font-bold font-montserrat'
              role='alert'
              aria-live='assertive'
              id='riotIdError'
            >
              {error}
            </span>
            <button
              type='submit'
              className='bg-primary-foreground text-background text-xs font-bold px-12 py-2 rounded-[0.5rem] hover:bg-primary-foreground/90 cursor-pointer'
              aria-label='Buscar perfil'
            >
              Buscar
            </button>
          </div>
        </form>
      </article>
    </section>
  )
}