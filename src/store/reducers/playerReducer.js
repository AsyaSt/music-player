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


