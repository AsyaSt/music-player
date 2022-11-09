import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react';
import { store } from '../store/store';
import { sendForm } from '../utils/SendForm';
import {Form} from "react-bootstrap";
import { RunToast } from './Toast';
import { actionPlaylistById } from '../store/actions/actions_Promise';
import { actionFullSetPlaylist } from '../store/actions/actions_Player';
import { PreViewTracks } from '../utils/previewTracks';

export function LoadTrackModal  (props)  {
    const [tracks, setTrack] = useState(null);

    const PostLoadTracks = async(event)  =>{
        event.preventDefault();
        const data = new FormData();
    
        data.append("id", store.getState().promise.plstById.payload.id);
        let i = 0;
        for (let track of tracks) {
            data.append(`tracks[${i++}]`, track);
        }
        sendForm('playlists/load-tracks', data);
        props.onHide();
        setTimeout(() => {
            store.dispatch(actionPlaylistById(props.id));
            setTimeout(() => store.dispatch(actionFullSetPlaylist(store.getState().promise.plstById?.payload?.tracks)), 1000);
        } , 1000);
            
        RunToast('bg-success','Success', 'Tracks loaded')
      }  

    return (
        <Modal
            {...props}
            size=""
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton> 
                <Modal.Title id="contained-modal-title-vcenter">
                    Load tracks
                </Modal.Title> 
            </Modal.Header>
            <Modal.Body >
                <Form onSubmit={PostLoadTracks} className="authorization" id='loadTracksForm'>
                    <Form.Group className="mb-3">
                        <Form.Label>Select your tracks</Form.Label>
                        <Form.Control type="file" required  accept=".mp3" id="formFileMultiple" multiple onChange={(e) => {
                            setTrack(e.target.files);
                        }} />
                    </Form.Group>
                </Form>
                {PreViewTracks(tracks)}
            </Modal.Body>
            <Modal.Footer> 
                <Button variant="outline-success" type='submit' form='loadTracksForm'>Save</Button>
            </Modal.Footer>
        </Modal>
    )
}