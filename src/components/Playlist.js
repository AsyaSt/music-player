import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link} from 'react-router-dom';
import {connect}   from 'react-redux';
import { store } from '../store/store';
import { actionFullSetPlaylist } from '../store/playerReducer';



const Playlist = ({playlist: {id, user_id, name, photo, description, tracks} = {}}) =>
<div className="col-sm-3">
  <Link className="card" to= {`/playlist/${id}`} onClick={() => store.dispatch(actionFullSetPlaylist({id, user_id, name, photo, description, tracks}) )}>
    <img src={photo} className="card-img-top" alt="..."/>
    <div className="card-body">
      <h5 className="card-title"> {name}</h5>
      {/* <p className="card-text">{description? description :  '.' }</p> */}
      {/* <button className="btn btn-primary" >Go somewhere</button> */}
    </div>
  </Link>
</div>


const PlaylistsAll = ({playlists= []}) => 
<div className='RootCategories row'>
  {playlists.map((playlist, i) => <Playlist key={i} playlist={playlist}/>)}
</div>


export const CAllPlaylists = connect(state => ({playlists: state.promise.allPlaylists?.payload?.playlists?.data || []}), )(PlaylistsAll);