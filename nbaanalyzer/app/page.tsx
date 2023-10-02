"use client"

import { getPlayerData, getBasicPlayerStats } from "./apis";
import { backgroundColorClass_100, backgroundColorClass_200, textColorClass_800, borderColorClass_800 } from "./colorClasses";
import { getPlayerPictureIdByPlayerName, getThemeByTeamAbbriviation, getPlayerNamesBySearch, randomInitialPlayerName} from "./jsonTools";
import * as React from "react"
import { BasicPLayerStats, RelevantPlayerData } from "./index.ts";
import { LoadingWheel, TeamIcon } from "./reactComponents";
import Image from 'next/image'

export default function Home() {
  const [inputValue,setInputValue] = React.useState<string>("");
  const [basicStats, setBasicStats] = React.useState<BasicPLayerStats>({pts: 0, ast: 0, blk: 0, stl: 0, reb: 0, gamesPlayed: 0});
  const [playerHeadshot, setPlayerHeadshot] = React.useState<string>("");
  const [teamTheme, setTheme] = React.useState<string>("blue");
  const [isLoadingWheelHidden, setIsLoadingWheelHidden] = React.useState<boolean>(true);
  const [isPictureLoading, setIsPictureLoading] = React.useState<boolean>(false);
  const [inputDropdownNames, setInputDropdownNames] = React.useState<string[]>([]);
  const [teamAbbreviation,setTeamAbbreviation] = React.useState<string>("");
  const [playerName, setPlayerName] = React.useState<string>("");
  

  React.useEffect(() => {
    const setInitialPlayer = async() => {
      const randomPlayerName: string = randomInitialPlayerName();
      setIsLoadingWheelHidden(false);
      const playerData: RelevantPlayerData = await getPlayerData(randomPlayerName.toLowerCase());
      const basicPlayerStats: BasicPLayerStats = await getBasicPlayerStats(playerData.id);
      setTeamAbbreviation(playerData.teamAbbreviation);
      const pictureId: number = getPlayerPictureIdByPlayerName(randomPlayerName);
      const theme: string = getThemeByTeamAbbriviation(playerData.teamAbbreviation);
      setIsLoadingWheelHidden(true);

      if(basicPlayerStats && theme){
        setBasicStats({...basicPlayerStats});
        setTheme(theme);
        setPlayerName(randomPlayerName);
        setPlayerHeadshot(pictureId == 0 ? "1.png" : "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" + pictureId + ".png");
      }
    }
    setInitialPlayer();
  }, [])

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const updatedInputValue: string = ev.target.value;
    setInputValue(updatedInputValue);
    inputDropdownNames.length = 0;
    inputDropdownNames.push(...getPlayerNamesBySearch(ev.target.value.toLowerCase()));
    if(updatedInputValue.length ==  0)
      inputDropdownNames.length = 0;
  }

  const handleClickInputDropdown = async(ev: React.MouseEvent<HTMLElement>) => {
    inputDropdownNames.length = 0;
    const selectedDropdown: HTMLElement = ev.target as HTMLElement;
    const dropdownPlayerName = selectedDropdown.innerHTML;
    const inputNode: HTMLInputElement = document.getElementById('playerNameInput') as HTMLInputElement;
    inputNode.value = dropdownPlayerName;
    setInputValue(dropdownPlayerName);

    setIsLoadingWheelHidden(false);
    const playerData: RelevantPlayerData = await getPlayerData(dropdownPlayerName.toLowerCase());
    const basicPlayerStats: BasicPLayerStats = await getBasicPlayerStats(playerData.id);
    setTeamAbbreviation(playerData.teamAbbreviation);
    const pictureId: number = getPlayerPictureIdByPlayerName(dropdownPlayerName);
    const theme: string = getThemeByTeamAbbriviation(playerData.teamAbbreviation);
    setIsLoadingWheelHidden(true);

    if(basicPlayerStats && theme){
      setPlayerName(dropdownPlayerName);
      setBasicStats({...basicPlayerStats});
      setTheme(theme);
      setPlayerHeadshot(pictureId == 0 ? "1.png" : "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" + pictureId + ".png");
    }
  }
  const imageStyleWhileLoadnig = {
    opacity: 0,
    transition: "all 1s"
  }

  const imageStyle = {
    opacity: 1,
    transition: "all 1s"
  }

  return (
    <main>
      <LoadingWheel isHidden={isLoadingWheelHidden}></LoadingWheel>
      <div className={textColorClass_800[teamTheme] + ' transition-colors ' + backgroundColorClass_100[teamTheme] + ' duration-1000 h-screen flex flex-col justify-center place-items-center'}>
      <div className="flex flex-col w-1/2 h-1/6 place-items-center">
      <input id="playerNameInput" className={borderColorClass_800[teamTheme] + ' ' + backgroundColorClass_200[teamTheme] +" w-1/2 h-1/3 border-2 outline-0 rounded-3xl text-center"} onChange={handleChange}></input>
      <div className={borderColorClass_800[teamTheme] + " " + (inputDropdownNames.length == 0 ? "" : "border") + " w-1/2"}>
        {
          inputDropdownNames.map(inputDropdownName => {
            return (
              <div className={"hover:" + backgroundColorClass_200[teamTheme]} key={inputDropdownName}><p onClick={handleClickInputDropdown}>{inputDropdownName}</p></div>
            )
         })
        }
      </div>
      </div>
          <div className="relative flex flex-col justify-center place-items-center w-1/2 h-1/2">
          <div className="top-0 w-full h-1/5 flex justify-evenly place-items-center ">
          <p className= " w-1/6 text-center text-2xl">pts: {basicStats.pts}</p>
          </div>
          <div className="absolute w-full h-1/4 top-1/3 flex justify-evenly place-items-center ">
            <p className="w-1/6 text-center text-2xl">ast: {basicStats.ast}</p>
            <p className="w-1/6 text-center text-2xl">reb: {basicStats.reb}</p>
          </div>
          <div className="absolute w-4/6 h-1/5 top-2/3 flex justify-between place-items-center ">
            <p className="w-1/6 text-center text-2xl">blk: {basicStats.blk}</p>
            <p className="w-1/6 text-center text-2xl">stl: {basicStats.stl}</p>
          </div>
          <div className="min-w-min w-[50%] max-w-xs h-1/2 relative">
          <Image alt={"Player Headshot"} style={ isLoadingWheelHidden ? imageStyle : imageStyleWhileLoadnig} fill={true} src = {playerHeadshot}></Image>
          </div>
      </div>
      <TeamIcon teamAbbreviation={teamAbbreviation}></TeamIcon>
      <p><b>{playerName}</b> 2022/23 NBA season</p>
      </div>
    </main>
  )
}
