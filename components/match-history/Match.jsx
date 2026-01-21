"use client"
import { Tooltip } from "react-tooltip";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { InfoGameMatch } from "@/components/match-history/InfoGameMatch";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";


export const Match = ({ dataPlayer, dataPlayers, isCurrentPlayer = false, team1, team2, gameCreation, gameDurationMinutes, gameMode, gameTimeCreation, version, urlListSpell, itemsInfo,perks }) => {
  const [show, setShow] = useState(false)
  const router = useRouter()

  const perksPrimary = perks.find(p => p.id === dataPlayer.pk.styles[0].style);
  const perksSecondary = perks.find(p => p.id === dataPlayer.pk.styles[1]?.style);

  // Navigation Function - opens summoner page
  const autoOpen = (rit, rid) => {
    router.push(`/summoner/${rit}-${rid}`);

  };

  // Calculate KDA ratio with fallback to 0 if no deaths
  const kdaRatio = dataPlayer.d === 0
    ? (dataPlayer.k + dataPlayer.a).toFixed(1)
    : ((dataPlayer.k + dataPlayer.a) / dataPlayer.d).toFixed(2);

  // Calculate kill participation percentage
  const teamId = dataPlayer.ti;
  const teamKills = teamId === 100 ? team1.kills : team2.kills;
  const killParticipation = teamKills > 0
    ? Math.round(((dataPlayer.k + dataPlayer.a) / teamKills) * 100)
    : 0;

  // Calculate CS per minute (using game duration in minutes)
  /* const gameDurationMinutes = (dataPlayer.gd || 20 * 60) / 60; */
  const csPerMin = (dataPlayer.cs / gameDurationMinutes).toFixed(1);

  // Team and win status styling
  const teamColor = dataPlayer.ti === 100 ? 'border-blue-500' : 'border-red-500';
  const winColor = dataPlayer.w ? 'bg-green-950' : 'bg-red-950';

  if (!dataPlayer) {
    return (
      <p>No data available</p>
    )
  }


  // Get items array with null checks
  const items = [
    dataPlayer?.it0, dataPlayer?.it1, dataPlayer?.it2,
    dataPlayer?.it3, dataPlayer?.it4, dataPlayer?.it5, dataPlayer?.it6
  ].filter(Boolean);

  // Calculate rival difficulty score (placeholder implementation)
  const calculateRivalDifficulty = (rivalStats) => {
    let score = 0;

    // KDA based scoring
    const kda = rivalStats.k / (rivalStats.d || 1) + (rivalStats.a * 0.5);
    if (kda >= 5) score += 3;
    else if (kda >= 3) score += 2;
    else if (kda >= 1.5) score += 1;

    // Damage based scoring
    const damage = rivalStats.dc || 0;
    if (damage >= 30000) score += 3;
    else if (damage >= 20000) score += 2;
    else if (damage >= 10000) score += 1;

    // CS per minute scoring
    const rivalCsPerMin = rivalStats.cs / gameDurationMinutes;
    if (rivalCsPerMin >= 7) score += 2;
    else if (rivalCsPerMin >= 5) score += 1;

    // Kill participation scoring
    const kp = rivalStats.kp || 0;
    if (kp >= 0.7) score += 2;
    else if (kp >= 0.5) score += 1;

    return score;
  };

  // Game info string for debugging/display
  const gameInfo = `Partida ${gameMode}
  Campeón: ${dataPlayer.n},
  Resultado: ${dataPlayer.w ? 'Victoria' : 'Derrota'},
  KDA: ${kdaRatio} (${dataPlayer.k}/${dataPlayer.d}/${dataPlayer.a}),
  CS/min: ${csPerMin},
  Oro: ${dataPlayer.ge},
  Daño: ${dataPlayer.dc},
  Daño recibido: ${dataPlayer.dtk},
  Visión: ${dataPlayer.vs},
  Objetivos: ${dataPlayer.tk || 0}`;


  // Render item tooltip content
  const renderItemTooltip = (itemId) => {
    if (!itemId || !itemsInfo[itemId]) return null;

    const item = itemsInfo[itemId];
    return (
      <div className="max-w-[200px] flex flex-col gap-1 p-2">
        <h3 className="font-semibold text-chart-3">{item.name}</h3>
        {item.description && (
          <div
            className="text-xs text-gray-300"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        )}
        {item.gold && (
          <div className="mt-1 text-xs text-yellow-400">
            Cost: {item.gold.total} gold
          </div>
        )}
      </div>
    );
  };

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
              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${dataPlayer?.n}.png` || '/default-champion.png'}
              alt={dataPlayer?.n || 'Champion'}
              width={56}
              height={56}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className='w-full h-full object-cover aspect-square border rounded-full border-border'
              onError={(e) => {
                if (e.target.src.endsWith('default-champion.png')) return;
                e.target.src = '/default-champion.png';
              }}
              sizes="(max-width: 768px) 40px, 56px"
            />
            <span className='absolute bottom-0 right-0 bg-accent/80 text-[10px] px-1 rounded-tl text-foreground'>{dataPlayer.lvl}</span>
          </div>

          {/*Summoners*/}
          <div className='flex flex-col gap-1'>
            <div className='md:h-6 md:w-6 h-5 w-5 rounded overflow-hidden bg-muted'>
              {urlListSpell && dataPlayer.sm && (
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${urlListSpell[dataPlayer.sm] || 'SummonerFlash'}`}
                  className='w-full h-full object-cover'
                  alt={`${dataPlayer.sm} summoner spell`}
                  width={24}
                  height={24}
                  decoding="async"
                  fetchPriority="low"
                  loading="lazy"
                  sizes="24px"
                  onError={(e) => {
                    if (e.target.src.endsWith('default-spell.png')) return;
                    e.target.src = '/default-spell.png';
                  }}
                />
              )}
            </div>
            <div className='h-6 w-6 rounded overflow-hidden bg-muted'>
              {urlListSpell && dataPlayer.sm2 && (
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${urlListSpell[dataPlayer.sm2] || 'SummonerHeal'}`}
                  className='w-full h-full object-cover'
                  alt={`${dataPlayer.sm2} summoner spell`}
                  width={24}
                  height={24}
                  decoding="async"
                  fetchPriority="low"
                  loading="lazy"
                  sizes="24px"
                  onError={(e) => {
                    if (e.target.src.endsWith('default-spell.png')) return;
                    e.target.src = '/default-spell.png';
                  }}
                />
              )}
            </div>
          </div>
          {/* Perks */}
          <div className='flex flex-col gap-1'>
            <div className="flex flex-col gap-1">
              <img 
                src={`https://ddragon.leagueoflegends.com/cdn/img/${perksPrimary?.icon}`}
                alt="Primary rune"
                loading="lazy"
                fetchPriority="Low"
                decoding="async"
                width={24}
                height={24}
                className="rounded border border-border"
              />
              {perksSecondary && (
                <img 
                  src={`https://ddragon.leagueoflegends.com/cdn/img/${perksSecondary.icon}`}
                  alt="Secondary rune"
                  loading="lazy"
                  fetchPriority="Low"
                  decoding="async"
                  width={24}
                  height={24}
                  className="rounded border border-border"
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
            <span className='font-bold text-foreground'>{dataPlayer?.k}</span>
            <span className='text-muted-foreground'>/</span>
            <span className="font-bold text-red-400">{dataPlayer?.d}</span>
            <span className='text-muted-foreground'>/</span>
            <span className='font-bold text-blue-400'>{dataPlayer?.a}</span>
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
          <span className="text-popover-foreground" data-tooltip-id="infoPlayer" data-tooltip-content="Minions">{dataPlayer?.cs} ({csPerMin})</span>
          <span className="text-popover-foreground" data-tooltip-id="infoPlayer" data-tooltip-content="Gold">{(dataPlayer?.ge / 1000).toFixed(1)}k</span>
          <span className="text-popover-foreground" data-tooltip-id="infoPlayer" data-tooltip-content="Damage">{(dataPlayer?.dc / 1000).toFixed(1)}k</span>
          <span className="text-popover-foreground" data-tooltip-id="infoPlayer" data-tooltip-content="Duration">{gameDurationMinutes} min</span>
          <span className="text-xs tracking-wide w-full" data-tooltip-id="infoPlayer" data-tooltip-content={gameTimeCreation}>{gameCreation}</span>
        </section>

        <section className='sm:flex flex-row gap-1 py-1 align-center justify-center hidden'>
          <ul className="flex flex-col items-center justify-center w-[110px] md:w-[150px]">
            {
              team1.players.map((item, index) => (
                <li key={index} className="flex w-full flex-row items-center cursor-pointer hover:bg-neutral-300/30 hover:brightness-150 gap-1 p-[1px] px-1"
                  onClick={() => {
                    autoOpen(item.rid, item.rit)
                  }}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={item.rid + "#" + item.rit}
                  decoding="async"
                  fetchPriority="low"
                  loading="lazy"
                  data-tooltip-place="top"
                >
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${item?.n}.png`}
                    className="h-4.5 w-4.5 border border-border rounded-radius"
                    alt={`${item?.n} champion icon`}
                    title={item?.n}
                    width={18}
                    height={18}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    sizes="18px"
                    onError={(e) => {
                      if (e.target.src.endsWith('default-champion.png')) return;
                      e.target.src = '/default-champion.png';
                    }}
                  />
                  <span
                    className={`text-[.7rem] h-[10px] flex items-center text-start truncate ${item.id === dataPlayer.id ?
                      'text-chart-3 font-semibold' : 'text-muted-foreground'}`}
                    title={item.rid + "#" + item.rit}
                  >{item.rid}#{item.rit}</span>
                </li>
              ))
            }
          </ul>
          <div className="w-[1px] bg-border/50 h-full"></div>
          <ul className="flex flex-col justify-center w-[110px] md:w-[150px]">
            {
              team2.players.map((item, index) => (
                <li key={index} className="flex flex-row items-center cursor-pointer hover:bg-neutral-300/30 hover:brightness-150  gap-1 p-[1px] px-1"
                  onClick={() => {
                    autoOpen(item.rid, item.rit)
                  }}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={item.rid + "#" + item.rit}
                  decoding="async"
                  fetchPriority="low"
                  loading="lazy"
                  data-tooltip-place="top"
                >
                  <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${item?.n}.png`}
                    className="h-4.5 w-4.5 border border-border rounded-radius" alt={item?.n} title={item?.n} loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    width={18}
                    height={18}
                    sizes="18px"
                    onError={(e) => {
                      if (e.target.src.endsWith('default-champion.png')) return;
                      e.target.src = '/default-champion.png';
                    }}
                  />
                  <span
                    className={`flex text-[.7rem] h-[10px] items-center truncate ${item.id === dataPlayer.it ?
                      'text-chart-3 font-semibold border' : 'text-muted-foreground'}`}
                    title={item.rid + "#" + item.rit}
                  >{item.rid}#{item.rit}</span>
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
                  <div key={index} className='h-6 w-6 md:h-7 md:w-7 lg:h-9 lg:w-9 rounded overflow-hidden bg-muted'
                    data-tooltip-id="info-items"
                    data-item-id={item}
                    data-tooltip-content="ignored">
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item}.png`}
                      className='w-full h-full object-cover'
                      alt={`Item ${index + 1}`}
                      width={36}
                      height={36}
                      decoding="async"
                      fetchPriority="low"
                      loading="lazy"
                      sizes="(max-width: 768px) 24px, 36px"
                      onError={(e) => {
                        if (e.target.src.endsWith('default-item.png')) return;
                        e.target.src = '/default-item.png';
                      }}
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
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${items[6]}.png`}
                    className='w-full h-full object-cover'
                    alt='Trinket item'
                    width={32}
                    height={32}
                    decoding="async"
                    fetchPriority="low"
                    loading="lazy"
                    sizes="32px"
                    onError={(e) => {
                      if (e.target.src.endsWith('default-item.png')) return;
                      e.target.src = '/default-item.png';
                    }}
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
            <InfoGameMatch dataPlayers={dataPlayers} version={version} urlListSpell={urlListSpell} perks={perks} />
          </div>
        ) : null
      }
      <Tooltip id="info-items"
        render={({ content, activeAnchor }) => {
          if (!activeAnchor) return null;
          const itemId = activeAnchor.getAttribute('data-item-id');
          return (
            <div className="max-w-[200px] flex flex-col flex-nowrap gap-2">
              <div className="font-semibold text-chart-3">{itemsInfo[itemId]?.name || 'Unknown Item'}</div>
              <div className="text-xs">{itemsInfo[itemId]?.desp || ''}</div>
            </div>
          )
        }}>
      </Tooltip>
      <Tooltip id="my-tooltip" className="!text-[.7rem] !opacity-60 !p-1 !bg-secondary/90 !font-bold !text-neutral-300" />
      <Tooltip id="infoPlayer" className="!p-1 !text-[9px] !opacity-30 !bg-secondary/90 !font-bold !text-white" />
    </section>

  )
}
