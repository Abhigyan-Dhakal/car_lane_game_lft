class Car {
  constructor(road, lane, currentPosition) {
    // Setting up the parameters of constructor and initial properties for the instance
    this.road = road;
    this.currentPosition = currentPosition;
    this.playerHeight = PLAYER_HEIGHT;
    this.playerWidth = PLAYER_WIDTH;
    this.laneWidth = LANE_WIDTH;
    this.laneOffsetY = LANE_OFFSET_Y;
    this.lane = lane;
    this.distance = this.laneOffsetY * this.currentPosition;

    // Method to create the game player
    this.createPlayer = () => {
      this.player = document.createElement("div");
      this.player.style.position = "absolute";
      this.player.style.height = `${this.playerHeight}px`;
      this.player.style.width = `${this.playerWidth}px`;
      this.player.style.bottom = "0px";
      this.player.style.backgroundImage = `url("./images/player.png")`;
      this.player.style.backgroundSize = "cover";
      this.player.style.backgroundRepeat = "no-repeat";
      this.player.style.left = `${
        this.laneWidth * this.currentPosition + this.laneOffsetY
      }px`;
      this.road.appendChild(this.player);
    };

    // Method to move the player i.e. left & right
    this.movePlayer = () => {
      // Adding event listeners for the keypress and triggering animation function
      document.addEventListener("keypress", (e) => {
        if (e.key === "d" && this.currentPosition != this.lane - 1) {
          this.currentPosition++;
          this.animatePlayer();
        }
        if (e.key === "a" && this.currentPosition != 0) {
          this.currentPosition--;
          this.animatePlayer();
        }
      });
    };

    // Method to animate the player to different lanes
    this.animatePlayer = () => {
      let animate = window.requestAnimationFrame(this.animatePlayer);
      if (this.distance < this.currentPosition * this.laneWidth) {
        this.distance += 8;
      }

      if (this.distance > this.currentPosition * this.laneWidth) {
        this.distance -= 8;
      }

      if (this.distance === this.currentPosition * this.laneWidth) {
        window.cancelAnimationFrame(animate);
      }
      this.player.style.left = `${this.distance + this.laneOffsetY}px`;
    };
  }
}
