import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { actionAuthLogin } from '../store/authReducer';
import { store } from '../store/store';


function sendForm (url, data) {
    fetch(`http://player-api/api/${url}`, {
        method: 'POST',
        body: data
      }).then(res => res.json())
      .then(data => {
          if(data.token) {
            store.dispatch(actionAuthLogin(data.token, data.user));
            //console.log(data)
            return data
          } else {
            //console.log(data.login[0]); 
          }
      })
}

export const LoginForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
  
    const postForm = (event)  =>{
      event.preventDefault();
      const data = new FormData();
      data.append("login", login);
      data.append("password", password);
    
      sendForm('login', data);
    }
  
    return <>
      <form onSubmit={postForm} className="authorization container align-items-center justify-content-center vw-100 vh-100 d-flex">
        <div className="col-4">
              <h4 className="w-100 text-center">Login</h4>
              <hr/>
              <label  className="form-label">Username</label><br/>
              <input type="text" id="username" className='input form-control mb-3' value={login} onChange={e => setLogin(e.target.value)}/>
              <label  className="form-label">Password</label>
              <input type="password" id="password" className='form-control mb-3' value={password} onChange={e => setPassword(e.target.value)}/>
              <div className="d-flex justify-content-between">
                  <Link to="/register" className="">Register</Link>
                  <button type='submit' className="btn btn-outline-danger" onClick={() => console.log(login, password)}>Log in</button>
              </div>
          </div>
      </form>
    </>
  }
  
  
  export const RegisterForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
  
     const postForm = (event)  =>{
      event.preventDefault();
      const data = new FormData();
      data.append("login", login);
      data.append("password", password);
      data.append("name", name);

      sendForm('register', data);
      
    }
  
    return (
      <form  onSubmit={postForm} id="register_form">
        <div className="register container align-items-center justify-content-center vw-100 vh-100 d-flex">
         <div className="col-4">
               <h4 className="w-100 text-center">Sign Up</h4>
              <hr/>
              <label className="form-label">Login</label><br/>
               <input type="text" id="username" className="input form-control mb-3" placeholder="asya123"
                  value={login} onChange={e => setLogin(e.target.value)}
               />
  
               <label className="form-label">Full Name</label><br/>
               <input type="text" id="name" className="input form-control mb-3" placeholder="My Chemical Romance"
                  value={name} onChange={e => setName(e.target.value)}
               />
  
               <label className="form-label">Password</label>
               <input type="password" id="password" className="form-control mb-3" value={password} onChange={e => setPassword(e.target.value)} /> 
  
               <label  className="form-label">Confirm password</label>
               <input type="password" id="confirm_password" className="form-control mb-3"/>
               <div className="d-flex justify-content-between align-items-center">
                   <h6>Already a member? <Link to="/login" className="">Log in</Link></h6>
                   <button type="submit" className="btn btn-outline-danger">Sign Up</button>
               </div>
           </div>
       </div>
      </form>
    )  
  }