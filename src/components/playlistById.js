import React, {useState, useEffect} from 'react';
import { store } from '../store/store';
import { actionPlaylistById} from '../store/promiseReducer';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import {connect}   from 'react-redux';
// import {actionFullSetTrack, actionFullPlay} from '../store/playerReducer';
import { Header } from './header';
import { СNowPlayingPlayer } from './playing';
import {СAllTracks } from './Tracks'



function sendForm (url, data) {
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



function LoadTrackModal  (props)  {
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
            <label className="form-label">Multiple files input example</label>
            
            <input className="form-control"  accept=".mp3" type="file" id="formFileMultiple" multiple onChange={(e) => setTrack(e.target.files)}/>
        </div>
    </form>
    </Modal.Body>
    <Modal.Footer> 
      <Button variant="outline-danger" type='submit' form='loadTracksForm' onClick={props.onHide}>Save</Button> 
     </Modal.Footer>
  </Modal>)
}

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
    <Header/>
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
                <span onClick={() => setModalTrackShow(true)}>Edit Playlist</span>
                <EditPlaylistModal  show={modalTrackShow} playlist={playlist}
                        onHide={() => setModalTrackShow(false)}></EditPlaylistModal>
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
          <СNowPlayingPlayer/>
      </div>
      
      
      </>
  )}


  function EditPlaylistModal  (props)  {
    const [name, setName] = useState(props.playlist?.name);
    const [description, setDescription] = useState(props.playlist?.description);
    //const [privat, setPrivat] = useState(0);
    const [image, setImage] = useState(props.playlist?.photo);

    const PostEditPlaylist = async(event)  =>{
        event.preventDefault();
        const data = new FormData();

        data.append("name", name || props.playlist?.name);
        data.append("description", description || props.playlist?.description);
        data.append("private", props.playlist?.private);
        data.append("photo",  image, (image.name?  image.name : props.playlist?.photo));

        sendForm('playlists/' + props.playlist?.id + '/edit', data);  
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
        <form onSubmit={PostEditPlaylist} className="authorization center align-items-center justify-content-center  d-flex" id='loadTracksForm'>
        <div className="border p-3 col-9">
        <h4 className="w-100 text-center">Create Playlist</h4>
            <hr/>
            <div className="d-flex justify-content-between">
              <div className="w-auto">
                  <label  className="form-label">Image</label>
                  <input type="file" name="picture" accept="image/*" id="file" className='form-control mb-3' onChange={(e) => setImage(e.target.files[0])} multiple={false}/>
                  {/* <input className="form-check-input me-3" type="checkbox" id="flexCheckIndeterminate" checked={privat} onChange={e => setPrivat(e.target.checked? 1 : 0)}/>
                  <label className="form-check-label" >Private?</label>     */}
              </div>
              <div className="w-50">
                  <label  className="form-label">Name</label><br/>
                  <input type="text" id="username" className='input form-control mb-3' value={name} onChange={e => setName(e.target.value)}/>
                  <label  className="form-label">Description</label>
                  <textarea type="password" id="password" className='form-control mb-3' value={description} onChange={e => setDescription(e.target.value)}/>
              </div>
            </div>
            <button type='submit' className="btn btn-outline-danger" onClick={props.onHide} >Create</button>
        </div>
        </form>
        </Modal.Body>
        <Modal.Footer> 
        <Button variant="outline-danger" type='submit' form='loadTracksForm' onClick={props.onHide}>Save</Button> 
        </Modal.Footer>
    </Modal>)
}
