import { connect } from "react-redux";
import { PlaylistsAll } from "../components/PlaylistsAll";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCompactDisc} from "@fortawesome/free-solid-svg-icons";


export const AllPlaylistsPage = () => {
    return(
        <>
        <div className="d-flex justify-content-between align-items-center py-3">
            <h3 className="text-uppercase"> <FontAwesomeIcon icon={faCompactDisc} className="me-2"/>Playlists</h3>
        </div>
        <CAllPlaylists/>
        </>
    )
}


export const CAllPlaylists = connect(state => ({playlists: state.promise.allPlaylists?.payload?.playlists?.data || []}), )(PlaylistsAll);