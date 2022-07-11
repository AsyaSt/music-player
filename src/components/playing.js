import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState, useEffect} from 'react';
import {faVolumeDown, faVolumeUp, faRandom, faStepBackward, faStopCircle, faStepForward, faPlayCircle, faRepeat} from '@fortawesome/free-solid-svg-icons'
import { store } from '../store/store';
import {actionFullGetDuration, actionFullSetTrack, actionFullPlay, actionFullPause, actionFullSetVolume, actionFullSetCurrentTime } from '../store/playerReducer';
import {Provider, connect}   from 'react-redux';

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
    const [volume, setVolume] = useState(10);
    // let duration;

    // useEffect(() => {
    //     if (!store.getState().player?.duration) {
    //         duration = msToTime(store.getState()?.player?.track?.src?.duration)
    //     }
    // }, []);

return(
<div className="player">
    <div className="wrapper">
        <div className="details">
            <div className="now-playing"></div>
            <div className="track-art"></div>
            <div className="track-name">{props.track?.name|| 'Track Name'  }</div>
            <div className="now-playing">{props.track?.id3?.artist || 'Artist'  }</div>
        </div>

        <div className="slider-container duration">
            <span className="current-time">00:00</span>
            <input type='range' min={1} max='100' value='0' className="seek-slider" 
            // onChange={(e) => setDuration(e.target.value)}

            />
            <span className="total-duration">{msToTime(props.duration) !== 'NaN'? msToTime(props.duration) : '00:00'}</span>
            
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
            // onClick={randomTrack()}
            >
                <FontAwesomeIcon icon={faRandom} className='fa-2x'/>
            </div>
            <div className="random-track" 
            // onClick={prevTrack()}
            >
                <FontAwesomeIcon icon={faStepBackward} className='fa-2x'/>
                
            </div>
            <div className="random-track" 
              onClick={() => {
                if(store.getState()?.player?.isPlaying === true) {
                    store.dispatch(actionFullPause());
                    //setPlay(true)
                 } else{
                    store.dispatch(actionFullPlay());
                    //setPlay(false)
                 } 
                }}
            >
                <FontAwesomeIcon icon={(!props.isPlaying) ? faPlayCircle : faStopCircle} className='fa-5x' />
            </div>
            <div className="next-track"
            //  onClick={nextTrack()}
             >
                <FontAwesomeIcon icon={faStepForward} className='fa-2x'/>
            </div>
            <div className="random-track" 
            // onClick={repeatTrack()}
            >
                <FontAwesomeIcon icon={faRepeat} className='fa-2x'/>
            </div>

        </div>
        
    </div>
</div>)
}
function mapStateToProps (state) {
    return {
        track: state.player?.track,
        duration: state.player?.duration,
        
    }
  }
  //export const СNowPlayingPlayer = connect(mapStateToProps)(NowPlayingPlayer)
  export const СNowPlayingPlayer = connect(state => ({track: state.player?.track || [], duration: state.player?.duration || [], isPlaying: state.player?.isPlaying || false}) )(NowPlayingPlayer);