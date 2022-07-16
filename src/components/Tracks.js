import {connect}   from 'react-redux';
import {actionFullSetTrack, actionFullPlay, actionFullSetPlaylist, actionFullSetTrackCount} from '../store/playerReducer';
import { actionNowPlaylist, actionPlaylistById} from '../store/promiseReducer';
import { store } from '../store/store';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { sendForm } from './SendForm';
import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faUserAstronaut} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';


export let audio = new Audio();


const ButtonDeleteTrack = (track) => {
    const [deletePllstModal, setDeletePllstModal] = useState(false);
    let id = store.getState().plstById?.payload?.id;
    return (
    <>
        <Dropdown.Item href="#/action-1"  onClick={() => {console.log(track); setDeletePllstModal(true)}}>Delete</Dropdown.Item>
        {/* <Button  variant="outline-danger" onClick={() => {console.log(track); setDeletePllstModal(true)}}> Delete</Button> */}
            <Modal
                show={deletePllstModal} onHide={() => setDeletePllstModal(false)}
                backdrop="static" keyboard={false} track={track}>
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

                        setTimeout(() => store.dispatch(actionPlaylistById(id)), 1000)
                    }}>Delete</Button>
                </Modal.Footer>
                </Modal>
                </>
    )
}


const Track = ({track = {}, trackone={}, playlist={}, plstnow={}},  key) => 
<tr>
<td scope="row" width={30} data-id={track.id}>
    <div className="col">
        <Button variant="outline-light" className='rounded-5'  title='Play' onClick={async () => {
            store.dispatch(actionFullSetPlaylist(playlist.tracks));
            store.dispatch(actionFullSetTrack(playlist.tracks[playlist.tracks.indexOf(track)]));
            store.dispatch(actionNowPlaylist(store.getState().player?.track?.pivot?.playlist_id));
            store.dispatch(actionFullPlay());
        }}>
            <FontAwesomeIcon className='' icon={faPlay}/>
        </Button>
    </div>
</td>
    <td>          
        <Link className="link-light" to='#'>  {track.name}</Link>
    </td>
    <td>
        <Link className="link-light" to='#'>  {track.id3.artist}</Link>
    </td>
    <td> 
        <Link className="link-light" to='#'> {track.id3.getAlbum}</Link>
    </td>
    {/* <td>
    {playlist?.user_id === store.getState().auth.user.id? <ButtonDeleteTrack track={track} /> : <button>V</button>}
    </td> */}
    <td align={"right"}>
        <Dropdown align={"end"}>
            <Dropdown.Toggle variant="outline-light" id="dropdown-basic"></Dropdown.Toggle>

            <Dropdown.Menu variant={"dark"}>
                {playlist?.user_id === store.getState().auth.user.id ? <ButtonDeleteTrack track={track} /> : <Dropdown.Item href="#/action-3">Add to Playlist</Dropdown.Item>}
                <Dropdown.Item href="#/action-2">Add to Queue</Dropdown.Item>
                
            </Dropdown.Menu>
        </Dropdown>
    </td>
</tr>


const TracksAll = ({tracks=[], playlist={}}) => 
<table className="table table-dark table-hover align-middle">
    <thead>
        <tr>
            <th scope="col" width={30}></th>
            <th scope="col">Track name</th>
            <th scope="col">Artist</th>
            <th scope="col">Album</th>
            <th scope='col'>Action</th>
        </tr>
</thead>
    <tbody>
        {tracks.map((tracks, i) => <CTrack key={i} track={tracks}/>)}
    </tbody>
</table>

export const СAllTracks = connect(state => ({playlist: state.promise.plstById?.payload || {},
                                 tracks: state.promise?.plstById?.payload?.tracks || [],
                                 trackone: state.player?.playlist || [],
                                 plstnow: state.promise?.plstnow || {}} ), )(TracksAll);

export const CTrack = connect(state => ({playlist: state.promise.plstById?.payload || {},
    tracks: state.promise?.plstById?.payload?.tracks || [],
    trackone: state.player?.playlist || [],
    plstnow: state.promise?.plstnow || {}} ), )(Track);