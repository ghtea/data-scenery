import produce from 'immer';
import {handleActions} from 'redux-actions';

import * as actionsRoot from "store/actions";
import * as types from "./status/types";

import putValueToNestedObject from 'tools/vanilla/putValueToNestedObject';

export type State = typeof stateInitial;


const stateInitial = {
  
  loading: {
    user: false,
    data: {
        football: {
            leagueStandings: false,
            listTeam: false,
        }
    },
  },
  
  ready: {
    user: false,
    data: {
        football: {
            leagueStandings: false,
            listTeam: false,
        }
    },
    // listPortal: false,
  },
  

  current: {
    
    language: '',   // en, ko, ja    , it should be blank at first check cookie first (call DETECT_LANGUAGE)
    
    theme: {
      option: 'always-light',
      name: 'light'
    },
    

    football: {
        leagueStandings: {
            sorting: {
                listOptionActive: [ 
                    {property: 'points', direction: 'descending'} 
                ] as types.OptionSorting[],
                listOptionDeactive: [ 
                    {property: 'goals_diff', direction: 'descending'},
                    {property: 'goals_scored', direction: 'descending'},
                    {property: 'goals_against', direction: 'ascending'} 
                ] as types.OptionSorting[],
                listOptionAll: [ 
                    {property: 'points', direction: 'descending'},
                    {property: 'goals_diff', direction: 'descending'},
                    {property: 'goals_scored', direction: 'descending'},
                    {property: 'goals_against', direction: 'ascending'} 
                ] as types.OptionSorting[],
            }
        }
    },

  },
  
  showing: {

    header: false,
    footer: false,

    modal: {
        setting: false,
        myProfile: false,
        // creatingPortal: false,
        // editingPortal: false,
           
        // searching: false,
    }
  }
  
  
};



const reducerStatus = handleActions<State, any>({
  
  [actionsRoot.status.name__REPLACE]: (statePrevious, action: actionsRoot.status.type__REPLACE) => {
    
    return produce(statePrevious, stateNew => {
      if (action.payload === undefined) { 
        return;
      }
      else {
        const listKey: (string | number)[] = action.payload.listKey;
        
        try { putValueToNestedObject(stateNew, listKey, action.payload.replacement); 
          
        }
        catch {
          return;
        }
        
      }
      
    });
  }
  
}, stateInitial);

export default reducerStatus;





    /*
    portal: {
        open: '',
        editing: '',
        addingToStack: '',
        sorting: {
            property: 'hp' as 'hp' | 'dateVisited', 
            direction: {
                hp: 'ascending' as 'ascending' | 'descending', 
                dateVisited: 'ascending' as 'ascending' | 'descending', 
            }
        },
        hiding: {
            inStacks: false,
        },
    },
    */