interface playerStatsObjectMeta {
    current_page: number | null;
    next_page: number;
    per_page: number;
    total_count: number;
    total_pages: number;
}

export interface BasicPLayerStats {
    pts: number;
    ast: number; 
    blk: number; 
    stl: number; 
    reb: number;
    gamesPlayed: number;
}

interface TeamData {
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    id: number;
    name: string; 
}
    
export interface playerStatsObjectData {  
ast: number;
blk: number;
dreb: number;
fg3_pct: number;
fg3a: number;
fg3m: number;
fg_pct: number;
fga: number;
fgm: number;
ft_pct: number;
fta: number;
ftm: number;
game: {
    date: Date;
    home_team_id: number;
    home_team_score: number;
    id:number;
    period: number;
    postseason: boolean;
    season: number;
    status: string;
    time: string;
    visitor_team_id:number;
    visitor_team_score: number;
    }
id: number;
min: string;
oreb: number;
pf: number;
player: {
    first_name: string;
    height_feet: number;
    height_inches: number;
    id: number;
    last_name: string;
    position: string;
    team_id: number;
    weight_pounds: number;
    }
pts: number;
reb: number;
stl: number;
team: TeamData;
turnover: number;   
}

export interface PlayerData {
    first_name: string;
    height_feet: number;
    height_inches: number;
    id: number;
    last_name: string;
    position: string;
    team_id: number;
    team: TeamData;
    weight_pounds: number;
}

export interface TeamThemeData {
    teamAbbriviation: string;
    color: string;
}

export interface PlayerPictureData {
    firstName: string;
    lastName: string;
    playerId: number;
    teamId: number;
}

export interface RelevantPlayerData {
    heightFeet: number;
    heightInches: number;
    id: number;
    position: string;
    weightPounds: number;
    teamAbbreviation: string;
    teamConference: string;
    teamDivision: string;
    teamFullName: string;
}

export interface playerDateResponse {
    data: Array<PlayerData>;
    meta:playerStatsObjectMeta;
} 

export interface getTeamIconProps {
    teamAbbreviation: string
}

export interface playerStatsObject {
    data: Array<playerStatsObjectData>,
    meta: playerStatsObjectMeta,
}