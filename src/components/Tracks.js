import {connect}   from 'react-redux';
import {actionFullSetTrack, actionFullPlay, actionFullSetPlaylist} from '../store/playerReducer';
import { actionNowPlaylist} from '../store/promiseReducer';
import { store } from '../store/store';

let i = 1;
export let audio = new Audio();

const Track = ({track: {name, file, id3, id , pivot, number} = {}, playlist={}, plstnow={} },  key) => 
<tr>
    <th scope="row">{i++}</th>
    <td>          
        <div onClick={async () => {
            store.dispatch(actionFullSetTrack({name, file, id3, id, pivot, number}));
            store.dispatch(actionNowPlaylist(store.getState().player?.track?.pivot?.playlist_id));
            //store.dispatch(actionFullSetPlaylist(playlist));
            //store.dispatch(actionFullSetPlaylist(plstnow?.payload?.tracks));
            //store.dispatch(actionFullSetTrack(store.getState().player?.playlist[0]));
            store.dispatch(actionFullPlay());
        }}>
            {name}
        </div>
    </td>
    <td>
        <span>{id3.artist}</span>
    </td>
    <td>{id3.getAlbum}</td>
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
        {tracks.map((tracks, i) => <Track key={i} track={tracks}/>)}
    </tbody>
</table>

export const СAllTracks = connect(state => ({playlist: state.promise.plstById?.payload || {},
                                 tracks: state.promise?.plstById?.payload?.tracks || [],
                                 plstnow: state.promise?.plstnow || {}} ), )(TracksAll);