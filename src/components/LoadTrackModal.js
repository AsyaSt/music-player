import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {connect}   from 'react-redux';
import React, {useState, useEffect} from 'react';
import { store } from '../store/store';


export function sendForm (url, data) {
    fetch(`http://player-api/api/${url}`, {
        method: 'POST',
        body: data,
        headers: {
          
          ...(localStorage.authToken ? {"Authorization": "Bearer " + localStorage.authToken} : {})
          
          },
      }).then(res => res.json())
      .then(data => {
          if(data.token) {
            console.log(data)
            return data
          } else {
            //console.log(data.login[0]); 
          }
      })
} 

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
      <Button variant="outline-danger" type='submit' form='loadTracksForm' onClick={props.onHide}>Save</Button> 
     </Modal.Footer>
  </Modal>)
}