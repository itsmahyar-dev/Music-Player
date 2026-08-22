const musicContainer = document.querySelector(".music-container");

const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");

const progressContainer = document.getElementById("progress-container");

const progress = document.getElementById("progress");

const title = document.getElementById("title");
const cover = document.getElementById("cover");

const currTime = document.getElementById("currTime");
const durTime = document.getElementById("durTime");

const songs = ["milad", "parvardegara", "ArbabeVafa"];

let songIndex = 2;

/* =========================
   LOAD SONG
========================= */

loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerHTML = song;

  audio.src = `music/${song}.mp3`;

  cover.src = "image/19e87e1a040fcef7a71dedfc69bebe83.400x400x1.jpg";

  currTime.innerHTML = "00:00";
  durTime.innerHTML = "00:00";

  progress.style.width = "0%";
}

/* =========================
   PLAY
========================= */

function playSong() {
  musicContainer.classList.add("play");

  const icon = playBtn.querySelector("i");

  icon.classList.remove("fa-play");
  icon.classList.add("fa-pause");

  audio.play();
}

/* =========================
   PAUSE
========================= */

function pauseSong() {
  musicContainer.classList.remove("play");

  const icon = playBtn.querySelector("i");

  icon.classList.remove("fa-pause");
  icon.classList.add("fa-play");

  audio.pause();
}

/* =========================
   PREVIOUS
========================= */

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

/* =========================
   NEXT
========================= */

function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

/* =========================
   UPDATE PROGRESS
========================= */

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;

  if (!Number.isFinite(duration) || duration <= 0) {
    progress.style.width = "0%";
    return;
  }

  const progressPercent = (currentTime / duration) * 100;

  progress.style.width = `${progressPercent}%`;
}

/* =========================
   SET PROGRESS
========================= */

function setProgress(e) {
  const width = this.clientWidth;

  const clickX = e.offsetX;

  const duration = audio.duration;

  if (!Number.isFinite(duration) || duration <= 0) {
    return;
  }

  audio.currentTime = (clickX / width) * duration;
}

/* =========================
   FORMAT TIME
========================= */

function formatTime(time) {
  if (!Number.isFinite(time) || time < 0) {
    return "00:00";
  }

  const minutes = Math.floor(time / 60);

  const seconds = Math.floor(time % 60);

  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

  return `${formattedMinutes}:${formattedSeconds}`;
}

/* =========================
   UPDATE TIME
========================= */

function updateTime(e) {
  const { duration, currentTime } = e.srcElement;

  if (!Number.isFinite(duration)) {
    currTime.innerHTML = "00:00";
    durTime.innerHTML = "00:00";

    return;
  }

  currTime.innerHTML = formatTime(currentTime);

  durTime.innerHTML = formatTime(duration);
}

/* =========================
   PLAY / PAUSE BUTTON
========================= */

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

/* =========================
   BUTTONS
========================= */

prevBtn.addEventListener("click", prevSong);

nextBtn.addEventListener("click", nextSong);

/* =========================
   AUDIO EVENTS
========================= */

audio.addEventListener("timeupdate", updateProgress);

audio.addEventListener("timeupdate", updateTime);

audio.addEventListener("loadedmetadata", updateTime);

audio.addEventListener("ended", nextSong);

/* =========================
   PROGRESS CLICK
========================= */

progressContainer.addEventListener("click", setProgress);
