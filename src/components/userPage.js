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

const Playlist = ({playlist = {}}) => 
  <div className="col-sm-3">
    <Link className="card" to= {`/playlist/${playlist.id}`} onClick={() => store.dispatch(actionFullSetPlaylist({playlist}) )}>
      <img src={playlist.photo || image} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title"> {playlist.name}</h5>
        <p className="card-text">{playlist.description? playlist.description :  '.' }</p>
        <button className="btn btn-primary" >Go somewhere</button>
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
    <Header/>
    <div className='d-flex container align-items-center justify-content-center'>
        <div className=''>
            <img className='m-4' alt='...' src={image} width='150px'/>
        </div>
        <div className=''>
            <h3>{store.getState().auth?.user?.name}</h3>
            <a href='/change'>Edit Profile</a>
        </div>
    </div>

    <h3>My playlists:</h3>
    <СUsersPlaylists/>

    </>)
}
