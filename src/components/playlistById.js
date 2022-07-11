import React, {useState, useEffect} from 'react';
import { ReactDOM } from 'react';
import { store } from '../store/store';
import { actionPlaylistById} from '../store/promiseReducer';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Provider, connect}   from 'react-redux';
import { actionFullSetTrack, actionFullPlay} from '../store/playerReducer';
import { Header } from './header';
import { СNowPlayingPlayer } from './playing';



function sendForm (url, data) {
    fetch(`http://player-api/api/${url}`, {
        method: 'POST',
        body: data,
        headers: {
          
          ...(localStorage.authToken ? {"Authorization": "Bearer " + localStorage.authToken} : {})
          
          },
      }).then(res => res.json())
      .then(data => {
          if(data.token) {
            console.log(data)
            return data
          } else {
            //console.log(data.login[0]); 
          }
      })
} 



function ShowModal  (props)  {
    const [tracks, setTrack] = useState(null);

    const PostLoadTracks = async(event)  =>{
        event.preventDefault();
        const data = new FormData();
    
        data.append("id", store.getState().promise.plstById.payload.id);
        let i = 0;
        for (let track of tracks) {
            data.append(`tracks[${i++}]`, track);
        }
        sendForm('playlists/load-tracks', data);
      }  

return(
<Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
     <Modal.Header closeButton> 
      <Modal.Title id="contained-modal-title-vcenter">
      Add Tracks
      </Modal.Title> 
    </Modal.Header>
    <Modal.Body >
    <form onSubmit={PostLoadTracks} className="authorization center align-items-center justify-content-center  d-flex" id='loadTracksForm'>
        <div className="mb-3">
            <label className="form-label">Multiple files input example</label>
            
            <input className="form-control"  accept=".mp3" type="file" id="formFileMultiple" multiple onChange={(e) => setTrack(e.target.files)}/>
        </div>
    </form>
    </Modal.Body>
    <Modal.Footer> 
      <Button variant="outline-danger" type='submit' form='loadTracksForm' onClick={props.onHide}>Save</Button> 
     </Modal.Footer>
  </Modal>)
}
let i =1;
export let audio = new Audio();
const Track = ({track: {name, file, id3, id} = {} }, key) => 
    
<tr>
    <th scope="row">{i++}</th>
    <td>          
        <button onClick={async() => {
            await (() => audio.src = `http://player-api/storage/tracks/${file}`)();
            store.dispatch(actionFullSetTrack({name, file, id3, id}));
            store.dispatch(actionFullPlay());
        }}>
            {name}
        </button>
    </td>
    <td>
        <a href='#/artist'>{id3.artist}</a>
    </td>
    <td>{id3.getAlbum}</td>
</tr>


const TracksAll = ({tracks=[]}) => 
    <table className="table table-dark table-striped table-dark table-hover">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Track name</th>
                <th scope="col">Artist</th>
                <th scope="col">Album</th>
            </tr>
    </thead>
        <tbody>
            {tracks.map((tracks, i) => <Track key={i} track={tracks}/>)}
        </tbody>
    </table>

const СAllTracks = connect(state => ({tracks: state.promise.plstById?.payload?.tracks || []}), )(TracksAll);


export const PlaylistById = ({playlist = {}}) => {
    let id = window.location.href.split('/')[4];
    const getAnswer = async () => {
      await store.dispatch(actionPlaylistById(id));	
      
    };
    
    useEffect(() => {
      getAnswer();
    }, []);

    const [modalShow, setModalShow] = React.useState(false);
  
  return(
    <>
    <Header/>
    <div className='d-flex justify-content-around'>
    <div>
        <h1 >Playlist</h1>
        <div className='d-flex justify-content-center'>
            <div className='me-4'>
                <img src={playlist.photo} width ='250px' alt='...'/>
            </div>
            <div>
                <p className='h4'>Название плейлиста: {playlist.name}</p>
                <p>Автор плейлиста: {playlist.user_name}</p>
                
                <p>{playlist?.tracks?.length} треков</p> 
                <div className='d-flex'>
                <div> <button type="button" className="btn btn-light me-2">Перемешать</button></div>
                <div> <button type="button" className="btn btn-light">Добавить в библиотеку</button></div>
                </div>
                {playlist.user_id === store.getState().auth.user.id? 
                (<>
                    <Button variant="primary" onClick={() => setModalShow(true)}>
                        Add Tracks
                    </Button>

                    <ShowModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    /></>) : <></>}
                
            </div>
        </div>
            <СAllTracks/>
      </div>
          <СNowPlayingPlayer/>
      </div>
      
      
      </>
  )}