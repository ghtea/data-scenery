import React, { useCallback, useEffect, useMemo } from "react";
import history from 'historyApp';

import { FormattedMessage, useIntl } from 'react-intl';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import {useSelector, useDispatch} from "react-redux";
import {StateRoot} from 'store/reducers';

import * as cn from 'tools/vanilla/convertName'
import * as actions  from 'store/actions';

//import Portal from './OptionSorting/Portal';

import styles from './OptionSorting.module.scss';

 
// import IconSort from 'svgs/basic/IconSort';
type PropsOptionSorting = {
    property: 'points' | 'goals_diff' | 'goals_against' | 'goals_scored'; 
    direction: 'ascending' | 'descending';
    dictEventHandler: any;
    active: boolean;

    draggableId: string,
    index: number,
}


// https://github.com/LeeHyungGeun/react-beautiful-dnd-kr

function OptionSorting({
    property, 
    direction,
    dictEventHandler,
    active,
    
    draggableId,
    index,
}: PropsOptionSorting) {
 
    const dispatch = useDispatch();
    const nodeRef = React.useRef(null);
    
     
    return (
        <Draggable
            draggableId={draggableId}
            index={index}
        >
        {(provided, snapshot) => (

        <div className={`${styles['root']} ${snapshot.isDragging && 'isDragging'}`}
            data-property={property}
            data-active={active}
            draggable={true}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={provided.draggableProps.style}
        >   "points" | "goals_diff" | "goals_against" | "goals_scored"
            <span> <FormattedMessage id={`Modal.SortingFootballLeagueStandings_LogOut_${}`} /> </span>

            <button
                type='button'
                value={property}
                onClick={dictEventHandler.onClick_ChangeDirection}
            >   {direction === 'ascending' ? '<' : '>'}
            </button> 
        </div>

        )}
        </Draggable>
    );
}

OptionSorting.defaultProps = {};

export default OptionSorting;

