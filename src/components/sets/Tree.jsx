import React, { Component } from 'react';
import Timer from './Timer.jsx';
import Loop from './../sets/Loop.jsx';

const uuidv4 = require('uuid/v4');

class Tree extends Component {

	renderElement(times) {
		let result = times.map(e => {
			const type = e.type;

			if (type.includes("loop")) {
				return(
					<li key={uuidv4()}>
						<Loop
							id={e.id}
							reps={e.reps}
							content={e.content.length != 0 ? this.renderElement(e.content) : null}
							edit={this.props.edit}
							times={this.props.times}
							editTimes={this.props.editTimes}
						/>
					</li>
				)
			} else {
				return (
					<li key={uuidv4()}>
						<Timer
							id={e.id}
							minutes={e.minutes}
							seconds={e.seconds}
							edit={this.props.edit}
							times={this.props.times}
							editTimes={this.props.editTimes}
						/>
					</li>
				)
			}
		})
		return result;
	}

	render() {
		if (this.props.times.length === 0) {
			return <p>Don't want to train??? Add a timer and GO!</p>
		}

		return(
			<ul className="tree">
				{this.renderElement(this.props.times).map(e => {
					return e;
				})}
			</ul>
		)
	}
}

export default Tree;
