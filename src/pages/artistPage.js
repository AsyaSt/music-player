import { connect } from "react-redux"
import { store } from "../store/store";
import { useEffect } from "react";
import { PlaylistsAll } from "../components/Playlist";
import { TracksAll } from "../components/Tracks";
import { actionArtistById } from "../store/promiseReducer";

export const ArtistPage = ({artist}) => {
    let id = window.location.href.split('/')[4];
    const getAnswer =  () => {
      store.dispatch(actionArtistById(id));
    };

    useEffect(() => {
      getAnswer();
    }, []);

return(<>
 <h1>{artist.name}</h1>
 <CArtistPlaylists/>
 <CArtistTracks/>
 </>)

}

export const CArtistPage = connect(state => ({artist: state.promise.artistById?.payload || {}} ), )(ArtistPage);
const CArtistPlaylists = connect(state => ({playlists: state.promise.artistById?.payload?.albums || []} ), )(PlaylistsAll);
const CArtistTracks = connect(state => ({tracks: state.promise.artistById?.payload?.tracks || [],
                                        playlist: state.promise.artistById?.payload || {},} ), )(TracksAll);