import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link} from 'react-router-dom';
import {connect}   from 'react-redux';
import { store } from '../store/store';
import { actionFullSetPlaylist, actionFullSetTrack } from '../store/playerReducer';
import { actionPlaylistById} from '../store/promiseReducer';
import image from '../images/card.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAlignCenter,
    faCompactDisc,
    faHeadphonesSimple, faPlay,
    faPlus
} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

const Playlist = ({playlist = {}}) => 
  <div className="">
      <div className="me-4 mb-4 p-4 playlist-img-box rounded-5 position-relative"
           style={{backgroundImage: `url(${playlist.photo || image})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", width:250, height:250}}
      >
          <div className="playlist-grey-box"></div>
          <Link className="d-flex border-0 link-light position-relative text-decoration-none h4 text-wrap"
                to={`/playlist/${playlist.id}`}>
              {playlist.name}
          </Link>
          <Button variant="outline-light" className='rounded-5 position-absolute playlist-play-box'  title='Play'>
              <FontAwesomeIcon className='' icon={faPlay}
                onClick={() => {
                  store.dispatch(actionPlaylistById(playlist.id));
                  setTimeout(() => {
                      if(store.getState().promise?.plstById?.payload?.tracks) {
                        let tracks = store.getState().promise?.plstById?.payload?.tracks;
                        store.dispatch(actionFullSetPlaylist(tracks));
                        store.dispatch(actionFullSetTrack(store.getState().player?.playlist[0]));
                    }
                    }
                    , 500) 
                }}
              />
          </Button>
      </div>
  </div>

// const Playlist = ({playlist: {id, user_id, name, photo, description, tracks} = {}}) =>
// <div className="col-sm-3">
//   <Link className="card" to= {`/playlist/${id}`} onClick={() => store.dispatch(actionFullSetPlaylist({id, user_id, name, photo, description, tracks}) )}>
//     <img src={photo} className="card-img-top" alt="..." height={'150px'}/>
//     <div className="card-body">
//       <h5 className="card-title"> {name}</h5>
//       {/* <p className="card-text">{description? description :  '.' }</p> */}
//       {/* <button className="btn btn-primary" >Go somewhere</button> */}
//     </div>
//   </Link>
// </div>


const PlaylistsAll = ({playlists= []}) => 
<div className='RootCategories d-flex justify-content-start flex-wrap'>
  {playlists.map((playlist, i) => <Playlist key={i} playlist={playlist}/>)}
</div>


export const CAllPlaylists = connect(state => ({playlists: state.promise.allPlaylists?.payload?.playlists?.data || []}), )(PlaylistsAll);