import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { actionAuthLogin } from '../store/authReducer';
import { store } from '../store/store';
import { connect } from 'react-redux';
import {history} from '../App';



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
    console.log(error)
    return error;
}

export const LoginForm = ({authState}) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [textModal, setTextModal] = useState('');


  
    
    const postForm = async(event)  =>{
      event.preventDefault();
      const data = new FormData();
      data.append("login", login);
      data.append("password", password);
    
      setTextModal(( typeof(await SendForm('login', data))==='string')? (await SendForm('login', data)) : '');
    }

    return <>
      <form onSubmit={postForm} className="authorization container align-items-center justify-content-center vw-100 vh-100 d-flex">
        <div className="col-4">
              <h4 className="w-100 text-center">Login</h4>
              
              <hr/>
              <label  className="form-label">*Username</label><br/>
              <input type="text" id="username" className='input form-control mb-3' value={login} onChange={e => setLogin(e.target.value)}/>
              <label  className="form-label">*Password</label>
              <input type="password" id="password" className='form-control mb-3' value={password} onChange={e => setPassword(e.target.value)}/>
              <p className='text-danger'>{textModal ? ('*' + textModal) : ''}</p>
              <div className="d-flex justify-content-between">
                  <Link to="/register" className="">Register</Link>
                  <button type='submit' className="btn btn-outline-danger" disabled={ password.length < 8 || login.length < 5} onClick={() => console.log(textModal)}>Log in</button>
              </div>
          </div>
      </form>
    </>
  }

  //export const CLoginForm = connect(state => ({ authState: state.auth?.token }))(LoginForm);
  