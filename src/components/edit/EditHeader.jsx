import React from 'react';

class EditHeader extends React.Component {
	handleSave(event) {
		event.preventDefault();
	}

	render() {
		return(
			<header>
				<div>My_new_set</div>
				<button
					className="btn btn-primary"
					onClick={this.handleSave(event)}>SAVE</button>
			</header>
		)
	}
}

export default EditHeader;
