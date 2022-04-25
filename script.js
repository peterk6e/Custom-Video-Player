const video = document.getElementById("video");
const range = document.getElementById("range");
const playBtn = document.getElementById("play-btn");
const playBtnIco = document.getElementById("play-btn-ico");
const stopBtn = document.getElementById("stop-btn");
let isVideoPlaying = false;
let timer = document.getElementById("timer");

initPlayer();

playBtn.addEventListener("click", () => {
  if (isVideoPlaying) {
    isVideoPlaying = false;
    video.pause();
    toggleButton();
    updateRange();
  } else {
    isVideoPlaying = true;
    video.play();
    toggleButton();
    updateRange();
  }
});

stopBtn.addEventListener("click", () => {
  range.value = 0;
  video.currentTime = range.value;
  updateTimer();
  video.pause();
  isVideoPlaying = false;
  playBtnIco.innerText = "play_circle";
  playBtnIco.className = "material-icons";
});

function updateRange() {
  if (isVideoPlaying) {
    setInterval(() => {
      range.value = Math.floor(video.currentTime);
      updateTimer();
    }, 1000);
  }
}

function initPlayer() {
  range.setAttribute("min", video.buffered.start(0));
  range.setAttribute("max", video.buffered.end(0));
}

function toggleButton() {
  if (isVideoPlaying) {
    playBtnIco.innerText = "pause_circle";
  } else {
    playBtnIco.innerText = "play_circle";
  }
}

function updateTimer() {
  timer.innerText = convertHMS(range.value);
}

range.addEventListener("change", () => {
  video.currentTime = range.value;
  updateTimer();
});

function convertHMS(value) {
  const sec = parseInt(value, 10); // convert value to number if it's string
  let hours   = Math.floor(sec / 3600); // get hours
  let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
  let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
  // add 0 if value < 10; Example: 2 => 02
  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours+':'+minutes+':'+seconds; // Return is HH : MM : SS
}