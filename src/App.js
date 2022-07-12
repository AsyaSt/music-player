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
import { actionFullSetPlaylist } from './store/playerReducer';
import { Header } from './components/header';
import {PlaylistById}  from './components/playlistById';
import { Main } from './components/Routs';



export let history = createHistory();

store.subscribe(() => console.log(store.getState()));
store.dispatch(actionAllPlaylists());



const Playlist = ({playlist: {id, user_id, name, photo, description, tracks} = {}}) =>
  <div className="col-sm-3">
    <Link className="card" to= {`/playlist/${id}`} onClick={() => store.dispatch(actionFullSetPlaylist({id, user_id, name, photo, description, tracks}) )}>
      <img src={photo} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title"> {name}</h5>
        <p className="card-text">{description? description :  '.' }</p>
        <button className="btn btn-primary" >Go somewhere</button>
      </div>
    </Link>
  </div>


const PlaylistsAll = ({playlists= []}) => 
  <div className='RootCategories row'>
    {playlists.map((playlist, i) => <Playlist key={i} playlist={playlist}/>)}
  </div>


const СAllPlaylists = connect(state => ({playlists: state.promise.allPlaylists?.payload?.playlists?.data || []}), )(PlaylistsAll);
export const CPlaylistById = connect(state => ({playlist: state.promise.plstById?.payload || {}}), )(PlaylistById);
//const СUserPlaylists = connect(state => ({playlists: state.promise.usersPlaylists?.payload?.playlists?.data || []}), )(UsersPlaylistsAll);
                                              

export const Aside = ({children}) => 
  <div>
    <Header/>
    <СAllPlaylists/>
  </div>


const CRoutes = connect(state => ({auth : state.auth?.token}))(Main)


function App() {
  return (
    <Router history={history}>
    <Provider store ={store}>
      {/* <Header/> */}
      <CRoutes/>
    </Provider>
    </Router>
  );
}

export default App;
