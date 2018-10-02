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
            mines: 10,
            timeElapsed: 0
        };
    }
    selectGame = event => this.setState({ difficulty: event.target.value})
    loadNewGame = event => {
        this.stopTimer()
        this.setState({timeElapsed:0})
        this.startTimer()
        axios
            .post('https://minesweeper-api.herokuapp.com/games', 
                {difficulty: this.state.difficulty}
            )
            .then(response => {
                this.setState(response.data);
            }); 
       
       
    };
    check = (row, column) => {
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
            });
    }
    flag = (row, column) => {
        if(this.state.id === 0) {
            return
        }
        axios
            .post(`https://minesweeper-api.herokuapp.com/games/${this.state.id}/flag`, 
                {row: row, col: column}
            )
            .then(response => {
                this.setState(response.data);
            });
    }
    getSeconds = () => {
        return ('0' + this.state.timeElapsed % 60).slice(-2);
    }
    getMinutes = () => {
        return Math.floor(this.state.timeElapsed / 60);
    }
    startTimer = event => {
        console.log('started')
        
        this.time = setInterval( () => {this.setState({timeElapsed:(this.state.timeElapsed + 1)
        });
    }, 1000)
        
    }
    stopTimer = event => {
        console.log('stopped')
        clearInterval(this.time)
    }
    clearTimer = event => {
        console.log('clear')
        this.setState(this.timeElapsed: 0)


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
            this.stopTimer()

            return (
                <h4>
                    YOU WON
                </h4>
            )
            
        }
        if (this.state.state === 'lost') {
            this.stopTimer()
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
                        <tr className="display">
                            <th className="top" colSpan={this.state.board[0].length}>
                                <select value={this.state.difficulty} onChange={this.selectGame}>
                                    <option value="0">EASY (8x8)</option>
                                    <option value="1">MEDIUM (16x16)</option>
                                    <option value="2">HARD (24x24)</option>
                                </select>
                                <button onClick={this.loadNewGame}>{this.state.state === 'lost' ? '🤬' : '🙂'}</button>
                                <div>{this.gameMessage()} </div>
                                <h4>⌚: {this.getMinutes()}:{this.getSeconds()}</h4>
                            </th> 
                        </tr>
                    </thead>
                    <tbody>
                        {board}
                    </tbody>
                    <thead>
                        <tr>
                            
                        </tr>
                    </thead>
                </table>               
        )}
}
export default Board;