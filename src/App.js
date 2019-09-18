import React from 'react';
import logo from './logo.svg';
import './App.css';

const boardSize = 20;

// -------------SQUARE-------------
function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

// -------------BOARD-------------
class Board extends React.Component
{
  constructor(props){
    super(props);
    this.state = {
      squares: Array(boardSize * boardSize).fill(null),
      xIsNext: true,
      currentClick: null,
    }
  }

  restartGame()
  {
    this.setState({
      squares: Array(boardSize * boardSize).fill(null),
      xIsNext: true,
      currentClick: null,
    });
  }

  handleClick(i)
  {
    const squares = this.state.squares.slice();
    if (calculateWinner(this.state.currentClick, this.state.squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      currentClick: i,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.currentClick, this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    const board = [];

    for (var i = 0; i < boardSize; i++)
    {
      let row = [];
      for (var j = 0; j < boardSize; j++)
      {
        row.push(this.renderSquare(i * boardSize + j))
      }
      board.push(
        <div className="board-row">
          {row}
        </div>
      )
    }

    return (
      <div>
      <div>
        <button
          className="resetButton"
          onClick={this.restartGame.bind(this)}
        >
        <strong>Restart the game</strong>
        </button>
      </div>
      <div className="board">
        <div className="status">{status}</div>
        {board}
      </div>
      </div>
    );
  }
}

// -------------GAME-------------
class Game extends React.Component
{
  render()
  {
    return (
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to <strong>Tic-Tac-Toe</strong> Vietnamese version!
          </p>
        </header>

        <body className="App-body">
          <div className="line"></div>
          <div>
            <strong>RULE: </strong>
            Who hits 5 without being block at the 2 ends first is the WINNER!
          </div>
          <Board />
        </body>

      </div>
    );
  }
}

//----------------------------------------------------

export default Game;

//----------------------------------------------------

// Caculate who is the winner
function calculateWinner(currentSquare, squares)
{
  if (horizontalLine(currentSquare, squares))
  {
    return horizontalLine(currentSquare, squares);
  }
  else if (verticalLine(currentSquare, squares))
  {
    return verticalLine(currentSquare, squares);
  }
  else if (slashLine(currentSquare, squares))
  {
    return slashLine(currentSquare, squares);
  }
  else if (backSlashLine(currentSquare, squares))
  {
    return backSlashLine(currentSquare, squares);
  }
  else {
    return false;
  }
}

// Horizontal line (left + right)
function horizontalLine(currentSquare, squares)
{
  const lines = [
    [squares[currentSquare], squares[currentSquare + 1],
      squares[currentSquare + 2], squares[currentSquare + 3],
      squares[currentSquare + 4], squares[currentSquare + 5]],
    [squares[currentSquare], squares[currentSquare - 1],
      squares[currentSquare - 2], squares[currentSquare - 3],
      squares[currentSquare - 4], squares[currentSquare - 5]]
  ]

  for (let i = 0; i < lines.length; i++)
  {
    const [a, b, c, d, e, f] = lines[i];
    if (a
      && a === b
      && a === c
      && a === d
      && a === e
      && (a === f || f === null))
      {
        return a;
      }
  }
  return false;
}

// Vertical line (up + down)
function verticalLine(currentSquare, squares)
{
  const lines = [
    [squares[currentSquare], squares[currentSquare + boardSize],
      squares[currentSquare + boardSize * 2], squares[currentSquare + boardSize * 3],
      squares[currentSquare + boardSize * 4], squares[currentSquare + boardSize * 5]],
    [squares[currentSquare], squares[currentSquare - boardSize],
      squares[currentSquare - boardSize * 2], squares[currentSquare - boardSize * 3],
      squares[currentSquare - boardSize * 4], squares[currentSquare - boardSize * 5]]
  ]

  for (let i = 0; i < lines.length; i++)
  {
    const [a, b, c, d, e, f] = lines[i];
    if (a
      && a === b
      && a === c
      && a === d
      && a === e
      && (a === f || f === null))
      {
        return a;
      }
  }
  return false;
}

// Slash line
function slashLine(currentSquare, squares)
{
  const lines = [
    [squares[currentSquare], squares[currentSquare + boardSize + 1],
      squares[currentSquare + (boardSize * 2) + 2], squares[currentSquare + (boardSize * 3) + 3],
      squares[currentSquare + (boardSize * 4) + 4], squares[currentSquare + (boardSize * 5) + 5]],
    [squares[currentSquare], squares[currentSquare - boardSize - 1],
      squares[currentSquare - (boardSize * 2) - 2], squares[currentSquare - (boardSize * 3) - 3],
      squares[currentSquare - (boardSize * 4) - 4], squares[currentSquare - (boardSize * 5) - 5]]
  ]

  for (let i = 0; i < lines.length; i++)
  {
    const [a, b, c, d, e, f] = lines[i];
    if (a
      && a === b
      && a === c
      && a === d
      && a === e
      && (a === f || f === null))
      {
        return a;
      }
  }
  return false;
}

// Backslash line
function backSlashLine(currentSquare, squares)
{
  const lines = [
    [squares[currentSquare], squares[currentSquare + boardSize - 1],
      squares[currentSquare + (boardSize * 2) - 2], squares[currentSquare + (boardSize * 3) - 3],
      squares[currentSquare + (boardSize * 4) - 4], squares[currentSquare + (boardSize * 5) - 5]],
    [squares[currentSquare], squares[currentSquare - boardSize + 1],
      squares[currentSquare - (boardSize * 2) + 2], squares[currentSquare - (boardSize * 3) + 3],
      squares[currentSquare - (boardSize * 4) + 4], squares[currentSquare - (boardSize * 5) + 5]]
  ]

  for (let i = 0; i < lines.length; i++)
  {
    const [a, b, c, d, e, f] = lines[i];
    if (a
      && a === b
      && a === c
      && a === d
      && a === e
      && (a === f || f === null))
      {
        return a;
      }
  }
  return false;
}
