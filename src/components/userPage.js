import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect}   from 'react-redux';
import { actionUsersPlaylists } from '../store/promiseReducer';
import { actionPlaylistById} from '../store/promiseReducer';
import { actionFullSetPlaylist, actionFullSetTrack} from '../store/playerReducer';
import { store } from '../store/store';
import image from '../images/card.png';
import {CreatePlaylist} from './createPlaylist';
import { history } from '../App';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAlignCenter,
    faCompactDisc,
    faHeadphonesSimple, faPlay,
    faPlus,
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
  
  export const UsersPlaylistsAll = ({playlists= []}) => {
    const [modalShow, setModalShow] = React.useState(false);
    return (
  <> 
      <div className="d-flex justify-content-between align-items-center py-3">
          <h3 className="text-uppercase"> <FontAwesomeIcon icon={faHeadphonesSimple} className="me-2"/>My playlists</h3>
          <Button  variant="outline-success" title='Delete playlist' onClick={() => setModalShow(true)}>
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

const СUsersPlaylists = connect(state => ({playlists: state.promise.usersPlaylists?.payload?.playlists|| []}))(UsersPlaylistsAll);
                                              

export const UserPage = () => {
let id = store.getState().auth?.user?.id;
  const getAnswer = async () => {
    await store.dispatch(actionUsersPlaylists(id));	
  };

  useEffect(() => {
    getAnswer();
  }, []);

    return(<>
    
    <div className='d-flex  w-100'>
            <div className='me-4 playlist-img-box rounded-5' style={{backgroundImage: `url(${store.getState().auth?.user?.avatar || image})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}>
            </div>
            <div className='w-100'>
                <div className="d-flex flex-column justify-content-between h-100">
                    <div className="w-100 row">
                            <p className='h4 m-0'>{store.getState().auth?.user?.name}</p>

                            <Link to={'/editprofile'} className="mb-3" >Edit Profile</Link>

                            <p className='text-white-50 mb-2'><FontAwesomeIcon className='me-2' icon={faHeadphonesSimple} /> 100 Tracks</p>
                            <p className='text-white-50 mb-2'><FontAwesomeIcon className='me-2' icon={faCompactDisc} /> 8 PLaylists</p>
                            <p className='text-white-50 mb-2'><FontAwesomeIcon className='me-2' icon={faAlignCenter} />
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquid amet animi aspernatur facere iste nisi omnis optio, vel vitae? Accusantium assumenda autem cumque ducimus eum ipsa, maiores pariatur repudiandae?
                            </p>
                    </div>
                </div>
            </div>
        </div>
    <СUsersPlaylists/>

    </>)
}
