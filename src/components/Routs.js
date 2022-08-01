import {Router, Route, Redirect, Switch} from 'react-router-dom';
import { history } from '../App';
import {LoginForm} from '../pages/loginPage';
import {CRegisterForm} from '../pages/registrationPage';
import { store } from '../store/store';
import { ToastNotify } from './Toast';
import { CUserPage } from '../pages/userPage';
import {CPlaylistById}  from './playlistById';
import {СNowPlayingPlayer} from './playing'
import { CEditProfile } from './EditProfile';
import { Header } from './header';
import { CArtistPage } from '../pages/artistPage';
import { CAlbumPage } from '../pages/albumPage';
import { CSearchPage } from '../pages/searchPage';
import { AllPlaylistsPage } from '../pages/allPlaylistsPage';

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
          {!auth && <Redirect from='/playlist' to={'/login'} />}
          {!auth && <Redirect from='/artists' to={'/login'} />}
          {!auth && <Redirect from='/albums' to={'/login'}/>}
          {!auth && <Redirect from='/search' to={'/login'} />}
          <Route path={'/login'} component={LoginForm} />
          <Route path={'/register'} component={CRegisterForm}/>
          <Route path={'/editprofile'} component={CEditProfile}/>
          <Route path={'/allplaylists'} component={AllPlaylistsPage}/>
          <Route path={'/playlist'} component={CPlaylistById} />
          <Route path={'/user'} component={CUserPage} />
          <Route path={'/artists'} component={CArtistPage} />
          <Route path={'/albums'} component={CAlbumPage} />
          <Route path={'/search'} component={CSearchPage} />
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
      <ToastNotify/>
      <div className={store.getState().auth?.token ? 'col-7 pe-3' : 'col-12 pe-3'}>
        {children}
      </div>

      {store.getState().auth?.token && <СNowPlayingPlayer className='col-5'/>}
    </section>
  </>