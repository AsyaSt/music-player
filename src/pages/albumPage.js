import { connect } from "react-redux"
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