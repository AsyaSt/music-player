import React from 'react';
import {Link} from 'react-router-dom';
import { actionPlaylistById} from '../store/actions/actions_Promise';
import { actionFullSetPlaylist, actionFullSetTrack} from '../store/actions/actions_Player';
import { store } from '../store/store';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faLock} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";



export const Playlist = ({playlist}) => {
  let link = (((window.location.href.split('/')[3]) === 'artists' || (window.location.href.split('/')[3]) === 'search') ? 'albums' : 'playlist');
  
  return (
    <div className="">
      <div className="me-4 mb-4 p-4 playlist-img-box rounded-5 position-relative"
           style={{backgroundImage: `url(${playlist.photo})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", width:250, height:250}}
      >
        <div className="playlist-grey-box"></div>
        <Link className="d-flex justify-content-between flex-wrap border-0 link-light position-relative text-decoration-none h6 text-wrap"
              to={`/${link}/${playlist.id}`} 
              onClick={() => {
                store.dispatch(actionPlaylistById(playlist.id));
              }}>
            <span className="playlist-title w-75">{playlist.name}</span>
            {store.getState().auth?.user?.id === playlist.user_id && playlist.private === 1 ?
                <span>
                  <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                </span> : null
            }
        </Link>
        <Button variant="outline-light" className='rounded-5 position-absolute playlist-play-box'  title='Play'>
            <FontAwesomeIcon className='' icon={faPlay}
              onClick= { () => {
                store.dispatch(actionPlaylistById(playlist.id));
                setTimeout( () => {
                    if(store.getState().promise?.plstById?.payload?.tracks) {
                      let tracks = store.getState().promise?.plstById?.payload?.tracks;
                      store.dispatch(actionFullSetPlaylist(tracks));
                      store.dispatch(actionFullSetTrack(store.getState().player?.playlist[0]));
                  }
                  } , 500) 
              }}
            />
        </Button>
      </div>
  </div>)
}
