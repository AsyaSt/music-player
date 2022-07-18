import { faPlay, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { actionRemoveTrackFromQueue } from "../store/playerReducer";
import { store } from "../store/store";
import { sendForm } from "./SendForm";
  
const Track = ({track}) => 
<>
<tr>
    <td width={30} data-id={track.id}>
        <div className="col">
            <Button variant="outline-light" className='rounded-5'  title='Play' onClick={async () => {
                // console.log(playlist.tracks, playlist?.tracks[playlist?.tracks.indexOf(track)]);
                // store.dispatch(actionFullSetPlaylist(playlist?.tracks));
                // playlist.tracks ? store.dispatch(actionFullSetTrack(playlist?.tracks[playlist?.tracks.indexOf(track)])) : store.dispatch(actionFullSetTrack(track))
                // store.dispatch(actionFullPlay());
            }}>
                <FontAwesomeIcon className='' icon={faPlay}/>
            </Button>
        </div>
    </td>
    <td>          
        <Link className="link-light" to='#'>  {track.name}</Link>
    </td>
    <td align={"right"}>
        <FontAwesomeIcon icon={faXmark} onClick={() => store.dispatch(actionRemoveTrackFromQueue(track))}/>
    </td>
</tr>
</>

const TrackList = ({tracks}) => {
    return(
        <>
        <table className="table table-dark table-hover align-middle">
            <thead>
                <tr>
                    <th scope="col" width={30}></th>
                    <th scope="col">Track name</th>
                    <th scope='col'>Action</th>
                </tr>
        </thead>
            <tbody>
                {tracks.map((track, i) => <Track key={i} track={track}/>)}
            </tbody>
        </table>
        </>
    )
}



export const CTrackList = connect(state => ({tracks: state.player?.playlist || []} ), )(TrackList);