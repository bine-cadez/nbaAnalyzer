import { roundToOneDecimal,  sumPlayerStats} from "./utils";
import {playerStatsObject, BasicPLayerStats, PlayerData, RelevantPlayerData, playerDateResponse } from "./index.ts";

export const getPlayerData = async(playerName: string): Promise<RelevantPlayerData> => {
    const urlFriendlyPlayerName: string = playerName.replace(" ", "%20").toLowerCase();
    const url: string = 'https://free-nba.p.rapidapi.com/players?page=0&per_page=25&search=' + urlFriendlyPlayerName;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e0e448dfa9msh8f39dc95dd17a77p168a67jsn094a64391eaa',
            'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
        }
    };
    try {
        const rawResponse = await fetch(url, options);
        if(rawResponse.status === 200) {
            const response = await rawResponse.text();
            const playerDataArr: playerDateResponse = JSON.parse(response);
            const playerData: PlayerData = playerDataArr.data[0];
            const relevantPlayerData: RelevantPlayerData = {
                id: playerData.id,
                heightFeet: playerData.height_feet,
                heightInches: playerData.height_inches,
                position: playerData.position,
                weightPounds: playerData.weight_pounds,
                teamAbbreviation: playerData.team.abbreviation,
                teamConference: playerData.team.conference,
                teamDivision: playerData.team.division,
                teamFullName: playerData.team.division
            }
            return relevantPlayerData;
        }
        else {
            return Promise.reject(new Error("servers down"));
        }
    } 
    catch (error) {
        return Promise.reject(error);
    }
}

export const getBasicPlayerStats = async(playerId: number): Promise<BasicPLayerStats> => {
    const url = 'https://free-nba.p.rapidapi.com/stats?seasons[]=2022&player_ids[]='+playerId+'&page=0&per_page=82';
    const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'e0e448dfa9msh8f39dc95dd17a77p168a67jsn094a64391eaa',
      'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
    }
  };
  
  try {
    const rawResponse = await fetch(url, options);
    if(rawResponse.status === 200) {
    const response = await rawResponse.text();
    const allGamesPlayerStats:playerStatsObject  = JSON.parse(response);
  
    const sumAst: number = sumPlayerStats(allGamesPlayerStats, "ast");
    const sumPts: number = sumPlayerStats(allGamesPlayerStats, "pts");
    const sumReb: number = sumPlayerStats(allGamesPlayerStats, "reb");
    const sumBlk: number = sumPlayerStats(allGamesPlayerStats, "blk");
    const sumStl: number = sumPlayerStats(allGamesPlayerStats, "stl");
  
    let gamesPlayed: number = 0;

    allGamesPlayerStats.data.forEach((gamePlayed:any )=> {
      if(gamePlayed.min != "00")
      gamesPlayed++;
    });
  
    return {
        gamesPlayed,
        pts: isNaN(roundToOneDecimal(sumPts / gamesPlayed)) ? 0 : roundToOneDecimal(sumPts / gamesPlayed),
        ast: isNaN(roundToOneDecimal(sumAst / gamesPlayed)) ? 0 : roundToOneDecimal(sumAst / gamesPlayed),
        reb: isNaN(roundToOneDecimal(sumReb / gamesPlayed)) ? 0 : roundToOneDecimal(sumReb / gamesPlayed),
        blk: isNaN(roundToOneDecimal(sumBlk / gamesPlayed)) ? 0 : roundToOneDecimal(sumBlk / gamesPlayed),
        stl: isNaN(roundToOneDecimal(sumStl / gamesPlayed)) ? 0 : roundToOneDecimal(sumStl / gamesPlayed),
        }
    }
    else {
        return {
            gamesPlayed: 0,
            pts: 0,
            ast: 0,
            reb: 0,
            blk: 0,
            stl: 0
            }
        }
    }
  catch (error) {
      return Promise.reject(error);
  }
}
    