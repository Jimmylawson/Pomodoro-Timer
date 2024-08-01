const API_Key = "qBS2nG-r2ITEImYGpL-PX0qGM9oNnVf21akRop3RUz0";

const timerEl = document.querySelector(".timer");
const startBtn = document.querySelector(".start-btn");
const stopBtn = document.querySelector(".stop-btn");
const resetBtn = document.querySelector(".reset-btn");

//Generating images from using unsplash API

//fetch the image

async function getImages() {
  try {
    const response = await fetch(
      ` https://api.unsplash.com/photos/random?client_id=${API_Key}`
    );
    const data = await response.json();
    displayImages(data.urls.regular);
  } catch (error) {
    console.log("Error fetching the image: ", error);
  }
}

//display the images
function displayImages(imageUrl) {
  document.body.style.background = `url(${imageUrl}) no-repeat center center / cover`;
}

let interval;
let timeLeft = 1500;

function updateTimer() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  let formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  timerEl.innerHTML = formattedTime;
}

function startFunction() {
  interval = setInterval(() => {
    timeLeft--;
    updateTimer();

    if (timeLeft == 0) {
      clearInterval(interval);
      alert("Time is up!");
      timeLeft = 1500;
    }
  }, 1000);
}

function stopFunction() {
  clearInterval(interval);
}

function resetFunction() {
  clearInterval(interval);
  timeLeft = 1500;
  updateTimer();
}

startBtn.addEventListener("click", startFunction);
stopBtn.addEventListener("click", stopFunction);
resetBtn.addEventListener("click", resetFunction);
getImages();
