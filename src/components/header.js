import logo from '../images/musicico.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import {connect}   from 'react-redux';
import { actionAuthLogout } from '../store/authReducer';
import React from 'react';




export const Header = ({children}) => 
<header id="header">
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom">
    <div className="container flex justify-content-between ">
    
        <div className='d-flex align-items-center justify-content-center' >
        <a href="/allplaylists" className="navbar-brand" ><img className='logo' src={logo} alt='logo'/>Music</a>
        </div>

        <div className="d-flex">

            <div className="d-flex align-items-center" id="navbarSupportedContent">
                <a href="/allplaylists" className="navbar-brand nav-link active" aria-current="page" >To all playlists</a>
            </div>
            <div className="d-flex align-items-center" id="navbarSupportedContent">
                <a href="/user" className="navbar-brand nav-link active" aria-current="page" >Home</a>
            </div>
            <input className="form-control me-2 " type="search" placeholder="Search" aria-label="Search"/>
        
        </div>
            <CLogout/>
        
    </div>
  </nav>
  {children}
</header>

const ImgLogout = () => {
    return <FontAwesomeIcon icon={faArrowRightFromBracket} className='fa-2x'/>  
}

const CLogout = connect(state => ({children: <ImgLogout/>}), 
                                              {onClick: actionAuthLogout})('button')