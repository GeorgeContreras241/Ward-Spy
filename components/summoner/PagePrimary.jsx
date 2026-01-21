import { MatchHistory } from '@/components/match-history/MatchHistory'
import { LiveGame } from '@/components/live-game/LiveGame'
import { NavbarMatch } from '@/components/match-history/NavbarMatch'
import { ChampionsMostPlayed } from '@/components/champions-most-played/ChampionsMostPlayed'
import { Clash } from '@/components/clash/Clash'


export const PagePrimary = ({ error, dataSumonner, setRouterPath, routerPath, newDate, items,itemsInfo }) => {
    return (
        <>
            {error &&
                <p className="text-red-500 text-center mt-20">{error}</p>
            }
            {dataSumonner && <>
                <NavbarMatch setRouterPath={setRouterPath} />
                {routerPath === 1 && <MatchHistory items={items} itemsInfo={itemsInfo}/>}
                {routerPath === 2 && <LiveGame newDate={newDate} puuid={dataSumonner.user.puuid} />}
                {routerPath === 3 && <Clash />}
                {routerPath === 4 && <ChampionsMostPlayed />}
            </>
            }
        </>
    )
}
