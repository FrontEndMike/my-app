import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

  function Square(props){ 
    return( //onClick function is a prop passed in from Board
      <button className="square" onClick={props.onClick}> 
        {props.value} 
      </button>//Prop value also passed in from Board
    )
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square 
          value={this.props.squares[i]} //Passing a value as a prop to the Square component
          onClick={() => this.props.onClick(i)} //Passing a function as a prop to the Square component
          />
      );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    // MOVE HISTORY STATE
    constructor(props) {
      super(props);
      this.state = {
        history: [{ // creates an array of that holds the state of every previous square position
          squares: Array(9).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true, //set initial state to a boolean value of true, so X moves fisrt by default
      };
    }
    // handleClick updates the move history, the current move, updates the state of the squares, 
    // has win condition and swaps turns
    handleClick(i){
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O'; //if this.state.xIsNext is true 'X' if false 'O'
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext, //Swap state of xIsNext
      });
    }

    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);

      const moves = history.map((step, move) => {
        const desc = move ?
        'Go to move #' + move :
        'Go to game start';
        return(
          <li key={move}>  
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });

      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares) {
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  