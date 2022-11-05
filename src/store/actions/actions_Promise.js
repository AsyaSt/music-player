import { store } from "../store"
import { actionAuthLogin } from "./actions_Auth"

const actionPending   =       name      => ({type:'PROMISE',name, status: 'PENDING'})
const actionFulfilled =  (name,payload) => ({type:'PROMISE',name, status: 'FULFILLED', payload})
const actionRejected  =   (name,error)  => ({type:'PROMISE',name, status: 'REJECTED', error})

export const actionPromise   = (name, promise) =>
    async dispatch => {
        dispatch(actionPending(name))
        try {
            let payload = await promise
            dispatch(actionFulfilled(name, payload))
            return payload
        }
        catch(error){
            dispatch(actionRejected(name, error))
        }
    }

    export const backendURL = 'http://player-api/api';

const getGQL = (backendURL) =>
    (plusurl) => fetch(backendURL+plusurl, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            ...(localStorage.authToken ? {"Authorization": "Bearer " + localStorage.authToken} : {})
        }
    }).then(res => res.json())
        .then(data => {
            return data;            
        })
  

export const gql = getGQL(backendURL);

export const actionAllPlaylists = () =>
    actionPromise('allPlaylists', gql('/playlists'))


export const actionUsersPlaylists = (id) =>
    actionPromise('usersPlaylists', gql('/profile/' + id + '/playlists'))


export const actionPlaylistById = (_id) => {
    let link = (((window.location.href.split('/')[3] === 'artists' || window.location.href.split('/')[3]) === 'albums') ? 'albums' : 'playlists');
    return (actionPromise('plstById', gql('/'+link+'/'+_id)))
}

  export const actionNowPlaylist = (_id) => 
  actionPromise('plstnow', gql('/playlists/'+_id))


 export const actionFullLogin = async function(login, password) {
    let token = await gql("query userLogin($login: String, $password: String) {login(login: $login, password: $password)}", 
    {"login": login, "password": password});

    store.dispatch(actionAuthLogin(token));
};

export const actionArtistById = (_id) => 
actionPromise('artistById', gql('/artists/'+_id))


export const actionSearch = (search) => 
actionPromise('searchResult', gql('/search?search='+search))