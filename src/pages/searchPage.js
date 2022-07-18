import { faCompactDisc, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { Button, Form, InputGroup } from "react-bootstrap"
import { actionSearch } from "../store/promiseReducer"
import { store } from "../store/store"
import { PlaylistsAll } from "../components/Playlist";
import { TracksAll } from "../components/Tracks";
import { connect } from "react-redux"
import { Link } from "react-router-dom"




export const SearchPage = ({albums, tracks, artists}) => {
    const getAnswer =  () => {
      store.dispatch(actionSearch(''));
    };
    useEffect(() => {
      getAnswer();
    }, []);
    return(
    <>
        <Form>
            <InputGroup className="mb-3">
                <Form.Control
                name="search"
                placeholder="Search"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onKeyUp={(e) => {
                    setTimeout(() => store.dispatch(actionSearch(e.target.value)), 300) 
                }}
                />
                <Button variant="light" id="button-addon2" type="submit">
                    <FontAwesomeIcon icon={faSearch}/>
                </Button>
        </InputGroup>
      </Form>
        {(albums.length !== 0) && <><div className="d-flex justify-content-between align-items-center py-3">
            <h3 className="text-uppercase"> <FontAwesomeIcon icon={faCompactDisc} className="me-2"/>Albums</h3>
        </div>
        <CSearchAlbums/></>}
      
        {(tracks.length !== 0) && <><div className="d-flex justify-content-between align-items-center py-3">
            <h3 className="text-uppercase"> <FontAwesomeIcon icon={faCompactDisc} className="me-2"/>Tracks</h3>
        </div>
        <CSearchTracks/></>}
        <Artists artists={artists}/>
    </>
    )
}

const CSearchAlbums = connect(state => ({playlists: state.promise?.searchResult?.payload?.albums|| []} ), )(PlaylistsAll);
const CSearchTracks = connect(state => ({tracks: state.promise?.searchResult?.payload?.tracks || [],
                                        playlist: state.promise.searchResult?.payload || {},} ), )(TracksAll);
export const CSearchPage = connect(state => ({tracks: state.promise?.searchResult?.payload?.tracks || [],
                                        albums: state.promise.searchResult?.payload?.albums || [],
                                        artists: state.promise.searchResult?.payload?.artists || []} ), )(SearchPage);



const Artist = ({artist}) => {
    return(
        <>
        <div className=" playlist-img-box me-2 mb-2 rounded-circle position-relative d-flex justify-content-center align-items-center"
                style={{backgroundImage: `url(${"https://www.pngitem.com/pimgs/m/427-4279206_title-detail-mexican-musician-logo-hd-png-download.png"})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", width:250, height:250}}
            >
            <div className="playlist-grey-box"></div>
                <Link to={`/artists/${artist?.id}`} className="artist-search-name text-white text-decoration-none">{artist?.name}</Link>
            </div>
        </>
    )
}

const Artists = ({artists}) => 
    <div className="d-flex flex-wrap">
    {artists.map((artist, i) => <Artist key={i} artist={artist}/>)}
    </div>

