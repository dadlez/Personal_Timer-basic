import React from 'react';
import StartHeader from './StartHeader.jsx';

class Start extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timers: this.props.timers
		}
	}

	renderList() {
		if (this.state.timers.length != 0) {
			return(
				<ul>
					{this.state.timers.map(timer => {
						return(
							<li>{timer.name}</li>
						)
					})}
				</ul>
			)
		} else {
			return(
				<div>Create a timer first</div>
			)
		}
	}

	render() {
		return (
			<div className="start">
				<StartHeader />
				<hr />
				{this.renderList()}
				<hr />
				<button
					className="btn btn-primary"
					onClick={() => this.props.changeView("edit")}
					>Create a timer
				</button>
			</div>
		)
	}
}

export default Start;
