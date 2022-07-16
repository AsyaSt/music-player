import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState, useEffect} from 'react';
import {faVolumeDown, faVolumeUp, faRandom, faStepBackward, faStopCircle, faStepForward, faPlayCircle, faRepeat} from '@fortawesome/free-solid-svg-icons'
import { store } from '../store/store';
import {actionPlayerRandom, actionFullPlay, actionFullPause, actionFullSetVolume, actionPrevTrack, actionNextTrack, actionSetRepeat, actionSetRandom} from '../store/playerReducer';
import {Provider, connect}   from 'react-redux';
import { audio } from './Tracks';
import img_album from '../images/default_album.gif'

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

export let NowPlayingPlayer = (props) => {
    const [volume, setVolume] = useState(20);
    const [newCurrent, setNewCurrent] = useState(0)

    useEffect(() => {
        if (props.currentTime) audio.currentTime = newCurrent
    }, [newCurrent]);
    
    let album_photo = (props.track?.album?.photo) ? `http://player-api/storage/albums/${props.track?.album?.photo}` : img_album 

return(
<div className="player">
    <div className="wrapper">
        <div className="details">
            <div className="now-playing"></div>
            <div className="track-art" style={{backgroundImage:`url(${album_photo})`}} ></div>
            <div className="track-name">{props.track?.name|| 'Track Name'  }</div>
            <div className="now-playing">{props.track?.id3?.artist || 'Artist'  }</div>
        </div>

        <div className="slider-container duration">
            <span className="current-time">{props.currentTime ? 
            `0${((props.currentTime - props.currentTime % 60) / 60 % 60).toFixed() !== 'NaN' ? 
            ((props.currentTime - props.currentTime % 60) / 60 % 60).toFixed() : '0'}:${(props.currentTime % 60).toFixed() > 9 ?
             '' : '0'}${(props.currentTime % 60).toFixed() !== 'NaN' ? (props.currentTime % 60).toFixed() : '0'}` : '--:--'}
             </span>

            <input type='range' min={0} max={props.duration} className="seek-slider" 
            value={props.currentTime || 0} onChange={(e) => setNewCurrent(e.target.value)}
             onMouseUp={() => store.dispatch(actionFullPlay())} onMouseDown={() => store.dispatch(actionFullPause())}
            />

            <span className="total-duration">{props.track?.id3?.time || (msToTime(props.duration) !== 'NaN:NaN'? msToTime(props.duration) : '00:00')}</span>
            
        </div>

        <div className="slider-container">
        <FontAwesomeIcon icon={faVolumeDown} />
            <input type='range' min={1} max='99' value={volume} className="volume-slider"
            onChange={(e) => {
                setVolume(e.target.value);
                if (store.getState()?.player?.track) store.dispatch(actionFullSetVolume(volume)) }}

             />
            <FontAwesomeIcon icon={faVolumeUp} />  
        </div>

        <div className="buttons">
            <div className="random-track" 
             onClick={() => {
                props.random === 1 ? store.dispatch(actionSetRandom(2)) : store.dispatch(actionSetRandom(1))
                store.dispatch(actionPlayerRandom());
             }}
            >
                <FontAwesomeIcon icon={faRandom} className={props.random === 1 ? 'fa-2x' : 'fa-3x'}/>
            </div>
            <div className="prev-track" 
                onClick={ () => store.dispatch(actionPrevTrack(props.track))}
            > 
                <FontAwesomeIcon icon={faStepBackward} className='fa-2x'/>
                
            </div>
            <div className="play-track" 
              onClick={() => {
                if(store.getState()?.player?.isPlaying === true) {
                    store.dispatch(actionFullPause());
                 } else{
                    store.dispatch(actionFullPlay());
                 } 
                }}
            >
                <FontAwesomeIcon icon={(!props.isPlaying) ? faPlayCircle : faStopCircle} className='fa-5x' />
            </div>
            <div className="next-track"
              onClick={() => {
                store.dispatch(actionNextTrack({track: props.track, end:'false'}));
                }
              }
             >
                <FontAwesomeIcon icon={faStepForward} className='fa-2x'/>
            </div>
            <div className="random-track" 
             onClick={() => (props.repeat === 1 ? store.dispatch(actionSetRepeat(2)) : store.dispatch(actionSetRepeat(1)))}
            >
                <FontAwesomeIcon icon={faRepeat} className={props.repeat === 1 ? 'fa-2x' : 'fa-3x'}/>
            </div>

        </div>
        
    </div>
</div>)
}

  export const СNowPlayingPlayer = connect(state => ({track: state.player?.track || [], 
    duration: state.player?.duration || '00:00',
    isPlaying: state.player?.isPlaying || false,
    currentTime: state.player?.currentTime || '00:00',
    repeat: state.player?.repeat || 1,
    random: state.player?.random || 1}) )(NowPlayingPlayer);