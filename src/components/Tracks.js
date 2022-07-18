import {connect}   from 'react-redux';
import {actionFullSetTrack, actionFullPlay, actionFullSetPlaylist , actionAddTrackToQueue} from '../store/playerReducer';
import { actionNowPlaylist, actionPlaylistById, actionArtistById} from '../store/promiseReducer';
import { store } from '../store/store';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { sendForm } from './SendForm';
import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faPlay} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { Dropdown , Form} from 'react-bootstrap';


export let audio = new Audio();

const PlaylistOption = () => {
    const playlists = store.getState().promise?.usersPlaylists?.payload?.playlists;
     if (playlists) {
        console.log(playlists);
        return (playlists.map((playlistone, i) => <option value={playlistone.id} className="bg-dark" key={i}>{playlistone.name}</option>))
     }
}

const ButtonDeleteTrack = (track) => {
    const [deletePllstModal, setDeletePllstModal] = useState(false);
    return (
    <>
        <Dropdown.Item  onClick={() => {console.log(track); setDeletePllstModal(true)}}>Delete</Dropdown.Item>
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

                        setTimeout(() => store.dispatch(actionPlaylistById(track.track?.pivot?.playlist_id)), 100)
                    }}>Delete</Button>
                </Modal.Footer>
                </Modal>
                </>
    )
}


const Track = ({track,  playlist}) => {
    // const [select, setSelect] = React.useState('');
    const PostLoadTracks = async(form)  =>{
        console.log(form.target)
        const data = new FormData(form.target);
        sendForm('playlists/add-track', data);

      }  
return(
<tr>
<td scope="row" width={30} data-id={track.id}>
    <div className="col">
        <Button variant="outline-light" className='rounded-5'  title='Play' onClick={async () => {
            console.log(playlist.tracks, playlist?.tracks[playlist?.tracks.indexOf(track)]);
            playlist.tracks && store.dispatch(actionFullSetPlaylist(playlist?.tracks));
            playlist.tracks ? store.dispatch(actionFullSetTrack(playlist?.tracks[playlist?.tracks.indexOf(track)])) : store.dispatch(actionFullSetTrack(track))
            store.dispatch(actionFullPlay());
        }}>
            <FontAwesomeIcon className='' icon={faPlay}/>
        </Button>
    </div>
</td>
    <td>          
        <Link className="link-light" to='#'>  {track.name}</Link>
    </td>
    <td onClick={() => store.dispatch(actionArtistById(track.artist_id))}>
        <Link className="link-light" to={`/artists/${track.artist_id}`}>  {track.id3.artist}</Link>
    </td>
    <td> 
        <Link className="link-light" to={`/albums/${track?.album?.id}`}> {track.id3.getAlbum}</Link>
    </td>
    <td align={"right"}>
        <Dropdown align={"end"}>
            <Dropdown.Toggle variant="outline-light" id="dropdown-basic"></Dropdown.Toggle>

            <Dropdown.Menu variant={"dark"}>
            {playlist?.user_id === store.getState().auth.user.id ? <ButtonDeleteTrack track={track} /> :

            <Form className="input-group d-flex" onSubmit={(e) => {
                e.preventDefault();
                PostLoadTracks(e);
            }}>
                <input type={"hidden"} name="trackId" value={track?.id}></input>
                <select className="dropdown-item btn btn-outline-secondary w-75" name="playlistId" id="inputGroupSelect04"
                        aria-label="Example select with button addon">
                    <PlaylistOption/>
                </select>
                <button type={"submit"} className="btn btn-outline-secondary w-auto"><FontAwesomeIcon icon={faCheck}/></button>
            </Form>
}
                <Dropdown.Item onClick={() => {
                                                    store.dispatch(actionAddTrackToQueue(track))
                                                }}>Add to Queue</Dropdown.Item>
                
            </Dropdown.Menu>
        </Dropdown>
    </td>
</tr>)
}


export const TracksAll = ({tracks, playlist}) => 
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
        {tracks.map((tracks, i) => <Track key={i} track={tracks} playlist={playlist}/>)}
    </tbody>
</table>

export const СAllTracks = connect(state => ({playlist: state.promise.plstById?.payload || {},
                                 tracks: state.promise?.plstById?.payload?.tracks || []} ), )(TracksAll);
