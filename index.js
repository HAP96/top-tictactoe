const cellElements = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const board = document.getElementById('board');
const btn = document.getElementById('restart');

const gameBoard = (() => {
  const playerFactory = (name, marker, turn) => {
    return { name, marker, turn };
  };

  const player1 = playerFactory('player1', 'x', true);
  const player2 = playerFactory('player2', 'circle', false);

  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const startGame = () => {
    cellElements.forEach((cell) => {
      cell.classList.remove(player1.marker);
      cell.classList.remove(player2.marker);
      cell.addEventListener('click', handleClick);
    });
    HoverClass();
    message.classList.remove('show');
  };

  const HoverClass = () => {
    board.classList.remove(player1.marker);
    board.classList.remove(player2.marker);
    if (player1.turn) {
      board.classList.add(player1.marker);
    } else {
      board.classList.add(player2.marker);
    }
  };

  const handleClick = (e) => {
    const cell = e.target;
    const currentClass = player2.turn ? player2.marker : player1.marker;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
      endGame(false);
    } else if (isDraw()) {
      endGame(true);
    } else {
      swapTurns();
      HoverClass();
    }
  };

  const swapTurns = () => {
    player1.turn = !player1.turn;
    player2.turn = !player2.turn;
  };

  function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
  }

  function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some((combination) => {
      return combination.every((index) => {
        return cellElements[index].classList.contains(currentClass);
      });
    });
  }

  function endGame(draw) {
    const text = document.getElementById('text');
    if (draw) {
      text.innerText = 'Draw!';
    } else {
      text.innerText = `${player2.turn ? "O's" : "X's"} Win!`;
    }
    message.classList.add('show');
  }

  function isDraw() {
    return [...cellElements].every((cell) => {
      return (
        cell.classList.contains(player1.marker) ||
        cell.classList.contains(player2.marker)
      );
    });
  }

  return {
    startGame,
  };
})();

gameBoard.startGame();
btn.onclick = gameBoard.startGame;
