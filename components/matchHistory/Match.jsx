"use client"
import { Tooltip } from "react-tooltip";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { InfoGameMatch } from "@/components/matchHistory/InfoGameMatch";
import { useSumonnerStore } from "@/app/store/SummonerStore";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export const Match = ({ dataPlayer, dataPlayers, isCurrentPlayer = false, team1, team2, gameCreation, gameDurationMinutes, gameMode, gameTimeCreation }) => {
  console.log(gameTimeCreation)
  const router = useRouter()
  const [show, setShow] = useState(false)

  const { version, urlListSpell = {} } = useSumonnerStore()
  const kdaRatio = dataPlayer.deaths === 0
    ? (dataPlayer.kills + dataPlayer.assists).toFixed(1)
    : ((dataPlayer.kills + dataPlayer.assists) / dataPlayer.deaths).toFixed(2);

  const totalTeamKills = dataPlayer.teamTotalKills || 1;
  const killParticipation = ((dataPlayer.kills + dataPlayer.assists) / totalTeamKills * 100).toFixed(0);


  const matchDurationMinutes = (dataPlayer.matchDuration || 20 * 60) / 60;
  const csPerMin = (dataPlayer.totalMinionsKilled / matchDurationMinutes).toFixed(1);

  const teamColor = dataPlayer.teamId === 100 ? 'border-primary' : 'border-destructive';
  const winColor = dataPlayer.win ? 'dark:bg-green-950 bg-green-700/50' : 'dark:bg-red-950 bg-red-700/50';

  const autoOpen = (name, tagline) => {
    router.push(`/summoner/${name}-${tagline}`)
  }

  if (!dataPlayer) {
    return (
      <p>No data available</p>
    )
  }

  // Get items array with null checks
  const items = dataPlayer ? [
    dataPlayer.item0, dataPlayer.item1, dataPlayer.item2,
    dataPlayer.item3, dataPlayer.item4, dataPlayer.item5, dataPlayer.item6
  ] : [];
  return (
    <section className="flex flex-col items-center ">
      <article
        className={`flex max-w-4xl w-full items-center  justify-around   w-fit flex-row items-center px-2 gap-2 py-1.5 
          md:py-0 rounded-[var(--radius)] border-l-4 
         ${teamColor} ${winColor} ${isCurrentPlayer ? 'ring-2 ring-ring' : ''} transition-colors`}
      >
        <section className="flex flex-row gap-2 shrink-0">
          {/*Champion Image*/}
          <div className='relative md:h-14 md:w-14 h-10 w-10'>
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${dataPlayer?.championName}.png` || '/default-champion.png'}
              alt={dataPlayer?.championName || 'Champion'}
              className='w-full h-full object-cover aspect-square border rounded-full border-border'
              onError={(e) => {
                if (e.target.src.endsWith('default-champion.png')) return;
                e.target.src = '/default-champion.png';
              }}
            />
            <span className='absolute bottom-0 right-0 bg-accent/80 text-[10px] px-1 rounded-tl text-foreground'>{dataPlayer.champLevel}</span>
          </div>
          {/*Summoners*/}
          <div className='flex flex-col gap-1'>
            <div className='md:h-6 md:w-6 h-5 w-5 rounded overflow-hidden bg-muted'>
              {urlListSpell && dataPlayer.summoner1Id && (
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${urlListSpell[dataPlayer.summoner1Id] || 'SummonerFlash'}`}
                  className='w-full h-full object-cover'
                  alt='Summoner Spell 1'
                  onError={(e) => {
                    if (e.target.src.endsWith('default-spell.png')) return;
                    e.target.src = '/default-spell.png';
                  }}
                />
              )}
            </div>
            <div className='h-6 w-6 rounded overflow-hidden bg-muted'>
              {urlListSpell && dataPlayer.summoner2Id && (
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${urlListSpell[dataPlayer.summoner2Id] || 'SummonerHeal'}`}
                  className='w-full h-full object-cover'
                  alt='Summoner Spell 2'
                  onError={(e) => {
                    if (e.target.src.endsWith('default-spell.png')) return;
                    e.target.src = '/default-spell.png';
                  }}
                />
              )}
            </div>
          </div>
        </section>
        {/* KDA */}
        <section className='flex flex-col items-center min-w-[100px] shrink-0'>
          <div className='flex items-center gap-1'>
            <span className="font-bold text-popover-foreground text-[.7rem]">{gameMode ? gameMode : 'Unknown'}</span>
          </div>
          <div className='flex items-center gap-1 text-md md:text-xl'>
            <span className='font-bold text-foreground'>{dataPlayer?.kills}</span>
            <span className='text-muted-foreground'>/</span>
            <span className="font-bold text-lose">{dataPlayer?.deaths}</span>
            <span className='text-muted-foreground'>/</span>
            <span className='font-bold text-win'>{dataPlayer?.assists}</span>
          </div>
          <div className='text-xs'>
            <span className="font-semibold text-popover-foreground">
              {kdaRatio} KDA
            </span>
          </div>
          <div className='text-xs text-muted-foreground'>
            {killParticipation}% KP
          </div>
        </section>

        {/* Stats */}
        <section className='stats flex flex-col justify-center items-start text-xs min-w-[80px] shrink-0 border-l border-border border-chart-1 pl-[5px]'>
            <span className="text-popover-foreground" data-tooltip-id="infoPlayer" data-tooltip-content="Minions">{dataPlayer?.totalMinionsKilled} ({csPerMin})</span>
            <span className="text-popover-foreground" data-tooltip-id="infoPlayer" data-tooltip-content="Gold">{(dataPlayer?.goldEarned / 1000).toFixed(1)}k</span>
            <span className="text-popover-foreground" data-tooltip-id="infoPlayer" data-tooltip-content="Damage">{(dataPlayer?.totalDamageDealtToChampions / 1000).toFixed(1)}k</span>
            <span className="text-popover-foreground" data-tooltip-id="infoPlayer" data-tooltip-content="Duration">{gameDurationMinutes} min</span>
            <span className="text-xs tracking-wide w-full" data-tooltip-id="infoPlayer" data-tooltip-content={gameTimeCreation}>{gameCreation}</span>
        </section>

        <section className='sm:flex flex-row gap-1 py-1 align-center justify-center hidden'>
          <ul className="flex flex-col items-center justify-center w-[110px] md:w-[150px]">
            {
              team1.map((item, index) => (
                <li key={index} className="flex w-full flex-row items-center cursor-pointer hover:bg-neutral-300/30 hover:brightness-150 gap-1 p-[1px] px-1"
                  onClick={() => {
                    autoOpen(item.riotIdGameName, item.riotIdTagline)
                  }}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={item.riotIdGameName + "#" + item.riotIdTagline}
                  data-tooltip-place="top"
                >
                  <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${item?.championName}.png`}
                    className="h-4.5 w-4.5 border border-border rounded-[var(--radius)]" alt={items?.championName} title={item?.championName} />
                  <span
                    className={`text-[.7rem] h-[10px] flex items-center text-start truncate ${item.riotIdGameName === dataPlayer.riotIdGameName ?
                      'text-chart-3 font-semibold' : 'text-muted-foreground'}`}
                  >{item.riotIdGameName}#{item.riotIdTagline}</span>
                </li>
              ))
            }
          </ul>
          <div className="w-[1px] bg-border/50 h-full"></div>
          <ul className="flex flex-col justify-center w-[110px] md:w-[150px]">
            {
              team2.map((item, index) => (
                <li key={index} className="flex flex-row items-center cursor-pointer hover:bg-neutral-300/30 hover:brightness-150  gap-1 p-[1px] px-1"
                  onClick={() => {
                    autoOpen(item.riotIdGameName, item.riotIdTagline)
                  }}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={item.riotIdGameName + "#" + item.riotIdTagline}
                  data-tooltip-place="top"
                >
                  <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${item?.championName}.png`}
                    className="h-4.5 w-4.5 border border-border rounded-[var(--radius)]" alt={item?.championName} title={item?.championName}  loading="lazy"/>
                  <span
                    className={`flex text-[.7rem] h-[10px] items-center truncate ${item.riotIdGameName === dataPlayer.riotIdGameName ?
                      'text-chart-3 font-semibold' : 'text-muted-foreground'}`}
                    title={item.riotIdGameName + "#" + item.riotIdTagline}
                  >{item.riotIdGameName}#{item.riotIdTagline}</span>
                </li>
              ))
            }
          </ul>
        </section>
        {/* Items Grid */}
        <div className='flex flex-row gap-1 shrink-0'>
          {/* Main Items */}
          <div className='grid grid-cols-3 gap-1'>
            {items.slice(0, 6).map((item, index) => {
              if (item != 0) {
                return (
                  <div key={index} className='h-6 w-6 md:h-7 md:w-7 lg:h-9 lg:w-9 rounded overflow-hidden bg-muted'>
                    <img
                      src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item}.png`}
                      className='w-full h-full object-cover'
                      alt={`Item ${index + 1}`}
                    />
                  </div>
                )
              } else {
                return (
                  <div key={index} className='h-6 w-6 md:h-7 md:w-7 lg:h-9 lg:w-9 rounded bg-secondary border border-border' />
                )
              }
            })}
            {Array.from({ length: 6 - Math.min(6, items.length) }).map((_, index) => (
              <div key={`empty-${index}`} className='h-6 w-6 md:h-7 md:w-7 lg:h-9 lg:w-9 rounded bg-secondary border border-border' />
            ))}
          </div>

          {/* Trinket Row */}
          <aside className="flex flex-col items-center gap-3">
            <div className='flex  justify-center mt-1'>
              {items[6] ? (
                <div className='h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 rounded overflow-hidden bg-muted'>
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${items[6]}.png`}
                    className='w-full h-full object-cover'
                    alt='Trinket'
                  />
                </div>

              ) : (
                <div className='h-6 w-6 md:h-7 md:w-7 lg:h-9 lg:w-9 rounded bg-secondary border border-border' />
              )}
            </div>
            <button className="" onClick={() => setShow(!show)}>
              {show ?
                <IoIosArrowUp className="w-5 h-5 cursor-pointer hover:text-primary hover:scale-105 transition-all" />
                : <IoIosArrowDown className="w-5 h-5 cursor-pointer hover:text-primary hover:scale-105 transition-all" />}
            </button>
          </aside>

        </div>


      </article>
      {
        show ? (
          <div className="mt-2 w-full">
            <InfoGameMatch dataPlayers={dataPlayers} />
          </div>
        ) : null
      }
      <Tooltip id="my-tooltip" className="!text-[.7rem] !opacity-60 !p-1 !bg-secondary/90 !font-bold !text-neutral-300"/>
      <Tooltip id="infoPlayer" className="!p-1 !text-[9px] !opacity-30 !bg-secondary/90 !font-bold !text-white"/>
    </section>

  )
}
