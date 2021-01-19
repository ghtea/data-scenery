

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