import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Start from './start/Start.jsx';
import Edit from './edit/Edit.jsx';
import Run from './run/Run.jsx';

require('./../scss/main.scss');

const uuidv4 = require('uuid/v4');

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			view: "edit",
			timers: [],
			times: [],
			run: false,
			activeTimer: {}
		};
		this.timerInterval = 0;
	}

	editTimes = (newTimes) => {
		this.setState({ times: newTimes })
	}

	editTimersList = (newTimers) => {
		this.setState({ timers: this.state.timers.push(newTimers) })
	}

	updateState() {
		let activeTimer = this.state.activeTimer;
		let times = this.state.times;

		if (activeTimer.seconds === 0 && activeTimer.minutes === 0) {
			// switch timer or stop it if it's the last timer
			let i = 0;
			let len = times.length;

			while (i < len) {
				if (i === len - 1) {
					this.setState({ run: false });
				} else if (times[i].id === activeTimer.id) {
					activeTimer = times[i + 1];
					i = len;
				}
				i++;
			}
		} else if (activeTimer.seconds < 1) {
			activeTimer.minutes -= 1;
			activeTimer.seconds = 59;
		} else {
			activeTimer.seconds -= 1;
		}

		this.setState({
			times,
			activeTimer
		});
	}

	startInterval() {
		this.timerInterval = setInterval(() => {
			this.updateState();
		}, 1000);
	}

	handleStart = (event) => {
		event.preventDefault();
		let activeTimer = this.state.activeTimer;
		const times = this.state.times;

		function isEmpty(obj) {
			for (let x in obj) { return false; }
			return true;
		}

		//set new active timer
		if (isEmpty(activeTimer)) {
			if (times.length > 0) {
				activeTimer = times[0];

			}
		}

		this.setState({
			run: true,
			activeTimer
		});
	}


	handleStop = (event) => {
		event.preventDefault();
		this.setState({
			run: false
		});
	}

	changeView = (view) => {
		this.setState({ view });
	}


	renderView(view) {
		switch (this.state.view) {
			case "start":
				return(
					<Start
						changeView={this.changeView}
						timers={this.state.timers}
					/>
				)
				break;

			case "edit":
				return(
					<Edit
						times={this.state.times}
						run={this.state.run}
						editTimes={this.editTimes}
						changeView={this.changeView}
					/>
				)
				break;

			case "run":
				return (
					<Run
						times={this.state.times}
						run={this.state.run}
						handleStart={this.handleStart}
						handleStop={this.handleStop}
						changeView={this.changeView}
					/>
				)
				break;

			default:
				return(<div>view error</div>)

		}
	}


	render() {
		if (this.state.run === false) {
			clearInterval(this.timerInterval);
			this.timerInterval = 0;
		} else if (this.timerInterval === 0){
			this.startInterval();
		}

		return(
			<div className="view">{this.renderView(this.state.view)}</div>
		)
	}
}

document.addEventListener('DOMContentLoaded', function(){
	ReactDOM.render(
		<App />,
		document.getElementById('app')
	);
});
