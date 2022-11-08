import {CreatePlaylist} from './createPlaylist';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeadphonesSimple, faPlus} from "@fortawesome/free-solid-svg-icons";
import React from 'react';
import { Button } from 'react-bootstrap';
import { Playlist } from './Playlist';

export const UsersPlaylistsAll = ({playlists}) => {
    const [modalShow, setModalShow] = React.useState(false);
    return (
      <> 
        <div className="d-flex justify-content-between align-items-center py-3">
            <h3 className="text-uppercase"> 
              <FontAwesomeIcon icon={faHeadphonesSimple} className="me-2"/>
              My playlists
            </h3>
            <Button  variant="outline-success" title='Create playlist' onClick={() => setModalShow(true)}>
                <FontAwesomeIcon icon={faPlus} />
            </Button>
            <CreatePlaylist
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
        <div className='RootCategories d-flex justify-content-start flex-wrap'>
          {playlists.map((playlist, i) => <Playlist key={i} playlist={playlist}/>)}
        </div> 
    </>)
  }