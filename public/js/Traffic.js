class Traffic {
  constructor(road, player) {
    // Setting up the parameters of constructor and initial properties for the instance
    this.road = road;
    this.trafficY = getRandomInt(-134, -1200);
    this.trafficLane = Math.floor(Math.random() * 3);
    this.player = player;
    this.road.style.animation = "animatedRoad 1s linear infinite";
    this.speed = 7;
    this.trafficHeight = TRAFFIC_HEIGHT;
    this.trafficWidth = TRAFFIC_WIDTH;
    this.laneWidth = LANE_WIDTH;
    this.laneOffsetY = LANE_OFFSET_Y;

    // Method to handle the traffic spawn i.e. the distance and the lane
    this.handleTrafficSpawn = () => {
      if (trafficArray.length > 0) {
        for (let i = 0; i < trafficArray.length; i++) {
          if (this != trafficArray[i]) {
            let distance = Math.abs(trafficArray[i].trafficY - this.trafficY);
            if (
              trafficArray[i].trafficLane === this.trafficLane &&
              distance < 135
            ) {
              // Generating random lane and Y position until the condition is true
              this.trafficLane = Math.floor(Math.random() * 3);
              this.trafficY = getRandomInt(-500, -1300);

              distance = Math.abs(trafficArray[i].trafficY - this.trafficY);
              i = -1;
            } else if (distance < 135) {
              this.trafficY = getRandomInt(-500, -1300);
              distance = Math.abs(trafficArray[i].trafficY - this.trafficY);
              i = -1;
            }
          }
        }
      }
    };

    // Method to create traffic
    this.createTraffic = () => {
      this.traffic = document.createElement("div");
      this.traffic.style.position = "absolute";
      this.traffic.style.height = `${this.trafficHeight}px`;
      this.traffic.style.width = `${this.trafficWidth}px`;
      this.traffic.style.top = `-${this.trafficY}px`;
      this.traffic.style.backgroundImage = `url("./images/traffic.png")`;
      this.traffic.style.backgroundSize = "cover";
      this.traffic.style.backgroundRepeat = "no-repeat";
      this.traffic.style.left = `${
        this.laneWidth * this.trafficLane + this.laneOffsetY
      }px`;
      this.road.appendChild(this.traffic);
    };

    // Method to identify the player collision with the traffic
    this.checkCollision = () => {
      if (
        this.player.currentPosition === this.trafficLane &&
        this.trafficY + parseInt(this.traffic.style.height) >
          this.road.clientHeight - parseInt(this.traffic.style.height)
      ) {
        collided = true;
      }
    };

    // Method to move the traffic vertically
    this.moveTraffic = (moveInterval) => {
      this.trafficY += this.speed;
      this.traffic.style.top = `${this.trafficY}px`;
      this.traffic.style.left = `${
        this.laneWidth * this.trafficLane + this.laneOffsetY
      }px`;
      scoreContainer.innerHTML = `Score: ${score}`;
      gameOverScore.innerHTML = `Score: ${score}`;

      // Randomizing the values and regenerating the traffic back to the top of container
      if (this.trafficY > this.road.clientHeight) {
        this.trafficY = getRandomInt(-134, -1000);
        this.trafficLane = Math.floor(Math.random() * 3);
        this.handleTrafficSpawn();
        score++;
      }

      this.updateSpeed();
      this.checkCollision();
      // If block to terminate the game on true collision condition
      if (collided) {
        this.road.style.animation = "none";
        gameOver.style.display = "block";
        // Iterating through the children of this.road and removing it
        for (let i = 0; i < this.road.children.length; i++) {
          this.road.removeChild(this.road.children[i]);
        }
        // Clearing interval on collision
        clearInterval(moveInterval);
      }
    };

    // Updating speed by fixed value on achieving high score
    this.updateSpeed = () => {
      if (score === 20) {
        this.speed = 9;
        this.road.style.animation = "animatedRoad 0.95s linear infinite";
      }
      if (score === 40) {
        this.speed = 12;
        this.road.style.animation = "animatedRoad 0.9s linear infinite";
      }
    };
  }
}
