import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react';
import { actionPlaylistById } from '../store/actions/actions_Promise';
import { store } from '../store/store';
import { sendForm } from '../utils/SendForm';
import {Form} from "react-bootstrap";
import { RunToast } from './Toast';
import { PreViewImage } from '../utils/previewImage';


export function EditPlaylistModal  (props)  {
    const [name, setName] = useState(props.playlist?.name);
    const [description, setDescription] = useState(props.playlist?.description);
    const [privat, setPrivat] = useState(props.playlist?.private);
    const [image, setImage] = useState(props.playlist?.photo);

    const PostEditPlaylist = async(event)  =>{
        event.preventDefault();
        const data = new FormData();

        data.append("name", name || props.playlist?.name);
        (description !== props.playlist?.description) && data.append("description", description);
        data.append("private", privat);
        image.name && data.append("photo",  image, image.name);

        sendForm('playlists/' + props.playlist?.id + '/edit', data);  
        setTimeout(() => store.dispatch(actionPlaylistById(props.playlist?.id)), 100) ;
        RunToast('bg-success','Success', 'Playlist updated');
    } 
    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton> 
                <Modal.Title id="contained-modal-title-vcenter">Edit Playlist</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <Form onSubmit={PostEditPlaylist} id='loadTracksForm'>
                    {PreViewImage(image)}
                    <Form.Group className="mb-3" >
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" name="picture" accept="image/*" id="fileImage" className='form-control mb-3'
                             onChange={(e) => {
                                setImage(e.target.files[0]);
                            }} multiple={false} 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" id="username" className='input form-control mb-3' value={name} 
                            onChange={e => setName(e.target.value)} 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" name="description" rows={3}  id="description" className='form-control mb-3' 
                            value={description || ''} onChange={e => setDescription(e.target.value)} 
                        />
                    </Form.Group>

                    <Form.Check
                        type="switch"
                        id="flexCheckIndeterminate"
                        label="Private?"
                        checked={privat}
                        onChange={e => setPrivat(e.target.checked? 1 : 0)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer> 
                <Button variant="outline-danger" type='submit' form='loadTracksForm' onClick={props.onHide}>Save</Button> 
            </Modal.Footer>
        </Modal>
    )
}
