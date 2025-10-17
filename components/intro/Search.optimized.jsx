'use client'

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSumonnerStore } from '@/app/store/SumonnerStore';
import { useFetch } from '@/app/hooks/useFetch';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { Button } from '@/components/ui/button';
import { replaceLocalStorage } from '@/app/utils/replaceLocalStorage';
import { setDataLocalStorage } from '@/app/utils/setLocalStoraje';

// Constants
const MAX_TAG_LENGTH = 4;
const RIOT_ID_PATTERN = /^[^#]+#[A-Za-z0-9]{1,4}$/;

// Custom Hook for Riot ID Management
const useRiotId = (initialValue = '') => {
    const [riotId, setRiotId] = useState(initialValue);
    const [dataName, dataTag] = riotId.split('#');
    
    const setRiotIdWithValidation = (value) => {
        setRiotId(value);
    };

    const isValid = RIOT_ID_PATTERN.test(riotId);

    return {
        riotId,
        dataName,
        dataTag,
        setRiotId: setRiotIdWithValidation,
        isValid
    };
}
export const Search = () => {
    // Routing
    const router = useRouter();
    const pathname = usePathname();
    const routeName = pathname.split('/').pop(1, 2);
    
    // State Management
    const { riotId, dataName, dataTag, setRiotId, isValid } = useRiotId();
    const [error, setError] = useState('');
    
    // Custom Hooks
    const { data: dragonData, error: fetchError } = useFetch("/api/dataDragon");
    const { 
        setVersion, 
        seturlListSpell, 
        seturlListChamp, 
        setDataNameTag, 
        loading, 
        setDataPuuid, 
        setDataSumonner 
    } = useSumonnerStore();

    // Effects
    useEffect(() => {
        if (dragonData) {
            seturlListSpell(dragonData.dataSpell);
            seturlListChamp(dragonData.dataChamp);
            setVersion(dragonData.version);
        }
    }, [dragonData, seturlListSpell, seturlListChamp, setVersion]);

    useEffect(() => {
        if (routeName.length > 1) {
            const decodedRoute = decodeURIComponent(routeName);
            setRiotId(decodedRoute.replace(/-/g, '#'));
        }
    }, [routeName, setRiotId]);

    useEffect(() => {
        if (fetchError) {
            console.error('Error al cargar datos de DataDragon:', fetchError);
            setError('Error al cargar los datos del juego. Intenta de nuevo más tarde.');
        }
    }, [fetchError]);

    // Event Handlers
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!isValid) {
            setError('Por favor, ingresa un Riot ID válido (ej: Nombre#TAG)');
            return;
        }
        
        if (dataTag.length > MAX_TAG_LENGTH) {
            setError('El TAG no puede tener más de 4 caracteres');
            return;
        }
        
        setError('');
        setDataNameTag({ dataName, dataTag });
        router.push(`/summoner/${encodeURIComponent(dataName)}-${encodeURIComponent(dataTag)}`);
    };

    const handleUpdate = useCallback(async () => {
        if (!isValid) return;
        
        setDataSumonner(null);
        
        try {
            const res = await fetch(`/api/updateSumonner`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ dataName, dataTag }),
            });
            
            if (!res.ok) throw new Error('Error en la respuesta del servidor');
            
            const data = await res.json();
            
            if (data && data.response) {
                const newPlayer = {
                    user: data.response.playerRes,
                    matchs: data.response.matchs,
                    stats: data.response.stats
                };
                
                replaceLocalStorage();
                setDataPuuid(newPlayer.user.puuid);
                setDataSumonner(newPlayer);
                setDataLocalStorage(newPlayer.matchs, newPlayer.user.puuid, newPlayer.user.summonerName);
            }
        } catch (error) {
            console.error('Error al actualizar los datos:', error);
            setError('Error al actualizar los datos. Intenta de nuevo.');
        }
    }, [dataName, dataTag, isValid, setDataPuuid, setDataSumonner]);

    return (
        <section
            className="bg-card mt-1 md:mt-5 rounded-[var(--radius)] shadow-shadow-2xs max-w-5xl w-full mx-auto flex lg:flex-row flex-col border border-border"
            aria-label='Buscador de perfiles de League of Legends'
        >
            <article className='lg:w-2/5 w-full h-full bg-dark-primary flex flex-col md:p-6 p-4'>
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
                            onChange={(e) => setRiotId(e.target.value)}
                            pattern={RIOT_ID_PATTERN.source}
                            title='Formato: GameName#TAG (TAG de 1 a 4 caracteres alfanuméricos)'
                            aria-invalid={!!error}
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
                        
                        <div className='flex flex-row gap-2'>
                            <Button
                                type='button'
                                className='bg-primary-foreground text-background text-xs font-bold w-fit h-8 rounded-[0.5rem] hover:bg-primary-foreground/90 cursor-pointer'
                                aria-label='Actualizar'
                                onClick={handleUpdate}
                                disabled={!isValid || loading}
                            >
                                {loading ? (
                                    <Spinner className='h-4 w-3 scale-150 flex items-center justify-center' />
                                ) : (
                                    "Actualizar"
                                )}
                            </Button>
                            
                            <Button
                                type='submit'
                                className='bg-primary-foreground text-background text-xs font-bold px-12 py-2 w-40 h-8 rounded-[0.5rem] hover:bg-primary-foreground/90 cursor-pointer'
                                aria-label='Buscar perfil'
                                disabled={!isValid || loading}
                            >
                                {loading ? (
                                    <Spinner className='h-4 w-3 scale-150 flex items-center justify-center' />
                                ) : (
                                    "Buscar"
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
            </article>
        </section>
    );
};

export default Search;
