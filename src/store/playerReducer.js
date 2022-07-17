import { store } from '../store/store';
import { audio } from '../components/Tracks';

export const playerReducer = function(state = {}, {type, duration, track, playlist, currentTime, volume,  repeat=1, random=1}) {
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
            playlist
        }
    } if (type === 'SET_REPEAT'){
        return {
            ...state,
            repeat
        }
    } if (type === 'SET_RANDOM') {
        return {
            ...state,
            random
        }
    }
    return state;
}


const actionPlay = () => ({type:'PLAY'})
    export const actionFullPlay = () =>
        dispatch => {  
            audio.play();
            dispatch(actionPlay());
            audio.onloadedmetadata = (() => dispatch(actionFullGetDuration(audio.duration)));
            audio.ontimeupdate = () =>  dispatch(actionFullSetCurrentTime(audio.currentTime));
            actionFullSetCurrentTime(audio.currentTime);
            actionSetRepeat(1);
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
            console.log(track)
            audio.src = `http://player-api/storage/tracks/${track?.file}`;
            dispatch(actionSetTrack(track));
            dispatch(actionFullPlay());
        }

const actionGetDuration = (duration) => ({type:'GET_DURATION', duration})
    export const actionFullGetDuration = (duration) =>
        dispatch => {
            dispatch(actionGetDuration(duration));
        }

const actionSetCurrentTime = (currentTime) => ({type:'SET_CURRENT_TIME', currentTime})
    export const actionFullSetCurrentTime = (currentTime) =>
        dispatch => {
            const playlist = store.getState().player?.playlist;
            const track = store.getState().player?.track;
            const count = playlist.indexOf(track);
            dispatch(actionSetCurrentTime(currentTime));
            audio.onended = ()  => dispatch(actionNextTrack({track:playlist[count], end:'true'}));
        }


const actionSetPlaylist = (playlist) => ({type:'SET_PLAYLIST', playlist})
    export const actionFullSetPlaylist = (playlist) =>
        dispatch => {
            dispatch(actionSetPlaylist(playlist));
        }



export const actionNextTrack = (track) =>
    async (dispatch) => {
        const playlist = store.getState().player?.playlist;
        const repeat = await store.getState().player?.repeat;
        
        if (playlist) {
            const count = playlist.indexOf(track.track);
            if (track.end === 'true' && repeat === 2) {
                setTimeout(() => { dispatch(actionFullSetTrack(playlist[count]));
                dispatch(actionFullPlay()) }, 100)
            }
            else if (repeat !== 2 && count === (playlist.length - 1)) {
                setTimeout(() => { dispatch(actionFullSetTrack(playlist[0])); dispatch(actionFullPlay()) }, 100)
            }
            else {
                if (count + 1 < playlist.length) {
                    dispatch(actionFullSetTrack(playlist[count + 1]))
                    dispatch(actionFullPlay())
                }
            }
        }
    }

    export const actionPrevTrack = (track) =>
    async (dispatch, getState) => {
        const playlist = getState().player?.playlist
        if (playlist) {
            const count = playlist.indexOf(track)
            if (count > 0) {
                dispatch(actionFullSetTrack(playlist[count - 1]))
                dispatch(actionFullPlay())
            }
        }
    }

export const actionSetRepeat = (repeat) => ({ type: 'SET_REPEAT', repeat});
export const actionSetRandom = (random) => ({ type: 'SET_RANDOM', random});


export const actionPlayerRandom = () =>
    async (dispatch, getState) => {
        if (getState().player?.playlist) {
            let newPlaylist = [...getState().player.playlist];
            let currentIndex = newPlaylist.length
            while (currentIndex !== 0) {
                let randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [newPlaylist[currentIndex], newPlaylist[randomIndex]] = [newPlaylist[randomIndex], newPlaylist[currentIndex]];
            }
            const currentTrackIndex = newPlaylist.indexOf(getState().player?.track);
            const currentTrack = newPlaylist.splice(currentTrackIndex, 1)
            newPlaylist = [currentTrack[0], ...newPlaylist]
            dispatch(actionSetPlaylist([
                ...newPlaylist
            ]))
            
        }
    }

export const actionAddTrackToQueue = (track) => 
    async (dispatch, getState) => {
        if (getState().player?.playlist) {
            let newPlaylist = [...getState().player.playlist, track];
            console.log(newPlaylist);
            dispatch(actionSetPlaylist([...newPlaylist]))
            
        }
    }

export const actionAddPlaylistToQueue = (tracks) => 
    async (dispatch, getState) => {
        if (getState().player?.playlist) {
            let newPlaylist = [...getState().player.playlist, ...tracks];
            dispatch(actionSetPlaylist([...newPlaylist])) 
        }
}

export const actionRemoveTrackFromQueue = (track) => 
    async (dispatch, getState) => {
        let newPlaylist = getState().player.playlist.filter((oneTrack) => oneTrack !== track)
        dispatch(actionSetPlaylist([...newPlaylist])) 
    }
    