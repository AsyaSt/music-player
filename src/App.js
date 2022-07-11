import './App.scss';
import React, {useState,useEffect, useMemo, useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Router, Route, Link, Redirect, Switch} from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
//import thunk from 'redux-thunk';
import {Provider, connect}   from 'react-redux';
//import {createStore, combineReducers, applyMiddleware} from 'redux';
import { store } from './store/store';
import { actionAllPlaylists } from './store/promiseReducer';
import { actionFullSetPlaylist } from './store/playerReducer';
import {CLoginForm} from './components/authorization'
import {CRegisterForm} from './components/authRegistration'
import {CreatePlaylist} from './components/createPlaylist'

import { Header } from './components/header';
import { UserPage, UsersPlaylistsAll } from './components/userPage';
import {PlaylistById}  from './components/playlistById';



let history = createHistory()

store.subscribe(() => console.log(store.getState()));
store.dispatch(actionAllPlaylists());



const Playlist = ({playlist: {id, user_id, name, photo, description} = {}}) =>
  <div className="col-sm-3">
    <Link className="card" to= {`/playlist/${id}`} onClick={() => store.dispatch(actionFullSetPlaylist({id, user_id, name, photo, description}) )}>
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
const CPlaylistById = connect(state => ({playlist: state.promise.plstById?.payload || {}}), )(PlaylistById);
//const СUserPlaylists = connect(state => ({playlists: state.promise.usersPlaylists?.payload?.playlists?.data || []}), )(UsersPlaylistsAll);
                                              

const Aside = ({children}) => 
  <div>
    <Header/>
    <СAllPlaylists/>
  </div>




const Main = ({children}) =>
  <main className='bg-dark text-white'>
  <Router history = {createHistory()}>
      <Content>
        <Switch>
          {store.getState().auth?.token && <Redirect from='/login' to={'/user'} exact />} 
          {store.getState().auth?.token && <Redirect from='/register' to={'/user'} exact />} 
          {!store.getState().auth?.token && <Redirect from='/user' to={'/login'} exact />}
          <Route path={'/login'} component={CLoginForm} />
          <Route path={'/register'} component={CRegisterForm}/>

          <Route path={'/allplaylists'} component={Aside}/>
          <Route path={'/playlist'} component={CPlaylistById} />
          <Route path={'/create'} component={CreatePlaylist} />
          <Route path={'/user'} component={UserPage} />
          {/* <Route path={'/'} component={Header} /> */}
        </Switch>
        
        {/* {children} */}
      </Content>
    </Router>
  </main>

const Content = ({children}) => 
  <section className='Content'>
    {children}
  </section>

function App() {
  return (
    <Router history={history}>
    <Provider store ={store}>
      {/* <Header/> */}
      <Main/>
    </Provider>
    </Router>
  );
}


const Footer = ({children}) => 
  <footer>
    {/* <Logo/> */}
    {children}
  </footer>

export default App;
