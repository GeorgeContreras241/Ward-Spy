import { getTypeQueue } from "./getTypeQueue";

export const mapMatchData = (info) => {
  return {
    gc: info.gameCreation ?? null,      // Game creation
    gd: info.gameDuration ?? null,
    gm: getTypeQueue(info.queueId) ?? null,   // Game mode
    pi: info.platformId ?? null,        // Platform
    b: info.teams ?? null,
    to: info.teams.map(item => ({
      team: item.teamId,
      kills: item.objectives.champion.kills ?? null,
    })),         // Queue ID
    p: info.participants.map((p) => ({
      // Player identificatio
      tq: getTypeQueue(info.queueId) ?? null,
      id: p.puuid ?? null,              // Player UUID
      n: p.championName ?? null,        // Champion name
      rid: p.riotIdGameName ?? null,    // Riot ID name
      rit: p.riotIdTagline ?? null,     // Riot ID tag
      ti: p.teamId ?? null,             // Team ID
      gm: info.gameMode ?? null,
      gd: info.gameDuration ?? null,
      // Core stats
      k: p.kills ?? null,
      d: p.deaths ?? null,
      a: p.assists ?? null,
      kda: p.challenges?.kda?.toFixed(2) ?? ((p.kills + p.assists) / p.deaths).toFixed(2),
      kp: p.challenges?.killParticipation ?? null,
      w: p.win ?? null,

      // Gold & economy
      ge: p.goldEarned ?? null,
      gs: p.goldSpent ?? null,
      gpm: p.challenges?.goldPerMinute ?? null,

      // Experience & level
      xp: p.champExperience ?? null,
      lvl: p.champLevel ?? null,

      // Damage stats
      dc: p.totalDamageDealtToChampions ?? null,
      dmc: p.magicDamageDealtToChampions ?? null,
      dpc: p.physicalDamageDealtToChampions ?? null,
      dvc: p.trueDamageDealtToChampions ?? null,
      dt: p.totalDamageDealt ?? null,
      dtk: p.totalDamageTaken ?? null,
      dfk: p.physicalDamageTaken ?? null,
      db: p.damageDealtToBuildings ?? null,
      dpm: p.challenges?.damagePerMinute ?? null,

      // Minions & farming
      cs: p.totalMinionsKilled ?? null,
      cseg: p.challenges?.csEarlyGame ?? null,
      csmg: p.challenges?.csMidGame ?? null,
      cslg: p.challenges?.csLateGame ?? null,

      // Objectives
      bk: p.baronKills ?? null,
      dk: p.dragonKills ?? null,
      ik: p.inhibitorKills ?? null,
      tk: p.turretKills ?? null,
      tr: p.challenges?.turrets ?? null,
      bg: p.challenges?.bountyGold ?? null,

      // Vision & map control
      vs: p.visionScore ?? null,
      vspm: p.challenges?.visionScorePerMin ?? null,
      wp: p.wardsPlaced ?? null,
      wd: p.challenges?.wardsDestroyed ?? null,
      wk: p.wardsKilled ?? null,

      // Combat stats
      lts: p.longestTimeSpentLiving ?? null,
      ttd: p.totalTimeSpentDead ?? null,
      tcc: p.timeCCingOthers ?? null,
      tcd: p.totalTimeCCDealt ?? null,

      // Items & summoners
      it0: p.item0 ?? null,
      it1: p.item1 ?? null,
      it2: p.item2 ?? null,
      it3: p.item3 ?? null,
      it4: p.item4 ?? null,
      it5: p.item5 ?? null,
      it6: p.item6 ?? null,
      sm: p.summoner1Id ?? null,
      sm2: p.summoner2Id ?? null,

      // Skillshots
      ssa: p.challenges?.skillshotAccuracy ?? null,
      ssd: p.challenges?.skillshotsDodged ?? null,


      // Perks
      pk: p.perks ?? null,
    }))
  };
};
