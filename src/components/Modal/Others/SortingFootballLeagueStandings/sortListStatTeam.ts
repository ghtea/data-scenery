
import * as actions  from 'store/actions';
import * as types from "store/reducers/status/types";

const sortListStatTeam = (listStatTeam: actions.data.football.StatTeam[], listOptionSortingActive:types.OptionSorting[]) => {

    // console.log(listOptionSortingActive);
    let listStatTeamSorted = [...listStatTeam];

    for (let i = listOptionSortingActive.length-1; i >= 0; i--){
        
        const {property, direction} = listOptionSortingActive[i];

        let numberIsAscending = direction === 'ascending' ? 1 : -1;
        console.log(numberIsAscending)
        if (property === 'points'){
            listStatTeamSorted.sort((a, b)=> numberIsAscending * (a.points - b.points));
        }
        else {
            listStatTeamSorted.sort((a, b)=> numberIsAscending * (a['overall'][property] - b['overall'][property] ));
        }
        
    }
    return listStatTeamSorted
}


export default sortListStatTeam;