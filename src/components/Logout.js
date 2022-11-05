import { connect } from "react-redux"
import { actionAuthLogout } from "../store/actions/actions_Auth"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons'

const ImgLogout = () => {
    return <><FontAwesomeIcon icon={faArrowRightFromBracket} className="me-2"/>Logout</>
}

export const CLogout = connect(state => ({children: <ImgLogout/>}), 
                                              {onClick: actionAuthLogout})('a')