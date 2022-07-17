import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {connect}   from 'react-redux';
import React, {useState, useEffect} from 'react';
import { store } from '../store/store';
import { sendForm } from './SendForm';
import { actionPlaylistById} from '../store/promiseReducer';
import { actionFullSetPlaylist, actionFullSetTrack, actionFullSetTrackCount} from '../store/playerReducer';
import {Form} from "react-bootstrap";

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
            }
            , 1000);
      }  

      let TracksTableItem = ({name}) =>
      <tr>
          <td>
              <span className="text-dark">  {name}</span>
          </td>
      </tr>

  const PreViewTracks = (preTracks) => {
      if (preTracks && preTracks.length > 0)
          return (
              <div className="preview-tracks-block">
                  <table className="table table-light table-hover align-middle sticky-top bg-light">
                      <thead>
                          <tr>
                              <th>
                                  Loaded files
                              </th>
                          </tr>
                      </thead>
                  </table>
                  <table className="table table-light table-hover align-middle">
                      <tbody>
                          {Array.from(preTracks).map((preTracks, i) => <TracksTableItem name={preTracks.name} key={i}></TracksTableItem>)}
                      </tbody>
                  </table>
              </div>
          )}

return(
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
  </Modal>)
}