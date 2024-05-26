<template>
    <div class="minesweeper">
      <h1>MineSweeper Game</h1>
      <div class="status-bar">
        <div>Remaining Mines: {{ remainingMines }}</div>
        <div>
          <button @click="toggleFlagMode">
            {{ flagMode ? "Switch to Normal Mode" : "Switch to Flag Mode" }}
          </button>
        </div>
      </div>
      <div id="game-board">
        <div 
          v-for="(cell, index) in board" 
          :key="index"
          :class="['cell', { revealed: cell.revealed, mine: cell.revealed && cell.mine, flag: cell.flag }]"
          @click="handleCellClick(cell)"
          @contextmenu.prevent="handleRightClick(cell)">
          <span v-if="cell.flag">🚩</span>
          <span v-else-if="cell.revealed && !cell.mine">{{ cell.adjacentMines || '' }}</span>
        </div>
      </div>
      <button v-if="gameOver" @click="restartGame">Restart Game</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        rows: 10,
        cols: 10,
        minesCount: 20,
        board: [],
        minePositions: [],
        gameOver: false,
        flagMode: false,
        flagsCount: 0
      };
    },
    computed: {
      remainingMines() {
        return this.minesCount - this.flagsCount;
      }
    },
    created() {
      this.initializeGame();
    },
    methods: {
      initializeGame() {
        this.board = Array.from({ length: this.rows * this.cols }, (_, index) => ({
          id: index,
          row: Math.floor(index / this.cols),
          col: index % this.cols,
          revealed: false,
          mine: false,
          flag: false,
          adjacentMines: 0
        }));
        this.placeMines();
        this.calculateAdjacentMines();
        this.gameOver = false;
        this.flagsCount = 0;
        this.flagMode = false;
      },
      placeMines() {
        let minesPlaced = 0;
        while (minesPlaced < this.minesCount) {
          const index = Math.floor(Math.random() * this.board.length);
          if (!this.board[index].mine) {
            this.board[index].mine = true;
            minesPlaced++;
          }
        }
      },
      calculateAdjacentMines() {
        this.board.forEach(cell => {
          if (!cell.mine) {
            cell.adjacentMines = this.countMinesAround(cell.row, cell.col);
          }
        });
      },
      countMinesAround(row, col) {
        let count = 0;
        for (let r = -1; r <= 1; r++) {
          for (let c = -1; c <= 1; c++) {
            if (r === 0 && c === 0) continue;
            const newRow = row + r;
            const newCol = col + c;
            if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols) {
              const index = newRow * this.cols + newCol;
              if (this.board[index].mine) {
                count++;
              }
            }
          }
        }
        return count;
      },
      handleCellClick(cell) {
        if (this.gameOver || cell.revealed) return;
  
        if (this.flagMode) {
          this.toggleFlag(cell);
        } else {
          if (cell.flag) return;
          if (cell.mine) {
            this.revealMines();
            alert('Game Over!');
            this.gameOver = true;
          } else {
            this.revealCell(cell);
          }
        }
      },
      handleRightClick(cell) {
        if (this.gameOver || cell.revealed) return;
        this.toggleFlag(cell);
      },
      toggleFlag(cell) {
        cell.flag = !cell.flag;
        this.flagsCount += cell.flag ? 1 : -1;
  
        if (cell.flag && !cell.mine) {
          this.revealMines();
          alert('Game Over!');
          this.gameOver = true;
        }
      },
      revealCell(cell) {
        cell.revealed = true;
        if (cell.adjacentMines === 0) {
          this.revealEmptyCells(cell.row, cell.col);
        }
      },
      revealEmptyCells(row, col) {
        const cellsToCheck = [{ row, col }];
        while (cellsToCheck.length > 0) {
          const { row: r, col: c } = cellsToCheck.pop();
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              if (dr === 0 && dc === 0) continue;
              const newRow = r + dr;
              const newCol = c + dc;
              if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols) {
                const index = newRow * this.cols + newCol;
                const adjacentCell = this.board[index];
                if (!adjacentCell.revealed && !adjacentCell.flag) {
                  adjacentCell.revealed = true;
                  if (adjacentCell.adjacentMines === 0) {
                    cellsToCheck.push({ row: newRow, col: newCol });
                  }
                }
              }
            }
          }
        }
      },
      revealMines() {
        this.board.forEach(cell => {
          if (cell.mine) {
            cell.revealed = true;
          }
        });
      },
      restartGame() {
        this.initializeGame();
      },
      toggleFlagMode() {
        this.flagMode = !this.flagMode;
      }
    }
  };
  </script>
  
  <style scoped>
  .minesweeper {
    text-align: center;
    font-family: 'Comic Sans MS', cursive, sans-serif;
    background-color: #f3f4f6;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
  
  h1 {
    color: #333;
    font-size: 2em;
    margin-bottom: 20px;
  }
  
  .status-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    width: 100%;
    max-width: 400px;
  }
  
  .status-bar div {
    font-size: 1.2em;
  }
  
  button {
    background-color: #ffcccb;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #ffa07a;
  }
  
  #game-board {
    display: grid;
    grid-template-columns: repeat(10, 30px);
    grid-gap: 2px;
    margin: 0 auto;
  }
  
  .cell {
    width: 30px;
    height: 30px;
    border: 2px solid #ddd;
    line-height: 30px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    background-color: #e0e0e0; /* 기본 셀 색상 */
    border-radius: 5px;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  
  .cell:hover {
    background-color: #dcdcdc;
    transform: scale(1.1);
  }
  
  .cell.revealed {
    background-color: #fafafa; /* 공개된 셀 색상 */
    cursor: default;
  }
  
  .cell.mine {
    background-color: #ff6b6b; /* 지뢰 색상 */
  }
  
  .cell.flag {
    background-color: #ffeb3b; /* 깃발 색상 */
    color: #000;
  }
  
  .cell span {
    font-size: 1.2em;
  }
  </style>
  