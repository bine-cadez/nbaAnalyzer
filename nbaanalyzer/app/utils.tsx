import { playerStatsObject } from "./index.ts";

export const roundToOneDecimal = (x: number): number  => {
    return Math.round(x * 10) / 10;
  }

export const sumPlayerStats = (obj: playerStatsObject, attr: string): number => {
    const playerStatSeasonTotal: number = obj.data.reduce((accumulator: any, currentValue: any) => {
        return accumulator + currentValue[attr];
      }, 0);
    return playerStatSeasonTotal;
  }
