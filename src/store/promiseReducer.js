import { actionAuthLogin } from "./authReducer";
import { store } from "./store";


export function promiseReducer(state={}, {type, name, status, payload, error}) {
    if (type === 'PROMISE'){
        return {
            ...state,
            [name]:{status, payload, error}
        }
    }
    return state
}

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
            // if (data.data){
            //     return Object.values(data.data)[0] 
            // } 
            // else {throw new Error(JSON.stringify(data.errors))}
            
        })
  
    

    const gql = getGQL(backendURL);

export const actionAllPlaylists = () =>
    actionPromise('allPlaylists', gql('/playlists'))


export const actionUsersPlaylists = (id) =>
    actionPromise('usersPlaylists', gql('/profile/' + id + '/playlists'))


export const actionPlaylistById = (_id) => 
  actionPromise('plstById', gql('/playlists/'+_id))


 export const actionFullLogin = async function(login, password) {
    let token = await gql("query userLogin($login: String, $password: String) {login(login: $login, password: $password)}", 
    {"login": login, "password": password});

    store.dispatch(actionAuthLogin(token));
};


// export const actionCreateOrder = () => async (dispatch) => {
//     let orderGoods = [];
//     Object.entries(store.getState().cart).map(([_id,{count}])=>orderGoods.push({"count":count,"good":{_id:_id}}))
//     actionPromise('createOrder',gql(`mutation newOrder($order:OrderInput) {
//             OrderUpsert(order:$order) {
//               _id total
//             }
//           }`,{order:{orderGoods}}));
//          await store.dispatch(actionCartClean());
//     }