import { connect } from "react-redux"
import { store } from "../store/store";
import { useEffect } from "react";
import { TracksAll } from "../components/Tracks";
import { actionPlaylistById } from "../store/promiseReducer";
import { PlaylistById } from "../components/playlistById";

export const AlbumPage = ({playlist, tracks}) => {
    return(
        <CAlbumPlaylist playlist={playlist} tracks={tracks}/>
    )
}
    



export const CAlbumPlaylist = connect(state => ({playlist: state.promise.plstById?.payload || {},
                                        tracks: state.promise.plstById?.payload?.tracks || []} ), )(PlaylistById);
export const CAlbumPage = connect(state => ({playlist: state.promise.plstById?.payload || {},
                            tracks: state.promise.plstById?.payload?.tracks || []} ), )(AlbumPage);