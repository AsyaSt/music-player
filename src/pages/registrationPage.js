import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { actionAuthLogin } from '../store/authReducer';
import { store } from '../store/store';
import { connect } from 'react-redux';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEyeSlash, faEye} from "@fortawesome/free-solid-svg-icons";
import { Button, Form, InputGroup } from 'react-bootstrap';


export async function sendForm (url, data) {
    let error = await fetch(`http://player-api/api/${url}`, {
        method: 'POST',
        body: data
      }).then(res => res.json())
      .then(data => {
          if(data.token) {
            store.dispatch(actionAuthLogin(data.token, data.user));
            return data
          } else {
            console.log(data); 
            return data.login[0];
          }
      })
    return error;
}

export const RegisterForm = ({authState}) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [textModal, setTextModal] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [showConfPass, setShowConfPass] = useState(false);
  
     const postForm = async (event)  =>{
      event.preventDefault();
      const data = new FormData();
      data.append("login", login);
      data.append("password", password);
      data.append("name", name);

      setTextModal(( typeof(await sendForm('register', data))==='string')? (await sendForm('register', data)) : '');
      
    }

    return (
      <Form onSubmit={postForm} id="register_form">
        <div className="register container align-items-center justify-content-center vw-100 vh-100 d-flex">
         <div className="col-4">
               <h4 className="w-100 text-center">Sign Up</h4>
              <hr/>

              <Form.Group>
                <Form.Label className="form-label">*Login</Form.Label>
                <Form.Control type="text"  id="login" className='input form-control mb-3' placeholder="asya123"
                  value={login} onChange={e => setLogin(e.target.value)} />
              </Form.Group>

              <Form.Group>
                <Form.Label className="form-label">*Full Name</Form.Label>
                <Form.Control type="text"  id="username" className='input form-control mb-3' placeholder="Anastasiia"
                  value={name} onChange={e => setName(e.target.value)} />
              </Form.Group>

               <Form.Group>
                <Form.Label className="form-label">*Password (8+ symbols)</Form.Label>
                <InputGroup>
                  <Form.Control type={showPass ? "text" : "password"} id="password" className='form-control mb-3'
                    value={password} onChange={e => setPassword(e.target.value)} />
                  <InputGroup.Text className='mb-3'>
                    <FontAwesomeIcon icon={showPass ? faEye : faEyeSlash} onClick={() => showPass? setShowPass(false) : setShowPass(true)}/>
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              <Form.Group>
                <Form.Label className="form-label">*Confirm password</Form.Label>
                <InputGroup>
                  <Form.Control type={showConfPass ? "text" : "password"} id="confirm_password" className='form-control mb-3'
                    value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />
                  <InputGroup.Text className='mb-3'>
                    <FontAwesomeIcon icon={showConfPass ? faEye : faEyeSlash} onClick={() => showConfPass? setShowConfPass(false) : setShowConfPass(true)}/>
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              
              <p className='text-danger'>{textModal ? ('*' + textModal) : ''}</p>
              <div className="d-flex justify-content-between align-items-center">
                  <h6>Already a member? <Link to="/login" className="">Log in</Link></h6>
                  <Button variant='outline-danger' type="submit" disabled={password !== passwordConfirm || password.length < 8 || login.length < 3} onClick={() => console.log('/user')}>
                    Sign Up
                  </Button>
              </div>
           </div>
       </div>
      </Form>
    )  
  }

  export const CRegisterForm = connect(state => ({ authState: state.auth?.token }))(RegisterForm);