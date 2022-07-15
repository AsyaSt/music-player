import {connect}   from 'react-redux';
import {actionFullSetTrack, actionFullPlay, actionFullSetPlaylist, actionFullSetTrackCount} from '../store/playerReducer';
import { actionNowPlaylist} from '../store/promiseReducer';
import { store } from '../store/store';


export let audio = new Audio();

const Track = ({track = {}, trackone={}, playlist={}, plstnow={}},  key) => 
<tr>
    <th scope="row">{'#'}</th>
    <td>          
        <div onClick={async () => {
            store.dispatch(actionFullSetPlaylist(playlist.tracks));
            store.dispatch(actionFullSetTrack(playlist.tracks[playlist.tracks.indexOf(track)]));
            store.dispatch(actionNowPlaylist(store.getState().player?.track?.pivot?.playlist_id));
            store.dispatch(actionFullPlay());
        }}>
            {track.name}
        </div>
    </td>
    <td>
        <span>{track.id3.artist}</span>
    </td>
    <td>{track.id3.getAlbum}</td>
</tr>


const TracksAll = ({tracks=[]}) => 
<table className="table table-dark table-striped table-dark table-hover">
    <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Track name</th>
            <th scope="col">Artist</th>
            <th scope="col">Album</th>
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