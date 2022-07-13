import {connect}   from 'react-redux';
import {actionFullSetTrack, actionFullPlay} from '../store/playerReducer';
import { store } from '../store/store';

let i = 1;
export let audio = new Audio();

const Track = ({track: {name, file, id3, id} = {} }, key) => 
<tr>
    <th scope="row">{i++}</th>
    <td>          
        <div onClick={async () => {
            audio.src = `http://player-api/storage/tracks/${file}`;   
            store.dispatch(actionFullSetTrack({name, file, id3, id}));
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

export const СAllTracks = connect(state => ({tracks: state.promise.plstById?.payload?.tracks || []}), )(TracksAll);