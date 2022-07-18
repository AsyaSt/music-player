import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect}   from 'react-redux';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCompactDisc} from "@fortawesome/free-solid-svg-icons";
import { Playlist } from './userPlaylists';
import { store } from '../store/store';
import { actionAllPlaylists } from '../store/promiseReducer';


export const PlaylistsAll = ({playlists}) => 
{
const getAnswer =  () => {
  store.dispatch(actionAllPlaylists());
};

useEffect(() => {
  getAnswer();
}, []);

return (<>
  <div className="d-flex justify-content-between align-items-center py-3">
    <h3 className="text-uppercase"> <FontAwesomeIcon icon={faCompactDisc} className="me-2"/>Playlists</h3>
  </div>
<div className='RootCategories d-flex justify-content-start flex-wrap'>
  {playlists.map((playlist, i) => <Playlist key={i} playlist={playlist}/>)}
</div>
</>)
}


export const CAllPlaylists = connect(state => ({playlists: state.promise.allPlaylists?.payload?.playlists?.data || []}), )(PlaylistsAll);