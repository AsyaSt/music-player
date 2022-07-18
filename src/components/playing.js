import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState, useEffect} from 'react';
import {faVolumeDown, faVolumeUp, faRandom, faStepBackward, faStopCircle, faStepForward, faPlayCircle, faRepeat} from '@fortawesome/free-solid-svg-icons'
import { store } from '../store/store';
import {actionPlayerRandom, actionFullPlay, actionFullPause, actionFullSetVolume, actionPrevTrack, actionNextTrack, actionSetRepeat, actionSetRandom} from '../store/playerReducer';
import {connect}   from 'react-redux';
import { audio } from './Tracks';
import img_album from '../images/default_album.gif';
import {Nav, Tab, Tabs} from "react-bootstrap";
import { CTrackList } from './tracklist';

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
    
    let album_photo = props.track?.album?.photo || img_album;
    const [key, setKey] = useState('home');
    return(
        <div className="player col-xxl-3 col-lg-5 ps-3">
            <div className="wrapper ">
                <Tabs
                    id="fill-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    fill className="mb-3"
                >
                    <Tab className="text-white bg-dark" tabClassName="text-white bg-dark" eventKey="home" title="Player">
                        <div className="flex-column justify-content-center align-items-center d-flex">
                            <div className="details w-100">
                                <div className="now-playing"></div>
                                <div className="track-art" style={{backgroundImage:`url(${album_photo})`}} ></div>
                                <div className="track-name w-100 text-center">
                                    <div className='line w-75'>
                                        <div className='second w-100'>
                                            <span className="w-100">
                                            {props.track?.name|| 'Track Name'  }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="now-playing">{props.track?.id3?.artist || 'Artist'  }</div>
                            </div>
        
                            <div className="slider-container duration w-100 mb-3">
        
                                <div className="d-flex align-items-end justify-content-between">
                                    <div className="slider-container d-flex flex-column w-75 pe-2" >
                                        <div className="d-flex justify-content-between">
                                            <span className="text-secondary">{props.currentTime ?
                                                `0${((props.currentTime - props.currentTime % 60) / 60 % 60).toFixed() !== 'NaN' ?
                                                    ((props.currentTime - props.currentTime % 60) / 60 % 60).toFixed() : '0'}:${(props.currentTime % 60).toFixed() > 9 ?
                                                    '' : '0'}${(props.currentTime % 60).toFixed() !== 'NaN' ? (props.currentTime % 60).toFixed() : '0'}` : '--:--'}
                                            </span>
                                            <span className="text-secondary">{props.track?.id3?.time || (msToTime(props.duration) !== 'NaN:NaN'? msToTime(props.duration) : '00:00')}</span>
                                        </div>
                                        <input type='range' min={0} max={props.duration} className="seek-slider w-100 cursor-pointer"
                                               value={props.currentTime || 0} onChange={(e) => setNewCurrent(e.target.value)}
                                               onMouseUp={() => store.dispatch(actionFullPlay())} onMouseDown={() => store.dispatch(actionFullPause())}/>
                                    </div>
        
                                    <div className="slider-container d-flex flex-column w-25" >
                                        <div className="d-flex justify-content-between">
                                            <FontAwesomeIcon icon={faVolumeDown} className="text-secondary"/><FontAwesomeIcon icon={faVolumeUp} className="text-secondary"/>
                                        </div>
        
                                        <input type='range' min={1} max='99' value={volume} className="volume-slider cursor-pointer"
                                               onChange={(e) => {
                                                   setVolume(e.target.value);
                                                   if (store.getState()?.player?.track) store.dispatch(actionFullSetVolume(volume)) }}/>
                                    </div>
                                </div>
        
                            </div>
        
                            <div className="buttons">
                                <div className="random-track">
                                    <FontAwesomeIcon icon={faRandom} className={props.random === 1 ? 'fa-1x text-white-50 cursor-pointer' : 'fa-1x text-primary cursor-pointer'}
                                         onClick={() => {
                                             props.random === 1 ? store.dispatch(actionSetRandom(2)) : store.dispatch(actionSetRandom(1))
                                             store.dispatch(actionPlayerRandom());
                                         }}/>
                                </div>
                                <div className="prev-track">
                                    <FontAwesomeIcon icon={faStepBackward} className='fa-2x cursor-pointer'
                                                     onClick={ () => store.dispatch(actionPrevTrack(props.track))}/>
        
                                </div>
                                <div className="play-track">
                                    <FontAwesomeIcon icon={(!props.isPlaying) ? faPlayCircle : faStopCircle} className='fa-4x cursor-pointer'
                                         onClick={() => {
                                             if(store.getState()?.player?.isPlaying === true) {
                                                 store.dispatch(actionFullPause());
                                             } else{
                                                 store.dispatch(actionFullPlay());
                                             }
                                         }}/>
                                </div>
                                <div className="next-track">
                                    <FontAwesomeIcon icon={faStepForward} className='fa-2x cursor-pointer' onClick={() => {
                                        store.dispatch(actionNextTrack({track: props.track, end:'false'}));
                                    }}/>
                                </div>
                                <div className="random-track">
                                    <FontAwesomeIcon icon={faRepeat} className={props.repeat === 1 ? 'fa-1x text-white-50 cursor-pointer' : 'fa-1x text-primary cursor-pointer'}
                                                     onClick={() => (props.repeat === 1 ? store.dispatch(actionSetRepeat(2)) : store.dispatch(actionSetRepeat(1)))}/>
                                </div>
        
                            </div>
                        </div>
        
                    </Tab>
                    <Tab className="text-white bg-dark playing-list" tabClassName="text-white bg-dark playing-list"  eventKey="profile" title="Queue">
                        {store.getState().player?.playlist && <CTrackList/>}
                    </Tab>
                </Tabs>
        
                
            </div>
        </div>)
}

  export const СNowPlayingPlayer = connect(state => ({track: state.player?.track || [], 
    duration: state.player?.duration || '00:00',
    isPlaying: state.player?.isPlaying || false,
    currentTime: state.player?.currentTime || '00:00',
    repeat: state.player?.repeat || 1,
    random: state.player?.random || 1}) )(NowPlayingPlayer);