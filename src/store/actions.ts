import {combineReducers} from 'redux';

import * as actionsStatus from './actions/status';
import * as actionsNotification from './actions/notification';
import * as actionsAuth from './actions/auth';

const actionsRoot = {
    notification: actionsNotification,
    status: actionsStatus,
    auth: actionsAuth,
}

// redux 에서의 action 속의 type을 name 로 바꿔서 이용 (TypeScript 의 type과 구분하기 위해 )

export default reducerRoot;

export type StateRoot = ReturnType<typeof reducerRoot>; // https://velog.io/@velopert/use-typescript-and-redux-like-a-pro