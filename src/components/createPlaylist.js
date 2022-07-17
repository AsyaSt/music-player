import React, {useState} from 'react';
import { sendForm } from './SendForm';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { actionUsersPlaylists } from '../store/promiseReducer';
import { store } from '../store/store';
import { history } from '../App';


export const CreatePlaylist = (props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [privat, setPrivat] = useState(0);
  const [image, setImage] = useState(null);

  const PostCreatePlaylist = async(event)  =>{
    event.preventDefault();
    const data = new FormData();

    data.append("name", name);
    description && data.append("description", description);
    data.append("private", privat);
    image && data.append("photo",  image, image.name);
    let result = await sendForm('playlists/create', data);
    console.log(result);
    store.dispatch(actionUsersPlaylists(store.getState().auth?.user?.id));
    //history.push(`/playlist/${result.playlist.id}`)
  }

  return <>
  <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
  <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">Create new Playlist</Modal.Title>
  </Modal.Header>
  <Modal.Body >
    <form onSubmit={PostCreatePlaylist} className="authorization center align-items-center justify-content-center  d-flex" id='CreatePlaylistForm'>
      <div className="border p-3 col-9">
      {/* <hr/> */}
        <div className="d-flex justify-content-between">
          <div className="w-auto">
              <label  className="form-label">Image</label>
              <input type="file" name="picture" accept="image/*" id="file" className='form-control mb-3' onChange={(e) => setImage(e.target.files[0])} multiple={false}/>
              <input className="form-check-input me-3" type="checkbox" id="flexCheckIndeterminate" checked={privat} onChange={e => setPrivat(e.target.checked? 1 : 0)}/>
              <label className="form-check-label" >Private?</label>    
          </div>
          <div className="w-50">
              <label  className="form-label">Name</label><br/>
              <input type="text" id="username" className='input form-control mb-3' value={name} onChange={e => setName(e.target.value)}/>
              <label  className="form-label">Description</label>
              <textarea type="password" id="password" className='form-control mb-3' value={description} onChange={e => setDescription(e.target.value)}/>
          </div>
        </div>
            {/* <button type='submit' className="btn btn-outline-danger" onClick={props.onHide} >Create</button> */}
        </div>
    </form>
    </Modal.Body>
    <Modal.Footer> 
      <Button variant="outline-danger" type='submit' form='CreatePlaylistForm' className="btn btn-outline-danger" onClick={props.onHide}>Create</Button> 
    </Modal.Footer> 
    </Modal>
  </>
}