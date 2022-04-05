const video = document.getElementById("video");
const range = document.getElementById("range");
const playBtn = document.getElementById("play-btn");
const stopBtn = document.getElementById("stop-btn");
let isVideoPlaying = false;
let timer = document.getElementById("timer");

initPlayer();

playBtn.addEventListener("click", () => {
  if (isVideoPlaying) {
    isVideoPlaying = false;
    video.play();
    toggleButton();
    updateRange();
  } else {
    isVideoPlaying = true;
    video.pause();
    toggleButton();
    updateRange();
  }
});

stopBtn.addEventListener("click", () => {
  video.pause();
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
  playBtn.className = isVideoPlaying ? "chair" : "pause_circle";
}

function updateTimer() {
  timer.innerText = range.value;
}

range.addEventListener("change", () => {
  video.currentTime = range.value;
  updateTimer();
});
