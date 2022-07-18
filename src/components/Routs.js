import {Router, Route, Redirect, Switch} from 'react-router-dom';
import { history } from '../App';
import {LoginForm} from './authorization';
import {CRegisterForm} from './authRegistration';
import { store } from '../store/store';
import { Aside } from '../App';
import { CUserPage } from '../pages/userPage';
// import { UserPage} from './userPage';
import {CPlaylistById}  from './playlistById';
import {СNowPlayingPlayer} from './playing'
import { CEditProfile } from './EditProfile';
import { Header } from './header';
import { CArtistPage } from '../pages/artistPage';
import { CAlbumPage } from '../pages/albumPage';

export const Main = ({auth}) =>

  <main className='bg-dark text-white main' >
  <Router history = {history}>
      <Content className=''>
      <div>
        <Switch>
          {auth && <Redirect from='/login' to={'/user'} exact />} 
          {auth && <Redirect from='/register' to={'/user'} exact />}
          {!auth && <Redirect from='/user' to={'/login'} exact />} 
          {!auth && <Redirect from='/editprofile' to={'/login'} exact />}
          {!auth && <Redirect from='/allplaylists' to={'/login'} exact />}
          {!auth && <Redirect from='/playlist' to={'/login'} exact />}
          {!auth && <Redirect from='/artists' to={'/login'} exact />}
          {!auth && <Redirect from='/albums' to={'/login'} exact />}
          <Route path={'/login'} component={LoginForm} />
          <Route path={'/register'} component={CRegisterForm}/>
          <Route path={'/editprofile'} component={CEditProfile}/>
          <Route path={'/allplaylists'} component={Aside}/>
          <Route path={'/playlist'} component={CPlaylistById} />
          <Route path={'/user'} component={CUserPage} />
          <Route path={'/artists'} component={CArtistPage} />
          <Route path={'/albums'} component={CAlbumPage} />
          <Route exact path="/">{auth ? <Redirect to="/user"/> : <Redirect to="/login" /> }</Route>
        </Switch>
      </div>
      </Content>
    </Router>
  </main>

const Content = ({children}) => 
  <>
  {store.getState().auth?.token && <Header/>}
    <section className='d-flex justify-content-center container-fluid pt-3'>
      <div className={store.getState().auth?.token ? 'col-7 pe-3' : 'col-12 pe-3'}>
        {children}
      </div>
      {/* <div className='col-5'> */}
        {store.getState().auth?.token && <СNowPlayingPlayer className='col-5'/>}
      {/* </div> */}
    </section>
  </>