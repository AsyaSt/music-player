import {Router, Route, Link, Redirect, Switch} from 'react-router-dom';
import { history } from '../App';
import {LoginForm} from './authorization';
import {CRegisterForm} from './authRegistration';
import {CreatePlaylist} from './createPlaylist';
import { Aside } from '../App';
import { UserPage} from './userPage';
import {CPlaylistById}  from '../App';

export const Main = ({auth}) =>
  <main className='bg-dark text-white'>
  <Router history = {history}>
      <Content>
        <Switch>
          {auth && <Redirect from='/login' to={'/user'} exact />} 
          {auth && <Redirect from='/register' to={'/user'} exact />}
          {!auth && <Redirect from='/user' to={'/login'} exact />} 
          <Route path={'/login'} component={LoginForm} />
          <Route path={'/register'} component={CRegisterForm}/>

          <Route path={'/allplaylists'} component={Aside}/>
          <Route path={'/playlist'} component={CPlaylistById} />
          <Route path={'/create'} component={CreatePlaylist} />
          <Route path={'/user'} component={UserPage} />
          <Route exact path="/">{auth ? <Redirect to="/user"/> : <Redirect to="/login" /> }</Route>
        </Switch>
      </Content>
    </Router>
  </main>

const Content = ({children}) => 
<section className='Content'>
  {children}
</section>