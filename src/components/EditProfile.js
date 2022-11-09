import Button from 'react-bootstrap/Button';
import {connect}   from 'react-redux';
import React, {useState} from 'react';
import { store } from '../store/store';
import image from '../images/card.png';
import {Link} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import {Accordion} from "react-bootstrap";
import {RunToast} from "./Toast";
import { actionAuthLogin } from '../store/actions/actions_Auth';


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
            RunToast('bg-success','Success', 'Profile updated')
            store.dispatch(actionAuthLogin(store.getState().auth?.token, data.user));
            return data
          } else if(data.login){
            RunToast('bg-danger','Error', 'Login should be unique')
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
    const [description, setDescription] = useState(props.user?.description);
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [password, setPassword] = useState('');
    const [textModal, setTextModal] = useState('');
    
    
    const postForm = async (event)  =>{
        event.preventDefault();
        const data = new FormData();
        login && login!==props.user?.login && data.append("login", login);
        name && name!==props.user?.name && data.append("name", name);
        data.append("description", description);
        avatar.name && data.append("avatar",  avatar, avatar.name);
        
        setTextModal(( typeof(await sendForm('profile/edit', data))==='string')? (await sendForm('profile/edit', data)) : '');
        
      }
      const postEditPassword = async (event)  =>{
        event.preventDefault();
        const data = new FormData();

        password && data.append("password", password);
        
        setTextModal(( typeof(await sendForm('profile/edit', data))==='string')? (await sendForm('profile/edit', data)) : '');
        
      }

    return (
    <>
        <div className='d-flex  w-100'>
            <div className="me-4">
                <div className='mb-3 playlist-img-box rounded-5' style={{backgroundImage: `url(${props.user?.avatar || image})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}></div>
                <Form.Group className="mb-3" controlId="formBasicAvatar">
                    <div className='d-flex'>
                        <Form.Control type="file" className="me-1" name="picture" accept="image/*" onChange={e => setAvatar(e.target.files[0])} multiple={false} />
                    </div>
                </Form.Group>
            </div>
            <div className='w-100'>
                <div className="d-flex flex-column justify-content-between h-100">
                    <div className="w-100 row">
                        <Form onSubmit={postForm}>
                            <Form.Group className="mb-3" controlId="formBasicAvatar">
                                <Form.Label>Change Login:</Form.Label>
                                <Form.Control type="text"  className="me-1" placeholder={login}
                                    value={login} onChange={e => setLogin(e.target.value)} 
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicAvatar">
                                <Form.Label>Change Name:</Form.Label>
                                <Form.Control type="text"  className="me-1" placeholder="Anastasiia"
                                    value={name} onChange={e => setName(e.target.value)} 
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicAvatar">
                                <Form.Label>Change About Me:</Form.Label>
                                <Form.Control as="textarea" rows="3"  className="me-1"
                                    value={description !== 'null' ? description : ''} onChange={e => setDescription(e.target.value)}
                                />
                            </Form.Group>

                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <Link to={'/user'}>Back to home Page</Link>
                                <Button variant="outline-success" type="submit">Save</Button>
                            </div>
                        </Form>
                        <Accordion className="border-0">
                            <Accordion.Item eventKey="0" className="border-0">
                                <Accordion.Header className="btn-dark">Change Password</Accordion.Header>
                                <Accordion.Body className="bg-dark">
                                    <Form onSubmit={postEditPassword} className=''>
                                        <div className="d-flex m-0">
                                            <Form.Group className="col-6 px-3" controlId="formBasicNewPassword">
                                                <Form.Label>New Password:</Form.Label>
                                                <Form.Control type="password" className="" placeholder="new password"
                                                              value={password} onChange={e => setPassword(e.target.value)} />
                                                <Form.Text className="text-muted m-0 p-0">* Minimum 8 symbols.</Form.Text>
                                            </Form.Group>


                                            <Form.Group className="col-6 px-3" controlId="formBasicConfirmPassword">
                                                <Form.Label>Confirm New Password:</Form.Label>
                                                <Form.Control type="password" placeholder="confirm new password"
                                                              value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />
                                            </Form.Group>
                                        </div>
                                        <div className='text-end'>
                                            <Button variant="outline-success" type="submit" disabled={ password.length < 8 || password !== passwordConfirm}>
                                                Change Password
                                            </Button>
                                        </div>
                                    </Form>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
export const CEditProfile = connect(state => ({ user: state.auth?.user }))(EditProfile);

  