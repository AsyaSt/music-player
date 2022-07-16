import React, {useState} from 'react';
import { sendForm } from './SendForm';
// import {Link} from 'react-router-dom';
// import { actionAuthLogin } from '../store/authReducer';
// import { store } from '../store/store';



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


export const CreatePlaylist = (props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [privat, setPrivat] = useState(0);
  const [image, setImage] = useState(null);

  const PostCreatePlaylist = async(event)  =>{
    event.preventDefault();
    const data = new FormData();

    data.append("name", name);
    data.append("description", description);
    data.append("private", privat);
    data.append("photo",  image, image.name);

    sendForm('playlists/create', data);
  }

  return <>
    <form onSubmit={PostCreatePlaylist} className="authorization center align-items-center justify-content-center  d-flex">

        <div className="border p-3 col-9">
        <h4 className="w-100 text-center">Create Playlist</h4>
            <hr/>
            <div className="d-flex justify-content-between">
              <div className="w-auto">
                  <label  className="form-label">Image</label>
                  <input type="file" name="picture" accept="image/*" id="file" className='form-control mb-3' onChange={(e) => setImage(e.target.files[0])} multiple={false}/>
                  <input className="form-check-input me-3" type="checkbox" id="flexCheckIndeterminate" checked={privat} onChange={e => setPrivat(e.target.checked? 1 : 0)}/>
                  <label className="form-check-label" >Private?</label>    
              </div>
              <div className="w-50">
                  <label  className="form-label">Name</label><br/>
                  <input type="text" id="username" className='input form-control mb-3' value={name} onChange={e => setName(e.target.value)}/>
                  <label  className="form-label">Description</label>
                  <textarea type="password" id="password" className='form-control mb-3' value={description} onChange={e => setDescription(e.target.value)}/>
              </div>
            </div>
            <button type='submit' className="btn btn-outline-danger" onClick={props.onHide} >Create</button>
        </div>
    </form>
  </>
}