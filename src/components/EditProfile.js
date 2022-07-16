import Button from 'react-bootstrap/Button';
import {connect}   from 'react-redux';
import React, {useState} from 'react';
import { store } from '../store/store';
import image from '../images/card.png';
import { actionAuthLogin } from '../store/authReducer';
import {Link} from 'react-router-dom';
import Form from 'react-bootstrap/Form';


export async function sendForm (url, data) {
    let error = await fetch(`http://player-api/api/${url}`, {
        method: 'POST',
        headers: {
            ...(localStorage.authToken ? {"Authorization": "Bearer " + localStorage.authToken} : {})
        },
        body: data
      }).then(res => res.json())
      .then(data => {
          if(data.user) {
            store.dispatch(actionAuthLogin(store.getState().auth?.token, data.user));
            return data
          } else if(data.login){
            return data.login[0];
          } else{
            return data;
          }
      })
    return error;
}

export function EditProfile  (props)  {
    const [login, setLogin] = useState(props.user?.login);
    const [name, setName] = useState(props.user?.name);
    const [avatar, setAvatar] = useState((props.user?.avatar || image));
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [password, setPassword] = useState('');
    const [textModal, setTextModal] = useState('');
    
    
    const postForm = async (event)  =>{
        event.preventDefault();
        const data = new FormData();
        login && login!==props.user?.login && data.append("login", login);
        name && name!==props.user?.name && data.append("name", name);
        avatar.name && data.append("avatar",  avatar, avatar.name);
        
        setTextModal(( typeof(await sendForm('profile/edit', data))==='string')? (await sendForm('profile/edit', data)) : '');
        
      }
      const postEditPassword = async (event)  =>{
        event.preventDefault();
        const data = new FormData();

        password && data.append("password", password);
        
        setTextModal(( typeof(await sendForm('profile/edit', data))==='string')? (await sendForm('profile/edit', data)) : '');
        
      }

    return (<>
   <div className='d-flex container align-items-center justify-content-center'>
        <div className=''>
            <img className='m-4' alt='...' src={props.user?.avatar || image} width='150px'/>
        </div>
        <div className=''>
            <h5>Name: {store.getState().auth?.user?.name}</h5>
            <p>Login: {store.getState().auth?.user?.login}</p>
        </div>
    </div>
    <Form onSubmit={postForm} className='d-flex justify-content-center align-items-center'>
        <div>
        <Form.Group className="mb-3" controlId="formBasicLogin">
            <Form.Label>Change Login:</Form.Label>
            <div className='d-flex'>
                <Form.Control type="text"  className="me-1" placeholder={login}
                        value={login} onChange={e => setLogin(e.target.value)} />
                <Button variant="outline-danger" type="submit">Save</Button>
            </div>
            <Form.Text className="text-muted">{textModal || "*login must be unique"}</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Change Name:</Form.Label>
            <div className='d-flex'>
                <Form.Control type="text"  className="me-1" placeholder="Anastasiia"
                    value={name} onChange={e => setName(e.target.value)} />
                <Button variant="outline-danger" type="submit">Save</Button>
            </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAvatar">
            <Form.Label>Change Avatar:</Form.Label>
            <div className='d-flex'>
                <Form.Control type="file" className="me-1" name="picture" accept="image/*" onChange={e => setAvatar(e.target.files[0])} multiple={false} />
                <Button variant="outline-danger" type="submit">Save</Button>
            </div>
        </Form.Group>
        </div>
    </Form>
    <h5 className='d-flex justify-content-center'> Change Password:</h5>
    <Form onSubmit={postEditPassword} className='d-flex justify-content-center align-items-center'>
    
        <div>
            <Form.Group className="mb-3" controlId="formBasicNewPassword">
                <Form.Label>New Password:</Form.Label>
                <Form.Control type="password" className="" placeholder="new password"
                        value={password} onChange={e => setPassword(e.target.value)} />
                <Form.Text className="text-muted">* Minimum 8 symbols.</Form.Text>
            </Form.Group>
            

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm New Password:</Form.Label>
                <Form.Control type="password" placeholder="confirm new password"
                        value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />
            </Form.Group>
            <div className='d-flex justify-content-between'>
                <Button variant="outline-danger" type="submit" disabled={ password.length < 8 || password !== passwordConfirm}>
                    Change Password
                </Button>
                <Link to={'/user'}>Back to home Page</Link>
            </div>
        </div>
    </Form>
    </>)
}
export const CEditProfile = connect(state => ({ user: state.auth?.user }))(EditProfile);

  