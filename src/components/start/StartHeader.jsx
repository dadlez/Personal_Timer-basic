import React from 'react';

class Header extends React.Component {
	render() {
		return (
			<header>
				<div className="logo">
					<img src='http://phocusapp.com/img/icon-timer.png' alt="timer_logo" />
				</div>
				<div className="viewTitle">
					<p>Choose a timer:</p>
				</div>
			</header>
		)
	}
}

export default Header;
