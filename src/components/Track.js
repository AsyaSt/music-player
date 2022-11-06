import { connect}   from 'react-redux';
import { store } from '../store/store';
import Button from 'react-bootstrap/Button';
import { sendForm } from '../utils/SendForm';
import React from 'react';
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCheck, faPlay} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { Dropdown , Form} from 'react-bootstrap';
import { RunToast } from './Toast';
import { actionArtistById} from '../store/actions/actions_Promise';
import { actionAddTrackToQueue, actionFullPlay, actionFullSetPlaylist, actionFullSetTrack } from '../store/actions/actions_Player';
import { ButtonDeleteTrack } from './ButtonDeleteTrack';


export let audio = new Audio();

const PlaylistOption = () => {
    const playlists = store.getState().promise?.usersPlaylists?.payload?.playlists;
     if (playlists) {
        return (
            playlists.map((playlistone, i) => <option value={playlistone.id} className="bg-dark" key={i}>{playlistone.name}</option>)
        )
     }
}

export const Track = ({track,  playlist, isPlaying}) => {
    const PostLoadTracks = async(form)  => {
        const data = new FormData(form.target);
        sendForm('playlists/add-track', data);
        RunToast('bg-success','Success', `Track add to playlist`)
    }

    
return (
<tr className={`disactive-track track-play-button-${track?.id}`}>
    <td scope="row" width={30} data-id={track.id}>
        <div className="col">
            <Button variant="outline-light" className={`rounded-5`}  title='Play' onClick={async () => {
                // console.log(playlist.tracks, playlist?.tracks[playlist?.tracks.indexOf(track)]);
                playlist.tracks && store.dispatch(actionFullSetPlaylist(playlist?.tracks));
                playlist.tracks ? store.dispatch(actionFullSetTrack(playlist?.tracks[playlist?.tracks.indexOf(track)])) : store.dispatch(actionFullSetTrack(track))
                store.dispatch(actionFullPlay());
            }}>
                <FontAwesomeIcon className={`track-play-icon-${track?.id}`} icon={faPlay}/>
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
                </Form>}
                        
                <Dropdown.Item 
                    onClick={() => {
                        store.dispatch(actionAddTrackToQueue(track))
                    }}>
                    Add to Queue
                </Dropdown.Item>
                
            </Dropdown.Menu>
        </Dropdown>
    </td>
</tr>)
}


