import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Dropdown } from "react-bootstrap";
import { sendForm } from '../utils/SendForm';
import {actionPlaylistById } from '../store/actions/actions_Promise';
import { store } from '../store/store';

export const ButtonDeleteTrack = (track) => {
    const [deletePllstModal, setDeletePllstModal] = useState(false);
    return (
    <>
        <Dropdown.Item  onClick={() => { setDeletePllstModal(true)}}>Delete</Dropdown.Item>
        <Modal
            show={deletePllstModal} onHide={() => setDeletePllstModal(false)}
            backdrop="static" keyboard={false} track={track}
        >
            <Modal.Header closeButton>
                <Modal.Title className='w-100 text-center'>Delete Track?</Modal.Title>
            </Modal.Header>

            <Modal.Body className='text-center'>
                Are you really want to delete track  <span className='text-danger'><i>"{track.track.name}" - {track.track?.id3?.artist}</i></span>?
            </Modal.Body>

            <Modal.Footer className='d-flex justify-content-center'>
                <Button className='mx-2' variant="secondary" onClick={() => setDeletePllstModal(false)}>
                    Close
                </Button>
                <Button track={track} className='mx-2' variant="danger" onClick={async() => {
                    const data = new FormData();
                    data.append('playlistId', track.track?.pivot?.playlist_id);
                    data.append('trackId',  track.track?.pivot?.track_id);
                    await sendForm(`playlists/remove-track`, data);
                    setDeletePllstModal(false);

                    setTimeout(() => store.dispatch(actionPlaylistById(track.track?.pivot?.playlist_id)), 100)
                }}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    )
}