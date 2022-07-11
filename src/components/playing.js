import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState, useEffect} from 'react';
import {faVolumeDown, faVolumeUp, faRandom, faStepBackward, faStopCircle, faStepForward, faPlayCircle, faRepeat} from '@fortawesome/free-solid-svg-icons'
import { store } from '../store/store';
import { actionFullSetTrack, actionFullPlay, actionFullPause, actionFullSetVolume, actionFullSetCurrentTime } from '../store/playerReducer';
import {Provider, connect}   from 'react-redux';

export let NowPlayingPlayer = (track, duration) => {
    const [volume, setVolume] = useState(10);
    const [play, setPlay] = useState(false);

return(
<div className="player">
    <div className="wrapper">
        <div className="details">
            <div className="now-playing"></div>
            <div className="track-art"></div>
            <div className="track-name">{store.getState()?.player?.track?.name|| 'Track Name'  }</div>
            <div className="now-playing">{store.getState()?.player?.track?.id3?.artist || 'Artist'  }</div>
        </div>

        <div className="slider-container duration">
            <span className="current-time">00:00</span>
            <input type='range' min={1} max='100' value='0' className="seek-slider" 
            // onChange={(e) => setVolume(e.target.value)}

            />
            <span className="total-duration">{store.getState()?.player?.duration || '00:00'}</span>
            
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
                    setPlay(true)
                 } else{
                    store.dispatch(actionFullPlay());
                    setPlay(false)
                 } 
                }}
            >
                <FontAwesomeIcon icon={(play) ? faPlayCircle : faStopCircle} className='fa-5x' />
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

export const СNowPlayingPlayer = connect(state => ({track: state.player?.track || [], duration: state.player?.duration}), )(NowPlayingPlayer);