import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { actionAuthLogin } from '../store/authReducer';
import { store } from '../store/store';
import { connect } from 'react-redux';



async function sendForm (url, data) {
  let error = await fetch(`http://player-api/api/${url}`, {
      method: 'POST',
      body: data
    }).then(res => res.json())
    .then(data => {
        if(data.token) {
          store.dispatch(actionAuthLogin(data.token, data.user));
          return data
        } else {
          console.log(data.message)
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
    
      setTextModal(( typeof(await sendForm('login', data))==='string')? (await sendForm('login', data)) : '');
    }

  //   let history = useHistory();

  //   useEffect(() => {
  //     if (authState) {history.push('/user')}
  // }, []);

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

  export const CLoginForm = connect(state => ({ authState: state.auth?.token }))(LoginForm);
  
  
  // export const RegisterForm = ({authState2}) => {
  //   const [login, setLogin] = useState('');
  //   const [password, setPassword] = useState('');
  //   const [name, setName] = useState('');
  //   const [passwordConfirm, setPasswordConfirm] = useState('')
  
  //    const postForm = (event)  =>{
  //     event.preventDefault();
  //     const data = new FormData();
  //     data.append("login", login);
  //     data.append("password", password);
  //     data.append("name", name);

  //     sendForm('register', data);
      
  //   }

  // //   let history = useHistory();

  // //   useEffect(() => {
  // //     if (authState2) {history.push('/user')}
  // // }, [authState2]);
  
  //   return (
  //     <form  onSubmit={postForm} id="register_form">
  //       <div className="register container align-items-center justify-content-center vw-100 vh-100 d-flex">
  //        <div className="col-4">
  //              <h4 className="w-100 text-center">Sign Up</h4>
  //             <hr/>
  //             <label className="form-label">Login</label><br/>
  //              <input type="text" id="username" className="input form-control mb-3" placeholder="asya123"
  //                 value={login} onChange={e => setLogin(e.target.value)}
  //              />
  
  //              <label className="form-label">Full Name</label><br/>
  //              <input type="text" id="name" className="input form-control mb-3" placeholder="Anastasiia"
  //                 value={name} onChange={e => setName(e.target.value)}
  //              />
  
  //              <label className="form-label">Password</label>
  //              <input type="password" id="password" className="form-control mb-3" value={password} onChange={e => setPassword(e.target.value)} /> 
  
  //              <label  className="form-label">Confirm password</label>
  //              <input type="password" id="confirm_password" className="form-control mb-3" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)}/>
  //              <div className="d-flex justify-content-between align-items-center">
  //                  <h6>Already a member? <Link to="/login" className="">Log in</Link></h6>
  //                  <button type="submit" className="btn btn-outline-danger" disabled={password !== passwordConfirm || password.length < 3 || login.length < 3} onClick={() => console.log(login, password)}>
  //                  Sign Up
  //                  </button>
  //              </div>
  //          </div>
  //      </div>
  //     </form>
  //   )  
  // }

  // export const CRegisterForm = connect(state => ({ authState2: state.auth?.token }))(RegisterForm)