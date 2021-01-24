

export const name__GET_LEAGUE_STANDINGS = 'data/football/GET_LEAGUE_STANDINGS';
type Payload__GET_LEAGUE_STANDINGS = {
    idLeague: string
}
export const return__GET_LEAGUE_STANDINGS = (payload: Payload__GET_LEAGUE_STANDINGS) => {
    return {
        type: name__GET_LEAGUE_STANDINGS,
        payload: payload
    }
};
export type type__GET_LEAGUE_STANDINGS = ReturnType<typeof return__GET_LEAGUE_STANDINGS>;


export const name__UPDATE_LEAGUE_STANDINGS = 'data/football/UPDATE_LEAGUE_STANDINGS';
type Payload__UPDATE_LEAGUE_STANDINGS = {
    idLeague: string,
    triggeringGet?: boolean,
}
export const return__UPDATE_LEAGUE_STANDINGS = (payload: Payload__UPDATE_LEAGUE_STANDINGS) => {
    return {
        type: name__UPDATE_LEAGUE_STANDINGS,
        payload: payload
    }
};
export type type__UPDATE_LEAGUE_STANDINGS = ReturnType<typeof return__UPDATE_LEAGUE_STANDINGS>;





export type Team = {
    id: string;
    name: string;
    code: string;
    pathLogo: string;
    country: {
        id: string;
        name: string;
        alpha2: string;
        continent: string;
    }
};
export type StatPlaceTeam = {
    games_played:number
    won:number
    draw:number
    lost:number
    goals_diff:number
    goals_scored:number
    goals_against:number
}
export type StatTeam ={
    id:string;
    points:number;
    position: number;
    status:string;
    result: 'Champions League' | 'Europa League' | 'Relegation' | undefined;
    overall:StatPlaceTeam;
    home:StatPlaceTeam;
    away:StatPlaceTeam;
};

export type LeagueStandings = {
    idLeague: string;
    idSeason: string;
    dateUpdated: number;

    dictStatTeam: { 
        [key: string]: StatTeam 
    }
    listIdStatTeam: string[];
};

export const name__GET_LIST_TEAM = 'data/football/GET_LIST_TEAM';
type Payload__GET_LIST_TEAM = {
    idCountry?: string,
}
export const return__GET_LIST_TEAM = (payload: Payload__GET_LIST_TEAM) => {
    return {
        type: name__GET_LIST_TEAM,
        payload: payload
    }
};
export type type__GET_LIST_TEAM = ReturnType<typeof return__GET_LIST_TEAM>;


export const name__CHECK_LIST_TEAM = 'data/football/CHECK_LIST_TEAM';
type Payload__CHECK_LIST_TEAM = {
    listIdTeam: string[],
}
export const return__CHECK_LIST_TEAM = (payload: Payload__CHECK_LIST_TEAM) => {
    return {
        type: name__CHECK_LIST_TEAM,
        payload: payload
    }
};
export type type__CHECK_LIST_TEAM = ReturnType<typeof return__CHECK_LIST_TEAM>;


export const name__ADD_TEAM = 'data/football/ADD_TEAM';
type Payload__ADD_TEAM = {
    idTeam: string,
    triggeringGet?: boolean,
}
export const return__ADD_TEAM = (payload: Payload__ADD_TEAM) => {
    return {
        type: name__ADD_TEAM,
        payload: payload
    }
};
export type type__ADD_TEAM = ReturnType<typeof return__ADD_TEAM>;

/*
export const name__MANIPULATE_DATA = 'data/MANIPULATE_DATA';
type Payload__MANIPULATE_DATA = {
    kind: 'create' | 'update',
    draft: any,
    id? : string,
    idOwner?: string,
}
export const return__MANIPULATE_DATA = (payload: Payload__MANIPULATE_DATA) => {
    return {
        type: name__MANIPULATE_DATA,
        payload: payload
    }
};
export type type__MANIPULATE_DATA = ReturnType<typeof return__MANIPULATE_DATA>;




export const name__DELETE_DATA = 'data/DELETE_DATA';
interface Payload__DELETE_DATA {
    id: string;
    urlImageIcon: string | undefined;
    idUser: string | undefined;
}
export const return__DELETE_DATA = (payload: Payload__DELETE_DATA) => {
    return {
        type: name__DELETE_DATA,
        payload: payload
    }
};
export type type__DELETE_DATA = ReturnType<typeof return__DELETE_DATA>;



export const name__GET_DATA = 'data/GET_DATA'; 
export const return__GET_DATA = (payload: any) => {
    return {
        type: name__GET_DATA,
        payload: payload
    }
};
export type type__GET_DATA = ReturnType<typeof return__GET_DATA>;

*/