import {Router, Route, Redirect, Switch} from 'react-router-dom';
import { history } from '../App';
import {LoginForm} from './authorization';
import {CRegisterForm} from './authRegistration';
import { store } from '../store/store';
import { Aside } from '../App';
import { UserPage} from './userPage';
import {CPlaylistById}  from './playlistById';
import {СNowPlayingPlayer} from './playing'
import { CEditProfile } from './EditProfile';
import { Header } from './header';
import { ArtistPage } from '../pages/artistPage';
import { AlbumPage } from '../pages/albumPage';

export const Main = ({auth}) =>

  <main className='bg-dark text-white main' >
  <Router history = {history}>
      <Content className=''>
      <div>
        <Switch>
          {auth && <Redirect from='/login' to={'/user'} exact />} 
          {auth && <Redirect from='/register' to={'/user'} exact />}
          {!auth && <Redirect from='/user' to={'/login'} exact />} 
          <Route path={'/login'} component={LoginForm} />
          <Route path={'/register'} component={CRegisterForm}/>
          <Route path={'/editprofile'} component={CEditProfile}/>
          <Route path={'/allplaylists'} component={Aside}/>
          <Route path={'/playlist'} component={CPlaylistById} />
          <Route path={'/user'} component={UserPage} />
          <Route path={'/artist'} component={ArtistPage} />
          <Route path={'/album'} component={AlbumPage} />
          <Route exact path="/">{auth ? <Redirect to="/user"/> : <Redirect to="/login" /> }</Route>
        </Switch>
      </div>
      </Content>
    </Router>
  </main>

const Content = ({children}) => 
  <>
  {store.getState().auth?.token && <Header/>}
    <section className='d-flex justify-content-around py-4'>
      <div className={store.getState().auth?.token ? 'col-7' : 'col-12'}>
        {children}
      </div>
      {/* <div className='col-5'> */}
        {store.getState().auth?.token && <СNowPlayingPlayer className='col-5'/>}
      {/* </div> */}
    </section>
  </>