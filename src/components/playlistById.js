import React, {useState, useEffect} from 'react';
import { store } from '../store/store';
import { actionPlaylistById} from '../store/promiseReducer';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash,
    faPen,
    faUserAstronaut,
    faCompactDisc,
    faPlus,
    faAlignCenter,
    faPlay, faHeart} from '@fortawesome/free-solid-svg-icons'
import { actionFullSetPlaylist, actionFullSetTrack, actionAddPlaylistToQueue} from '../store/playerReducer';
import {connect}   from 'react-redux';
import {СAllTracks } from './Tracks'
import { LoadTrackModal } from './LoadTrackModal';
import { EditPlaylistModal } from './EditPlaylistModal';
import { Link } from 'react-router-dom';
import { sendForm } from './SendForm';
import { history } from '../App';
import {ButtonGroup, Dropdown} from "react-bootstrap";


let listToPlay;
export const PlaylistById = ({playlist = {}, tracks={}}) => {
    
    let id = window.location.href.split('/')[4];
    
    const getAnswer = async () => {
      listToPlay = await store.dispatch(actionPlaylistById(id));
      return listToPlay;
    };

    useEffect(() => {
  
      getAnswer();
    }, []);

    const [modalShow, setModalShow] = React.useState(false);
    const [deletePllstModal, setDeletePllstModal] = useState(false);
    const [modalTrackShow, setModalTrackShow] = React.useState(false);
  
  return(
    <>
    <div className='d-flex justify-content-around w-100'>
        <div className='w-100 pt-4'>
            <div className='d-flex mb-3 w-100'>
                <div className='me-4 playlist-img-box rounded-5' 
                    style={{backgroundImage: `url(${playlist.photo})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}>
                </div>
                <div className='w-100'>
                    <div className="d-flex flex-column justify-content-between h-100">
                        <div className="w-100 row">
                            <div className='d-flex justify-content-between align-items-center w-100'>
                                <p className='h4 m-0'>{playlist.name}</p>
                                {playlist.user_id === store.getState().auth.user.id?
                                    <>
                                    <div className="d-flex row g-2">
                                        <div className="col">
                                            <Button  variant="outline-success" title='Add tracks' onClick={() => setModalShow(true)}>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </Button>
                                            <LoadTrackModal id={id} show={modalShow} onHide={() => setModalShow(false)} />
                                        </div>
                                        <div className="col">
                                            <Button  variant="outline-secondary" title='Edit playlist' onClick={() => setModalTrackShow(true)}>
                                                <FontAwesomeIcon icon={faPen} />
                                            </Button>
                                            <EditPlaylistModal  tracks={tracks}  show={modalTrackShow} playlist={playlist}
                                                                onHide={() => setModalTrackShow(false)}></EditPlaylistModal>
                                        </div>
                                        <div className="col">
                                            <Button  variant="outline-danger" title='Delete playlist' onClick={() => setDeletePllstModal(true)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                        </div>
                                    </div>

                                    <Modal
                                        show={deletePllstModal} onHide={() => setDeletePllstModal(false)}
                                         keyboard={false} playlist={playlist}>
                                        <Modal.Header closeButton>
                                            <Modal.Title className='w-100 text-center'>Delete Playlist?</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className='text-center'>
                                            Are you really want to delete playlist  <span className='text-danger'><i>"{playlist.name}"</i></span>?
                                        </Modal.Body>
                                        <Modal.Footer className='d-flex justify-content-center'>
                                            <Button className='mx-2' variant="secondary" onClick={() => setDeletePllstModal(false)}>
                                                Close
                                            </Button>
                                            <Button className='mx-2' variant="danger" onClick={async() => {
                                                await sendForm(`playlists/${playlist.id}/delete`);
                                                setDeletePllstModal(false)
                                                history.push('/user')}}>Delete</Button>
                                        </Modal.Footer>
                                    </Modal>
                                </>: <></>
                                }
                            </div>

                            <Link className="link-secondary mb-2" title='Author' to='#'><FontAwesomeIcon className='me-2' icon={faUserAstronaut} />  {playlist.user_name}</Link>
                            <p className='text-white-50 mb-2'><FontAwesomeIcon className='me-2' icon={faCompactDisc} /> {playlist?.tracks?.length} Tracks</p>
                            <p className='text-white-50 mb-2'><FontAwesomeIcon className='me-2' icon={faAlignCenter} /> {playlist.description}</p>
                        </div>

                    
                        <div className="w-100">
                            <div className='d-flex'>
                                <div className='row g-2'>
                                    <div className="col">
                                        <Dropdown
                                                  as={ButtonGroup}
                                                  align={"end"}>
                                            <Button className='d-flex align-items-center' variant="outline-light" title='Play' onClick={async() => {
                                                store.dispatch(actionFullSetPlaylist(playlist.tracks));
                                                store.dispatch(actionFullSetTrack(store.getState().player?.playlist[0]));
                                            }}>
                                                <FontAwesomeIcon className='me-2' icon={faPlay}/>
                                                Play
                                            </Button>

                                            <Dropdown.Toggle split variant="outline-light" id="dropdown-split-basic"/>

                                            <Dropdown.Menu variant="dark">
                                                <Dropdown.Item onClick={() => {
                                                    store.dispatch(actionAddPlaylistToQueue(playlist.tracks))
                                                }}>Add to Queue</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="col">
                                        <button type="button" className="btn btn-outline-danger">
                                            <FontAwesomeIcon icon={faHeart}/> 
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            <СAllTracks />
        </div>
    </div>
      
    </>
  )}

  
//   export const CPlaylistById = connect(state => ({playlist: state.promise.plstById?.payload || {},
//     tracks: state.player?.playlist?.tracks}) || [] )(PlaylistById);

export const CPlaylistById = connect(state => ({playlist: state.promise.plstById?.payload || {},
    tracks: state.promise.plstById?.payload?.tracks}) || [] )(PlaylistById);

    