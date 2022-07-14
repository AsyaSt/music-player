import React, {useState, useEffect} from 'react';
import { store } from '../store/store';
import { actionPlaylistById} from '../store/promiseReducer';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {connect}   from 'react-redux';
// import {actionFullSetTrack, actionFullPlay} from '../store/playerReducer';
import {СAllTracks } from './Tracks'
import { LoadTrackModal } from './LoadTrackModal';
import { EditPlaylistModal } from './EditPlaylistModal';

export const PlaylistById = ({playlist = {}}) => {
    let id = window.location.href.split('/')[4];
    const getAnswer = async () => {
      await store.dispatch(actionPlaylistById(id));	
      
    };
    
    useEffect(() => {
      getAnswer();
    }, []);

    const [modalShow, setModalShow] = React.useState(false);
    const [modalTrackShow, setModalTrackShow] = React.useState(false);
  
  return(
    <>
    <div className='d-flex justify-content-around'>
    <div>
        <h1 >Playlist</h1>
        <div className='d-flex justify-content-center'>
            <div className='me-4'>
                <img src={playlist.photo} width ='250px' alt='...'/>
            </div>
            <div>
                <p className='h4'>Playlist name: {playlist.name}</p>
                <p>Playlist author: {playlist.user_name}</p>
                {playlist.user_id === store.getState().auth.user.id? 
                <><span onClick={() => setModalTrackShow(true)}>Edit Playlist</span>
                <EditPlaylistModal  show={modalTrackShow} playlist={playlist}
                        onHide={() => setModalTrackShow(false)}></EditPlaylistModal></> : <></>}
                <p>{playlist?.tracks?.length} треков</p> 
                <div className='d-flex'>
                {/* <div> <button type="button" className="btn btn-light me-2">Shake</button></div> */}
                {/* <div> <button type="button" className="btn btn-light">Добавить в библиотеку</button></div> */}
                </div>
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
            <СAllTracks/>
      </div>
          {/* <СNowPlayingPlayer/> */}
      </div>
      
      
      </>
  )}

  //export const СPlaylistById = connect(state => ({playlist: state.promise.plstById?.payload?.tracks || []}), )(PlaylistById);
  export const CPlaylistById = connect(state => ({playlist: state.promise.plstById?.payload || {}}), )(PlaylistById);