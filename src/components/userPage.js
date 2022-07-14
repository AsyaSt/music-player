import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect}   from 'react-redux';
import { actionUsersPlaylists } from '../store/promiseReducer';
import { actionFullSetPlaylist } from '../store/playerReducer';
import { store } from '../store/store';
import image from '../images/card.png';
import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
import {CreatePlaylist} from './createPlaylist'
import { Header } from './header';



const Playlist = ({playlist = {}}) => 
  <div className="col-sm-3 p-1">
    <Link className="card" to= {`/playlist/${playlist.id}`} onClick={() => store.dispatch(actionFullSetPlaylist({playlist}) )}>
      <img src={playlist.photo || image} className="card-img-top" alt="..."  height={'150px'}/>
      <div className="card-body">
        <h5 className="card-title"> {playlist.name}</h5>
        <p className="card-text">{playlist.description? playlist.description :  '.' }</p>
      </div>
    </Link>
  </div>
  


export const UsersPlaylistsAll = ({playlists= []}) => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
<>

  <div className='RootCategories row'>
    <div className="col-sm-3 border border-white d-flex align-items-center justify-content-center" onClick={() => setModalShow(true)}>
      <h3>Create new Playlist</h3>
    </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
        
  
    {playlists.map((playlist, i) => <Playlist key={i} playlist={playlist}/>)}
  </div> 
</>)
}

const СUsersPlaylists = connect(state => ({playlists: state.promise.usersPlaylists?.payload?.playlists|| []}), )(UsersPlaylistsAll);
                                              

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
         {/* <Modal.Header closeButton> */}
          {/* <Modal.Title id="contained-modal-title-vcenter">
            Create new Playlist
          </Modal.Title> */}
        {/*</Modal.Header> */}
        <Modal.Body >
          <CreatePlaylist props={props}/>
        </Modal.Body>
        {/* <Modal.Footer> 
          <Button variant="outline-danger" onClick={props.onHide}>Create</Button> 
         </Modal.Footer> */}
      </Modal>
    );
  }


export const UserPage = () => {
let id = store.getState().auth?.user?.id;
  const getAnswer = async () => {
    await store.dispatch(actionUsersPlaylists(id));	
  };

  useEffect(() => {
    getAnswer();
  }, []);

    return(<>
    
    <div className='d-flex container align-items-center justify-content-center'>
        <div className=''>
            <img className='m-4' alt='...' src={store.getState().auth?.user?.avatar || image} width='150px'/>
        </div>
        <div className=''>
            <h3>{store.getState().auth?.user?.name}</h3>
            <Link to={'/editprofile'} >Edit Profile</Link>
        </div>
    </div>

    <h3>My playlists:</h3>
    <СUsersPlaylists/>

    </>)
}
