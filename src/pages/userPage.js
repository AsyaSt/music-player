import { store } from "../store/store";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import image from '../images/card.png';
import {
    faAlignCenter,
    faCompactDisc,
    faHeadphonesSimple} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { actionUsersPlaylists } from "../store/actions/actions_Promise";
import { UsersPlaylistsAll } from "../components/userPlaylistsAll";


export const UserPage = ({user, playlists}) => {

    useEffect(() => {
        store.dispatch(actionUsersPlaylists(store.getState().auth?.user?.id));
    }, []);

    return (
    <>
        <div className='d-flex  w-100'>
            <div className='me-4 playlist-img-box rounded-5' 
                style={{backgroundImage: `url(${user?.avatar || image})`, backgroundSize: "cover", 
                backgroundRepeat: "no-repeat", backgroundPosition: "center"}}>
            </div>
            <div className='w-100'>
                <div className="d-flex flex-column justify-content-between h-100">
                    <div className="w-100 row">
                            <p className='h4 m-0'>{store.getState().auth?.user?.name}</p>

                            <Link to={'/editprofile'} className="mb-3" >Edit Profile</Link>

                            <p className='text-white-50 mb-2'><FontAwesomeIcon className='me-2' icon={faHeadphonesSimple} /> 100 Tracks</p>
                            <p className='text-white-50 mb-2'><FontAwesomeIcon className='me-2' icon={faCompactDisc} /> 8 PLaylists</p>
                            <p className='text-white-50 mb-2'><FontAwesomeIcon className='me-2' icon={faAlignCenter} />
                                {store.getState().auth?.user?.description !== 'null' ?
                                    store.getState().auth?.user?.description :
                                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquid amet animi aspernatur facere iste nisi omnis optio, vel vitae? Accusantium assumenda autem cumque ducimus eum ipsa, maiores pariatur repudiandae?" 
                                }
                            </p>
                    </div>
                </div>
            </div>
        </div>
        <UsersPlaylistsAll playlists={playlists}/>
    </>
    )
}
    
export const CUserPage = connect(state => ({user: state.auth?.user || {},
    playlists: state.promise?.usersPlaylists?.payload?.playlists|| []} ) )(UserPage);