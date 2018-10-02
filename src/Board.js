import React, { Component } from 'react'
import axios from 'axios'
import Tile from './Tile.js'
class Board extends Component {
	constructor(props) {
		super(props)
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
			state: 'new',
			mines: 10,
			timeElapsed: 0
		}
	}
	selectGame = event => this.setState({ difficulty: event.target.value })
	loadNewGame = () => {
		this.restartTimer()
		axios
			.post('https://minesweeper-api.herokuapp.com/games', {
				difficulty: this.state.difficulty
			})
			.then(response => {
				this.setState(response.data)
			})
	}
	check = (row, column) => {
		if (this.state.id === 0) {
			return
		}
		if (this.state.state === 'lost') {
			return
		}
		axios
			.post(
				`https://minesweeper-api.herokuapp.com/games/${this.state.id}/check`,
				{ row: row, col: column }
			)
			.then(response => {
				this.setState(response.data)
				if (response.data.state === 'won' || response.data.state === 'lost') {
					this.stopTimer()
				}
			})
	}
	flag = (row, column) => {
		if (this.state.id === 0) {
			return
		}
		axios
			.post(
				`https://minesweeper-api.herokuapp.com/games/${this.state.id}/flag`,
				{ row: row, col: column }
			)
			.then(response => {
				this.setState(response.data)

				if (response.data.state === 'won' || response.data.state === 'lost') {
					this.stopTimer()
				}
			})
	}
	getSeconds = () => {
		return ('0' + (this.state.timeElapsed % 60)).slice(-2)
	}
	getMinutes = () => {
		return Math.floor(this.state.timeElapsed / 60)
	}

	stopTimer = () => {
		if (this.state.timer) {
			clearInterval(this.state.timer)
			this.setState({ timer: null })
		}
	}
	restartTimer = () => {
		this.stopTimer()
		let timer = setInterval(() => {
			this.setState({
				timeElapsed: this.state.timeElapsed + 1
			})
		}, 1000)
		this.setState({ timeElapsed: 0, timer: timer })
	}

	gameMessage = () => {
		if (
			this.state.state === 'playing' ||
			(this.state.state === 'new' && this.state.id != '0')
		) {
			return <h4>💣: {this.state.mines}</h4>
		}
		if (this.state.state === 'won') {
			return <h4>YOU WON</h4>
		}
		if (this.state.state === 'lost') {
			return <h4>YOU LOST</h4>
		} else {
			return <h4>Start New Game</h4>
		}
	}
	render() {
		let board = this.state.board.map((row, rowIndex) => {
			return (
				<tr key={rowIndex}>
					{row.map((value, columnIndex) => {
						return (
							<Tile
								key={columnIndex}
								value={value}
								row={rowIndex}
								column={columnIndex}
								check={this.check}
								flag={this.flag}
							/>
						)
					})}
				</tr>
			)
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
							<button onClick={this.loadNewGame}>
								{this.state.state === 'lost' ? '🤬' : '🙂'}
							</button>
							<div>{this.gameMessage()} </div>
							<h4>
								⌚: {this.getMinutes()}:{this.getSeconds()}
							</h4>
						</th>
					</tr>
				</thead>
				<tbody>{board}</tbody>
			</table>
		)
	}
}
export default Board
