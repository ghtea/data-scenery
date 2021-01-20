import produce from 'immer';
import {handleActions} from 'redux-actions';
import * as actions from "store/actions";

import putValueToNestedObject from 'tools/vanilla/putValueToNestedObject';
//import defaultUsingColorAssignment from '../../styles/defaultUsingColorAssignment'


// https://react-etc.vlpt.us/07.typescript-redux.html

export type State = typeof stateInitial;   // 아직 불확실


const stateInitial = {
    
    football: {
        leagueStandings: null as any,
        listTeam: [] as actions.data.football.Team[]
    },

};

 
 
const reducerData = handleActions<State, any>({
  
  [actions.data.name__REPLACE]: (statePrevious, action: actions.data.type__REPLACE) => {

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




export default reducerData;
