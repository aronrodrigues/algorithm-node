const STARTING = -1582;
const TARGET = -13183;
const WALL = 1;
class Maze {
  constructor(board) {
    this.cleanBoard = board;
    this.reset();
  }
  setStartingPoint(y, x) {
    this.board[x][y] = STARTING;
    this.startingPoint.x = x;
    this.startingPoint.y = y;
  }
  setTargetPoint(y, x) {
    this.board[x][y] = TARGET;
    this.targetPoint.x = x;
    this.targetPoint.y = y;
  }
  toString() {
    let value = "";
    for (let x = 0; x < this.board.length; x++) {
      for (let y = 0; y < this.board[x].length; y++) {
        let data = this.board[x][y];
        if (data === STARTING) {
          value += "@ ";
        } else if (data === TARGET) {
          value += "X ";
        } else if (data === WALL) {
          value += "# ";
        } else {
          value += data + " ";
        }
      }
      value += "\n";
    }
    return value;
  }

  reset() {
    this.board = this.cleanBoard;
    this.marker = 2;
    this.startingPoint = { x: -1, y: -1 };
    this.targetPoint = { x: -1, y: -1 };
  }

  run() {
    if (this.startingPoint.x === -1 || this.startingPoint.y === -1) {
      throw new Error("You must set the starting point.");
    }
    if (this.targetPoint.x === -1 || this.targetPoint.y === -1) {
      throw new Error("You must set the target point.");
    }
    if (this.move(this.startingPoint.x, this.startingPoint.y + 1)) {
      console.log("FOUND!");
    } else if (this.move(this.startingPoint.x + 1, this.startingPoint.y)) {
      console.log("FOUND!");
    } else {
      console.log("NOT FOUND");
    }
  }

  move(x, y) {
    console.log(x, y);
    if (this.targetPoint.x === x && this.targetPoint.y === y) {
      return true;
    }
    if (x >= this.board.length || y >= this.board[0].length || this.board[x][y] === WALL) {
      return false;
    }
    this.board[x][y] = this.marker;
    const result = this.move(x + 1, y) || this.move(x, y + 1);
    if (!result && this.board[x][y] >= this.marker) {
      this.marker++;
    }
    return result;
  }
}
module.exports = Maze;
/*
maze = new Maze([
  [0, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 0],
  [0, 1, 0, 1, 0, 1, 1, 0]
]);
maze.setStartingPoint(2, 0);
maze.setTargetPoint(7, 7);
maze.run();

console.log(maze.toString());
*/
