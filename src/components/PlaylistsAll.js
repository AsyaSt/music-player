import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Playlist } from './Playlist';
import { store } from '../store/store';
import { actionAllPlaylists } from '../store/actions/actions_Promise';


export const PlaylistsAll = ({playlists}) => {

  useEffect(() => {
    store.dispatch(actionAllPlaylists());
  }, []);

  return (<>
    <div className='RootCategories d-flex justify-content-start flex-wrap'>
      {playlists.map((playlist, i) => <Playlist key={i} playlist={playlist}/>)}
    </div>
  </>)
}
