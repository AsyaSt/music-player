import { connect } from "react-redux"
import { store } from "../store/store";
import { PlaylistsAll } from "../components/Playlist";
import { TracksAll } from "../components/Tracks";

export const ArtistPage = ({artist}) => 
<>
 <>{artist.name}</>
 <CArtistPlaylists/>
 <CArtistTracks/>
 </>

 

export const CArtistPage = connect(state => ({artist: state.promise.artistById?.payload || {}} ), )(ArtistPage);
const CArtistPlaylists = connect(state => ({playlists: state.promise.artistById?.payload?.albums || []} ), )(PlaylistsAll);
const CArtistTracks = connect(state => ({tracks: state.promise.artistById?.payload?.tracks || [],
                                        playlist: state.promise.artistById?.payload || {},} ), )(TracksAll);