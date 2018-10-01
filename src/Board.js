import React, { Component } from 'react';
import axios from 'axios'
import Tile from './Tile.js'

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            board: [
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '']
            ],
            state: "new",
            mines: 10
        };
    }
    selectGame = event => this.setState({ difficulty: event.target.value})
    loadNewGame = event => {
        axios
            .post('https://minesweeper-api.herokuapp.com/games', 
                {difficulty: this.state.difficulty}
            )
            .then(response => {
                this.setState(response.data);
                console.log(response.data)
            });
    };
    check = (row, column) => {
        console.log("clicked")
        console.log(row)
        console.log(column)
        if(this.state.id === 0) {
            return
        }
        if (this.state.state === 'lost') {
            return
        }
        axios
            .post(`https://minesweeper-api.herokuapp.com/games/${this.state.id}/check`, 
                {row: row, col: column}
            )
            .then(response => {
                this.setState(response.data);
                console.log(response.data)
            });
    }
    flag = (row, column) => {
        console.log("clicked")
        console.log(row)
        console.log(column)
        if(this.state.id === 0) {
            return
        }
        axios
            .post(`https://minesweeper-api.herokuapp.com/games/${this.state.id}/flag`, 
                {row: row, col: column}
            )
            .then(response => {
                this.setState(response.data);
                console.log(response.data)
            });
    }
    gameMessage = () => {
        if (this.state.state === 'playing' || this.state.state === 'new' && this.state.id != '0') {
            return (
                <h4>
                    💣: {this.state.mines}
                </h4>
            )
        }
        if (this.state.state === 'won') {
            return (
                <h4>
                    YOU WON
                </h4>
            )
        }
        if (this.state.state === 'lost') {
            return (
                <h4>
                    YOU LOST
                </h4>
            )
        }
        else {
            return (
                <h4>
                    Start New Game
                </h4>
            )
        }
    }
    render() {
        let board = this.state.board.map((row, rowIndex) => {
            return <tr key={rowIndex}>
            {
                row.map((value, columnIndex) => {
                    return <Tile key={columnIndex} value={value} row={rowIndex} column = {columnIndex} check={this.check} flag={this.flag}/> 
                })
            }
            </tr>
        })
        return (
                <table>
                    <thead>
                        <tr>
                            <th colSpan={this.state.board[0].length}>
                                <select value={this.state.difficulty} onChange={this.selectGame}>
                                    <option value="0">EASY(8x8)</option>
                                    <option value="1">MEDIUM(16x16)</option>
                                    <option value="2">HARD(24x24)</option>
                                </select>
                                <button onClick={this.loadNewGame}>{this.state.state === 'lost' ? '🤬' : '🙂'}</button>
                                <h4>{this.gameMessage()} </h4>
                                
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {board}
                    </tbody>
                </table>               
        )}
}
export default Board;