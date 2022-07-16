import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {connect}   from 'react-redux';
import React, {useState} from 'react';
// import { sendForm } from './LoadTrackModal';
import { sendForm } from './SendForm';


export function EditPlaylistModal  (props)  {
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
        image.name && data.append("photo",  image, image.name);

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
        
        </Modal.Title> 
        </Modal.Header>
        <Modal.Body >
        <form onSubmit={PostEditPlaylist} className="authorization center align-items-center justify-content-center  d-flex" id='loadTracksForm'>
            <div className="border p-3 col-9">
                <h4 className="w-100 text-center">Edit Playlist</h4>
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
            </div>
        </form>
        </Modal.Body>
        <Modal.Footer> 
        <Button variant="outline-danger" type='submit' form='loadTracksForm' onClick={props.onHide}>Save</Button> 
        </Modal.Footer>
    </Modal>)
}


//export const CEditPlaylistModal = connect(state => ({playlist: state.promise.plstById?.payload || []}), )(EditPlaylistModal);