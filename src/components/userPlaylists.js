import React from 'react';
import {Link} from 'react-router-dom';
import { actionPlaylistById} from '../store/promiseReducer';
import { actionFullSetPlaylist, actionFullSetTrack} from '../store/playerReducer';
import { store } from '../store/store';
import image from '../images/card.jpg';
import {CreatePlaylist} from './createPlaylist';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeadphonesSimple, faPlay, faPlus, faLock,} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";



export const Playlist = ({playlist}) => 
  <div className="">
      <div className="me-4 mb-4 p-4 playlist-img-box rounded-5 position-relative"
           style={{backgroundImage: `url(${playlist.photo || image})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", width:250, height:250}}
      >
          <div className="playlist-grey-box"></div>
          <Link className="d-flex justify-content-between flex-wrap border-0 link-light position-relative text-decoration-none h4 text-wrap"
                to={`/playlist/${playlist.id}`} onClick={() => {
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
  
  export const UsersPlaylistsAll = ({playlists}) => {
    const [modalShow, setModalShow] = React.useState(false);
    return (
  <> 
      <div className="d-flex justify-content-between align-items-center py-3">
          <h3 className="text-uppercase"> <FontAwesomeIcon icon={faHeadphonesSimple} className="me-2"/>My playlists</h3>
          <Button  variant="outline-success" title='Create playlist' onClick={() => setModalShow(true)}>
              <FontAwesomeIcon icon={faPlus} />
          </Button>
          <CreatePlaylist
              show={modalShow}
              onHide={() => setModalShow(false)}
          />
      </div>
    <div className='RootCategories d-flex justify-content-start flex-wrap'>
      {playlists.map((playlist, i) => <Playlist key={i} playlist={playlist}/>)}
    </div> 
  </>)
  }

