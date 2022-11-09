import './App.scss';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Router} from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
import {Provider, connect}   from 'react-redux';
import { store } from './store/store';
import { actionAllPlaylists, actionUsersPlaylists } from './store/actions/actions_Promise';
import { Main } from './components/Routing/Routs';



export let history = createHistory();

store.subscribe(() => console.log(store.getState()));
store.getState().auth.token && store.dispatch(actionAllPlaylists());
store.getState().auth.token && store.dispatch(actionUsersPlaylists(store.getState().auth?.user?.id));


const CRoutes = connect(state => ({auth : state.auth?.token}))(Main)


function App() {
  return (
    <div className='d-flex text-white'>
      <Router history={history}>
        <Provider store ={store}>
          <CRoutes/>
        </Provider>
      </Router>
    </div>
  );
}

export default App;
