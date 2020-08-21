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
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        xIsNext: true, //set initial state to a boolean value of true, so X moves fisrt by default
      };
    }

    handleClick(i){
      const squares = this.state.squares.slice();
      squares[i] = this.state.xIsNext ? 'X' : 'O'; //if this.state.xIsNext is true 'X' if false 'O'
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext, //Swap state of xIsNext
      });
    }

    renderSquare(i) {
      return (
        <Square 
          value={this.state.squares[i]} //Passing a value as a prop to the Square component
          onClick={() => this.handleClick(i)} //Passing a function as a prop to the Square component
          />
      );
    }
  
    render() {
      const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
  
      return (
        <div>
          <div className="status">{status}</div>
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
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  