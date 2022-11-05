import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './reducers/authReducer';
import { playerReducer } from './reducers/playerReducer';
import { promiseReducer } from './reducers/promiseReducer';




export const store = createStore(combineReducers({promise: promiseReducer,
    auth: authReducer, player: playerReducer}), applyMiddleware(thunk))


    