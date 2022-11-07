import React, {useState} from 'react';
import { sendForm } from '../utils/SendForm';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { actionUsersPlaylists } from '../store/actions/actions_Promise';
import { store } from '../store/store';
import { history } from '../App';
import {Form} from "react-bootstrap";
import { RunToast } from './Toast';
import { PreViewImage } from '../utils/previewImage';


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
    store.dispatch(actionUsersPlaylists(store.getState().auth?.user?.id));
    history.push(`/playlist/${result.playlist.id}`)
    RunToast('bg-success','Success', 'Playlist created')
  }

  return (
    <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Create new Playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body >
            <Form onSubmit={PostCreatePlaylist} id='loadTracksForm'>
                {PreViewImage(image)}
                <Form.Group className="mb-3" >
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" name="picture" accept="image/*" id="fileImage" className='form-control mb-3' onChange={(e) => {
                        setImage(e.target.files[0]);
                    }} multiple={false} />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" id="username" className='input form-control mb-3' onChange={e => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" name="description" rows={3}  id="description" className='form-control mb-3' onChange={e => setDescription(e.target.value)} />
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
            <Button variant="outline-success w-100" type='submit' form='loadTracksForm' onClick={props.onHide}>Save</Button>
        </Modal.Footer>
    </Modal>
  )
}