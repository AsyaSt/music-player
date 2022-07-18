import logo from '../images/musicico.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRightFromBracket, faCompactDisc, faUserEdit} from '@fortawesome/free-solid-svg-icons'
import {connect}   from 'react-redux';
import { actionAuthLogout } from '../store/authReducer';
import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Nav, Navbar, NavDropdown, ContainerProps, Image} from "react-bootstrap";
import image from "../images/card.png";
import {store} from "../store/store";




export const Header = ({children}) => 
<header id="header">
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="border-bottom">
        <Container>
            <Navbar.Brand className="">
                <Link to={'/allplaylists'} className="text-decoration-none text-white d-flex align-items-center">
                <img className='logo' src={"https://cdn0.iconfinder.com/data/icons/internet-2020/1080/Applemusicandroid-512.png"} alt='logo'/>
                    Music
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Link to={'/user'} className="nav-link">Home</Link>
                    <Link to={'/allplaylists'} className="nav-link">Playlists</Link>
                    <Link to={'/search'} className="nav-link">Search</Link>
                    {/*<Nav.Link href="/allplaylists">Albums</Nav.Link>*/}
                    {/*<Nav.Link href="/allplaylists">Artists</Nav.Link>*/}
                </Nav>
                <Nav className="d-flex align-items-center">
                    {/*<Link to={"/user"} className="nav-link me-2">{store.getState().auth.user?.name}</Link>*/}
                    <NavDropdown className="me-2" title={store.getState().auth.user?.name} id="collasible-nav-dropdown">
                        <NavDropdown.Item className="px-0">
                            <Link to={'/user'}><FontAwesomeIcon icon={faCompactDisc} className="me-2"/>My playlists</Link>
                        </NavDropdown.Item>

                        <NavDropdown.Item className="px-0">
                            <Link to={'/editprofile'}><FontAwesomeIcon icon={faUserEdit} className="me-2"/>Edit profile</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item className="px-0">
                            <CLogout/>
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Link to={"/user"}>
                        <Image className="nav-avatar rounded-circle" src={store.getState().auth.user?.avatar}></Image>
                    </Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  {children}
</header>

const ImgLogout = () => {
    return <><FontAwesomeIcon icon={faArrowRightFromBracket} className="me-2"/>Logout</>
}

const CLogout = connect(state => ({children: <ImgLogout/>}), 
                                              {onClick: actionAuthLogout})('a')