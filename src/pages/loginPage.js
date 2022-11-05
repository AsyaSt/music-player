import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { store } from '../store/store';
import {history} from '../App';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEyeSlash, faEye} from "@fortawesome/free-solid-svg-icons";
import { Button, InputGroup } from 'react-bootstrap';
import { actionAuthLogin } from '../store/actions/actions_Auth';



export async function SendForm (url, data) {
  let error = await fetch(`http://player-api/api/${url}`, {
      method: 'POST',
      body: data
    }).then(res => res.json())
    .then((data) => {
        if(data.token) {
          history.push('/user');
          store.dispatch(actionAuthLogin(data.token, data.user));
          return data
        } else {
          return data.message;
        }
    })
    console.log(error);
    return error;
}

export const LoginForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [textModal, setTextModal] = useState('');
    const [showPass, setShowPass] = useState(false);

    
    const postForm = async(event)  =>{
      event.preventDefault();
      const data = new FormData();
      data.append("login", login);
      data.append("password", password);
    
      setTextModal(( typeof(await SendForm('login', data))==='string')? (await SendForm('login', data)) : '');
    }

    return <>
    <Form onSubmit={postForm} className="authorization container align-items-center justify-content-center vw-100 vh-100 d-flex">
      
        <div className="col-4">
              <h4 className="w-100 text-center">Login</h4>
              
              <hr/>
              <Form.Group>
                <Form.Label className="form-label">*Username</Form.Label>
                <Form.Control type="text"  id="username" className='input form-control mb-3'
                  value={login} onChange={e => setLogin(e.target.value)} />
              </Form.Group>

              <Form.Group>
                <Form.Label className="form-label">*Password</Form.Label>
                <InputGroup>
                  <Form.Control type={showPass ? "text" : "password"} id="password" className='form-control mb-3'
                    value={password} onChange={e => setPassword(e.target.value)} />
                  <InputGroup.Text className='mb-3'>
                    <FontAwesomeIcon icon={showPass ? faEye : faEyeSlash} onClick={() => showPass? setShowPass(false) : setShowPass(true)}/>
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              
              <p className='text-danger'>{textModal ? ('*' + textModal) : ''}</p>
              <div className="d-flex justify-content-between">
                  <Link to="/register" className="">Register</Link>
                  <Button type='submit' variant="outline-danger" disabled={ password.length < 8 || login.length < 5} onClick={() => console.log(textModal)}>Log in</Button>
              </div>
          </div>
      </Form>
    </>
  }
  