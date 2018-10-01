import React, { Component } from 'react';

class Tile extends Component {
    _check = event => {
        this.props.check(this.props.row, this.props.column)
    }
    _flag = event => {
        this.props.flag(this.props.row, this.props.column)
        event.preventDefault() 
    }
    classNames = {
        '*': 'bomb',
        'F': 'flag',
        '@': 'flag',
        '_': 'exposed',
        '1': 'one',
        '2': 'two',
        '3': 'three',
        '4': 'four',
        '5': 'five',
        '6': 'six',
        '7': 'seven',
        '8': 'eight'
    }
    symbols = { '*': '💣', F: '🚩', '@': '🚩', _: ' ' }
    render() {
        return <td className={this.classNames[this.props.value]} onClick={this._check} onContextMenu={this._flag}>
        {this.symbols[this.props.value] || this.props.value}</td>
    }
}
export default Tile;