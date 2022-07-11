import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Provider, connect}   from 'react-redux';
import { actionUsersPlaylists } from '../store/promiseReducer';
import { actionFullSetPlaylist } from '../store/playerReducer';
import { store } from '../store/store';
import image from '../images/card.png';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {CreatePlaylist} from './createPlaylist'
import { Header } from './header';

// function sendForm (url, data) {
//     fetch(`http://player-api/api/${url}`, {
//         method: 'POST',
//         body: data,
//         headers: {
          
//           ...(localStorage.authToken ? {"Authorization": "Bearer " + localStorage.authToken} : {})
          
//           },
//       }).then(res => res.json())
//       .then(data => {
//           if(data.token) {
//             console.log(data)
//             return data
//           } else {
//             //console.log(data.login[0]); 
//           }
//       })
// }

const Playlist = ({playlist: {id, user_id, name, photo, description} = {}}) => 
  <div className="col-sm-3">
    <Link className="card" to= {`/playlist/${id}`} onClick={() => store.dispatch(actionFullSetPlaylist({id, user_id, name, photo, description}) )}>
      <img src={photo || image} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title"> {name}</h5>
        <p className="card-text">{description? description :  '.' }</p>
        <button className="btn btn-primary" >Go somewhere</button>
      </div>
    </Link>
  </div>
  


export const UsersPlaylistsAll = ({playlists= []}) => 
  <div className='RootCategories row'>
    {playlists.map((playlist, i) => <Playlist key={i} playlist={playlist}/>)}
  </div> 

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
let id = store.getState().auth.user.id;
  const getAnswer = async () => {
    await store.dispatch(actionUsersPlaylists(id));	
  };

  useEffect(() => {
    getAnswer();
  }, []);

const [modalShow, setModalShow] = React.useState(false);

    return(<>
    <Header/>
    <div className='d-flex container align-items-center justify-content-center'>
        <div className='col'>
            <img className='col-sm-3' alt='...' src={image}/>
        </div>
        <div className='col'>
            <h3>{store.getState().auth.user.name}</h3>
            <a href='/change'>Edit Profile</a>
        </div>
    </div>
    <Button variant="primary" onClick={() => setModalShow(true)}>
        Create new Playlist
    </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

    <h3>My playlists</h3>
    <СUsersPlaylists/>

    </>)
}
