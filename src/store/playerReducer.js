//import { store } from '../store/store';
import { audio } from '../components/playlistById';

export const playerReducer = function(state = {}, {type, duration, track, playlist, playlistIndex, currentTime, volume}) {
    if (!state) {
        return {};
    }
    if (type === 'PLAY'){
        return {
            ...state, 
            isPlaying: true,
            isStopped: false
        }
    } if (type === "PAUSE"){
        return {
            ...state,
            isStopped: true,
            isPlaying: false
        }
    } if (type === 'GET_DURATION') {
        return {
            ...state,
            duration
        }
    } if (type === 'SET_CURRENT_TIME') {
        return {
            ...state,
            currentTime
        }
    } if (type === 'SET_VOLUME') {
        return {
            ...state,
            volume
        }
    } if (type === 'SET_TRACK' || type === 'SET_NEW_TRACK' || type === "SET_PREV_TRACK") {
        return {
            ...state,
            track,
            isPlaying: true,
            isStopped: false
        }
    } if (type === 'SET_PLAYLIST') {
        return {
            ...state,
            playlist,
            playlistIndex
        }
    }
    return state;
}


const actionPlay = () => ({type:'PLAY'})
export const actionFullPlay = () =>
    dispatch => {  
        audio.play();
        dispatch(actionPlay());
        dispatch(actionFullGetDuration(msToTime(audio.duration)))
    }


// let audio = new Audio();
// const actionPlay = () => ({type:'PLAY'})
// export const actionFullPlay = () =>
//     dispatch => {  
//         audio.play();
//         dispatch(actionPlay());
//         dispatch(actionFullGetDuration(msToTime(audio.duration)))
//     }

function msToTime(duration) {
    let hours,minutes,seconds;
    hours = Math.floor(duration / 3600);
    minutes = Math.floor((duration - 3600 * hours) / 60);
    seconds = Math.floor((duration - 3600 * hours - 60 * minutes) % 60);
    
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    
    return minutes + ":" + seconds;
    }


const actionPause = () => ({type:'PAUSE'})
export const actionFullPause = () =>
    dispatch => {
        audio.pause();
        dispatch(actionPause());
    }

const actionSetVolume = (volume) => ({type:'SET_VOLUME', volume})
export const actionFullSetVolume = (volume) =>
    dispatch => {
        audio.volume = volume / 100;
        dispatch(actionSetVolume(volume));
    }

const actionSetTrack = (track) => ({type:'SET_TRACK', track})
export const actionFullSetTrack = (track) =>
    dispatch => {
        //audio.src = `http://player-api/storage/tracks/${track.file}`;
        dispatch(actionSetTrack(track));
        dispatch(actionFullPlay());
        dispatch(actionFullGetDuration(msToTime(audio.duration)));  
    }

const actionGetDuration = (duration) => ({type:'GET_DURATION', duration})
export const actionFullGetDuration = (duration) =>
    dispatch => {
        dispatch(actionGetDuration(duration));
    }

const actionSetCurrentTime = (currentTime) => ({type:'SET_CURRENT_TIME', currentTime})
export const actionFullSetCurrentTime = (currentTime) =>
    dispatch => {
        dispatch(actionSetCurrentTime(currentTime));
    }


const actionSetPlaylist = (playlist) => ({type:'SET_PLAYLIST', playlist})
export const actionFullSetPlaylist = (playlist) =>
    dispatch => {
        dispatch(actionSetPlaylist(playlist));
    }