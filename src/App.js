import './App.scss';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Router, Link} from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
//import thunk from 'redux-thunk';
import {Provider, connect}   from 'react-redux';
//import {createStore, combineReducers, applyMiddleware} from 'redux';
import { store } from './store/store';
import { actionAllPlaylists } from './store/promiseReducer';
import { Header } from './components/header';
import { Main } from './components/Routs';
import {CAllPlaylists} from './components/Playlist';
import {СNowPlayingPlayer} from './components/playing';



export let history = createHistory();

store.subscribe(() => console.log(store.getState()));
store.dispatch(actionAllPlaylists());


// export const CPlaylistById = connect(state => ({playlist: state.promise.plstById?.payload || {}}), )(PlaylistById);

                                              

export const Aside = ({children}) => 
  <div>
    
    <CAllPlaylists/>
  </div>


const CRoutes = connect(state => ({auth : state.auth?.token}))(Main)


function App() {
  return (
    <div className='d-flex text-white'>
    <Router history={history}>
    <Provider store ={store}>
    
      <CRoutes/>
      {/* {store.auth?.token && <СNowPlayingPlayer/>} */}
    </Provider>
    </Router>
    
    </div>
  );
}

export default App;
