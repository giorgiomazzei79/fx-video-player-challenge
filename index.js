"use strict";

// document.addEventListener('DOMContentLoaded', initPlayer);
let video;
let player;

async function initPlayer() {
  try {
    await loadShaka();

    let manifestUri;

    manifestUri =
      "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd";
    shakaInitPlayer(manifestUri);
  } catch (e) {
    alert(e);
  }
}

// set up basic functionality
function loadPlayer() {
  if (!player) {
    initPlayer();
  } else {
    alert("Player already loaded");
  }
}

function pausePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function moveTime(time) {
  if (video) {
    let newTime = video.currentTime + time;

    if (newTime > video.duration) {
      newTime = video.duration;
    } else if (newTime < 0) {
      newTime = 0;
    }

    video.currentTime = newTime;
  }
}

function destroyPlayer() {
  player.destroy();
  player = null;

  // reset subtitles
  document.querySelector(".video-container__subtitles").innerText = "";
  document
    .querySelector(".video-container__subtitle-tracks")
    .classList.add("hide");
  document.querySelector(".video-container__subtitle-tracks").innerHTML = "";
}

// set up handlers
const loadBtn = document.getElementById("load-btn");
const playPauseBtn = document.querySelector(".playPause-btn");
const rewindBtn = document.querySelector(".rewind-btn");
const ffBtn = document.querySelector(".ff-btn");
const destroyBtn = document.getElementById("destroy-btn");

loadBtn.addEventListener("click", () => {
  loadPlayer();
});

playPauseBtn.addEventListener("click", () => {
  pausePlay();
});

destroyBtn.addEventListener("click", () => {
  destroyPlayer();
});

rewindBtn.addEventListener("click", () => {
  moveTime(-5);
});

ffBtn.addEventListener("click", () => {
  moveTime(5);
});
