import { connect } from "react-redux"
import { store } from "../store/store";
import { useEffect } from "react";
import { PlaylistsAll } from "../components/Playlist";
import { TracksAll } from "../components/Tracks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCompactDisc, faHeadphonesSimple} from "@fortawesome/free-solid-svg-icons";
import { actionArtistById } from "../store/actions/actions_Promise";

const ArtistPage = ({artist}) => {
    let id = window.location.href.split('/')[4];
    const getAnswer =  () => {
      store.dispatch(actionArtistById(id));
    };

    useEffect(() => {
      getAnswer();
    }, []);

return(<>
  <div className="d-flex justify-content-center flex-column align-items-center">
      <div className="playlist-img-box rounded-circle position-relative"
           style={{backgroundImage: `url(${artist.photo ?? "https://www.pngitem.com/pimgs/m/427-4279206_title-detail-mexican-musician-logo-hd-png-download.png"})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", width:250, height:250}}
      ></div>
      <h1>{artist.name}</h1>
      <p className='text-white-50 mb-2'><FontAwesomeIcon className='me-2' icon={faHeadphonesSimple} />{artist?.tracks?.length} Tracks</p>
      <p className='text-white-50 mb-2'><FontAwesomeIcon className='me-2' icon={faCompactDisc} />{artist?.albums?.length} Albums</p>
  </div>
  
  <div className="d-flex justify-content-between align-items-center py-3">
      <h3 className="text-uppercase"> <FontAwesomeIcon icon={faCompactDisc} className="me-2"/>Albums</h3>
  </div>
 <CArtistPlaylists/>
 <CArtistTracks/>
 </>)

}

export const CArtistPage = connect(state => ({artist: state.promise.artistById?.payload || {}} ), )(ArtistPage);
const CArtistPlaylists = connect(state => ({playlists: state.promise.artistById?.payload?.albums || []} ), )(PlaylistsAll);
const CArtistTracks = connect(state => ({tracks: state.promise.artistById?.payload?.tracks || [],
                                        playlist: state.promise.artistById?.payload || {},} ), )(TracksAll);