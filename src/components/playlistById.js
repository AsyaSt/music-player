import React, {useState, useEffect} from 'react';
import { store } from '../store/store';
import { actionPlaylistById} from '../store/promiseReducer';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'
import { actionFullSetPlaylist, actionFullSetTrack, actionFullSetTrackCount} from '../store/playerReducer';
import {connect}   from 'react-redux';
// import {actionFullSetTrack, actionFullPlay} from '../store/playerReducer';
import {СAllTracks } from './Tracks'
import { LoadTrackModal } from './LoadTrackModal';
import { EditPlaylistModal } from './EditPlaylistModal';
import { Link } from 'react-router-dom';
import { sendForm } from './LoadTrackModal';
import { history } from '../App';
import {audio}  from './Tracks'

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
    <div className='d-flex justify-content-around'>
        <div className='pt-4'>
            {/* <h1 >Playlist</h1> */}
            <div className='d-flex justify-content-center'>
                <div className='me-4'>
                    <img src={playlist.photo} width ='250px' alt='...'/>
                </div>
                <div>
                    <p className='h4'>Playlist name: {playlist.name}</p>

                    {playlist.user_id === store.getState().auth.user.id?
                    <>
                    <Button  variant="outline-danger" onClick={() => setDeletePllstModal(true)}> Delete</Button>
                    
                    <Modal
                        show={deletePllstModal} onHide={() => setDeletePllstModal(false)}
                        backdrop="static" keyboard={false} playlist={playlist}>
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

                    <p>Playlist author: {playlist.user_name}</p>

                    {playlist.user_id === store.getState().auth.user.id? 

                    <><span onClick={() => setModalTrackShow(true)}>Edit Playlist</span>
                    <EditPlaylistModal  show={modalTrackShow} playlist={playlist}
                            onHide={() => setModalTrackShow(false)}></EditPlaylistModal></> : <></>}
                    <p>{playlist?.tracks?.length} треков</p> 
                    <div className='d-flex'>
                    {/* <div> <button type="button" className="btn btn-light me-2">Shake</button></div> */}
                    <div> <button type="button" className="btn btn-light"
                    onClick={async() => {
                        store.dispatch(actionFullSetPlaylist(playlist.tracks));
                        store.dispatch(actionFullSetTrack(store.getState().player?.playlist[0]));
                        store.dispatch(actionFullSetTrackCount(0));
                        //store.dispatch(actionFullSetTrack(0));
                    }}
                    
                    >Play</button></div>
                    
                    {playlist.user_id === store.getState().auth.user.id? 
                    (<>
                        <Button variant="primary" onClick={() => setModalShow(true)}>
                            Add Tracks
                        </Button>

                        <LoadTrackModal
                            
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        /></>) : <></>}
                    
                </div>
                </div>
                {/* <div>
                {playlist.user_id === store.getState().auth.user.id ? 
                    <FontAwesomeIcon icon={faTrashCan} /> : <></>}
                </div> */}
            </div>
                <СAllTracks />
        </div>
      </div>
      
      
      </>
  )}

  
  export const CPlaylistById = connect(state => ({playlist: state.promise.plstById?.payload || {},
    tracks: state.player?.playlist?.tracks}) || [] )(PlaylistById);