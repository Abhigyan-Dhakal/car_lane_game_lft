// Selecting the DOM elements
const scoreContainer = document.querySelector(".score-container");
const road = document.querySelector(".road");
const startingScreen = document.querySelector(".starting-screen");
const startBtn = document.querySelector(".start-btn");
const gameOver = document.querySelector(".game-over-container");
const gameOverScore = document.querySelector(".game-over-score");
const gotoMenu = document.querySelector(".goto-menu-btn");

road.style.animation = "none";

//Function to initialize click events for game menu navigations
function init() {
  startBtn.addEventListener("click", () => {
    startingScreen.style.display = "none";
    runGame();
  });

  gotoMenu.addEventListener("click", () => {
    score = 0;
    trafficArray = [];
    collided = false;
    gameOver.style.display = "none";
    startingScreen.style.display = "block";
  });
}

// Function to execute the game by creating game instances
function runGame() {
  player = new Car(road, 3, 0);
  player.createPlayer();
  player.movePlayer();

  // Iterating to create 3 traffic object
  for (let i = 0; i < 3; i++) {
    traffic = new Traffic(road, player);
    traffic.createTraffic();

    trafficArray.push(traffic);
  }

  // Looping in the traffic array and moving the object at specific interval
  trafficArray.forEach((traffic) => {
    traffic.handleTrafficSpawn();
    let moveInterval = setInterval(() => {
      traffic.moveTraffic(moveInterval);
    }, 1000 / 60);
  });
}

init();
