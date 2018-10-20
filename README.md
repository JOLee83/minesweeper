<h1 style={text-align: 'center'}>Mine Sweeper</h1>
<img style={margin:'0' 'auto'} src=./public/minesweeper.png>

<p style={margin:'0' '20%'}>This was the first major project from my first week of learning <a href="https://reactjs.org/">React.js</a> at SDG. The project involved the use of an <a href="https://minesweeper-api.herokuapp.com/
">API</a> for the games logic. See the game for yourself on <a href="http://mine-sweeper-justin.surge.sh/">Surge</a>. I am proud that I figured out the timer function on my own, at the time of writing this I believe I'm the only one in the cohort to do so. I used a two year old Youtube tutorial for a stop watch to figure out the code.</p>
<p>Here is the code for the timers logic.</p>
    
    `getSeconds = () => {
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
    }`
