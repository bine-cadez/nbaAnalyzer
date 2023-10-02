import { PlayerPictureData, TeamThemeData } from "./index.ts";
import players from "./players.json";
import themes from "./teamsThemes.json";

export const getPlayerPictureIdByPlayerName = (name: string): number => {
    const [firstName, lastName] = name.split(" ");
    const playerData = players.find((player)=> player.firstName.toLowerCase() == firstName.toLowerCase() && player.lastName.toLowerCase() == lastName.toLowerCase());
    if(playerData)
        return playerData.playerId;
    else return 0;
}

export const getThemeByTeamAbbriviation = (teamAbbriviation: string): string => {
    const theme: TeamThemeData | undefined = themes.find((theme)=> theme.teamAbbriviation.toLowerCase() == teamAbbriviation.toLowerCase());
    if(theme)
        return theme.color;
    else return "";
}

export const getPlayerNamesBySearch = (search: string): Array<string> => {
    const playersSearchMatch: Array<PlayerPictureData> = players.filter((player) => player.lastName.toLowerCase().startsWith(search) || player.firstName.toLowerCase().startsWith(search) || (player.firstName.toLowerCase() + " " + player.lastName.toLowerCase()).startsWith(search));
    const playersSearchMatchFullName: Array<string> = playersSearchMatch.map(player => player.firstName + " " + player.lastName);
    if(playersSearchMatchFullName.length <= 4)
        return playersSearchMatchFullName;
    else {
        playersSearchMatchFullName.length = 4;
        return playersSearchMatchFullName;
    }
}

export const randomInitialPlayerName = (): string => {
    const randomNumber = Math.floor(Math.random() * players.length)
    return players[randomNumber].firstName + " " + players[randomNumber].lastName;
}