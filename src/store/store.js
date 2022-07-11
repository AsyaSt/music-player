import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './authReducer';
import { promiseReducer } from './promiseReducer';
import { playerReducer } from './playerReducer';




export const store = createStore(combineReducers({promise: promiseReducer,
    auth: authReducer, player: playerReducer}), applyMiddleware(thunk))


    