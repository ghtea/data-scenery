

export const name__GET_WEATHER = 'data/weather/GET_WEATHER';
type Payload__GET_WEATHER = {
    
}
export const return__GET_WEATHER = (payload: Payload__GET_WEATHER) => {
    return {
        type: name__GET_WEATHER,
        payload: payload
    }
};
export type type__GET_WEATHER = ReturnType<typeof return__GET_WEATHER>;

/*
export const name__UPDATE_LEAGUE_STANDINGS = 'data/weather/UPDATE_LEAGUE_STANDINGS';
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
*/
