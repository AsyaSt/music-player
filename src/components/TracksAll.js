import { connect } from "react-redux";
import { Track } from "./Track";

export const TracksAll = ({tracks, playlist, isPlaying}) => 
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
        {tracks.map((tracks, i) => <Track key={i} track={tracks} playlist={playlist} isPlaying={isPlaying}/>)}
    </tbody>
</table>

export const СAllTracks = connect(state => ({playlist: state.promise.plstById?.payload || {},
                                 tracks: state.promise?.plstById?.payload?.tracks || [],
                                 isPlaying: state.player?.isPlaying || false,} ), )(TracksAll);
