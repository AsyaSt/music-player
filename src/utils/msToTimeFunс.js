export function msToTime(duration) {
    let hours = Math.floor(duration / 3600);
    let minutes = Math.floor((duration - 3600 * hours) / 60);
    let seconds = Math.floor((duration - 3600 * hours - 60 * minutes) % 60);
    
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    
    return minutes + ":" + seconds;
}