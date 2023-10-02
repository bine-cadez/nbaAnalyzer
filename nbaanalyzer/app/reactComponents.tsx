import * as NBAIcons from 'react-nba-logos';
import { getTeamIconProps } from './index.ts.jsx';

const NbaTeamIcons: Record<string, JSX.Element> = {
    atl: <NBAIcons.ATL size={150} />,
    bos: <NBAIcons.BOS size={150} />,
    bkn: <NBAIcons.BKN size={150} />,
    cha: <NBAIcons.CHA size={150} />,
    chi:  <NBAIcons.CHI size={150} />,
    cle: <NBAIcons.CLE size={150} />,
    dal: <NBAIcons.DAL size={150} />,
    den: <NBAIcons.DEN size={150} />,
    det: <NBAIcons.DET size={150} />,
    gsw: <NBAIcons.GSW size={150} />,
    hou: <NBAIcons.HOU size={150} />,
    ind: <NBAIcons.IND size={150} />,
    lac: <NBAIcons.LAC size={150} />,
    lal: <NBAIcons.LAL size={150} />,
    mem: <NBAIcons.MEM size={150} />,
    mia: <NBAIcons.MIA size={150} />,
    mil: <NBAIcons.MIL size={150} />,
    min: <NBAIcons.MIN size={150} />,
    nop: <NBAIcons.NOP size={150} />,
    nyk: <NBAIcons.NYK size={150} />,
    okc: <NBAIcons.OKC size={150} />,
    orl: <NBAIcons.ORL size={150} />,
    phi: <NBAIcons.PHI size={150} />,
    phx: <NBAIcons.PHX size={150} />,
    por: <NBAIcons.POR size={150} />,
    sac: <NBAIcons.SAC size={150} />,
    sas: <NBAIcons.SAS size={150} />,
    tor: <NBAIcons.TOR size={150} />,
    uta: <NBAIcons.UTA size={150} />,
    was:  <NBAIcons.WAS size={150} />
}

export const TeamIcon = ({teamAbbreviation}: {teamAbbreviation: string}) => {
    return NbaTeamIcons[teamAbbreviation.toLowerCase()];
}

export const LoadingWheel = ({isHidden}: {isHidden: boolean}) => {
    return (
        <svg aria-hidden="true" className={(isHidden ? "hidden" : "") + " absolute top-45 left-45 w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
    );
}