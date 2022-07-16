import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {connect}   from 'react-redux';
import React, {useState, useEffect} from 'react';
import { store } from '../store/store';
import { sendForm } from './SendForm';
import { actionPlaylistById} from '../store/promiseReducer';
import { actionFullSetPlaylist, actionFullSetTrack, actionFullSetTrackCount} from '../store/playerReducer';


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
      }  

return(
<Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
     <Modal.Header closeButton> 
      <Modal.Title id="contained-modal-title-vcenter">
      Add Tracks
      </Modal.Title> 
    </Modal.Header>
    <Modal.Body >
    <form onSubmit={PostLoadTracks} className="authorization center align-items-center justify-content-center  d-flex" id='loadTracksForm'>
        <div className="mb-3">
            <label className="form-label">Add your tracks</label>
            
            <input className="form-control"  accept=".mp3" type="file" id="formFileMultiple" multiple onChange={(e) => setTrack(e.target.files)}/>
        </div>
    </form>
    </Modal.Body>
    <Modal.Footer> 
      <Button variant="outline-danger" type='submit' form='loadTracksForm' onClick={() => {
      props.onHide();
      setTimeout(() => {
        store.dispatch(actionPlaylistById(props.id));
        setTimeout(() => store.dispatch(actionFullSetPlaylist(store.getState().promise.plstById?.payload?.tracks)), 1000);
        }
        , 1000);
      }
      }>Save</Button> 
     </Modal.Footer>
  </Modal>)
}