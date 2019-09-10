import React, { Component } from 'react';

import './memorydelete.css';

export default class MemoryDeleteModal extends Component {

	constructor(props) {
		super(props);

		this.state = {
			disabled: true
		}

		this.onTypedchange = this.onTypedchange.bind(this);
	}


	onTypedchange(elem) {
		var typedText = elem.target.value;

		if (typedText == this.props.selectedMemory.title) this.setState({ disabled: false });
	}

	render() {

		var memoryTitle = (this.props.selectedMemory) ? this.props.selectedMemory.title : '';

		return (
			<div className="modal fade" id="memoryDeleteModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">Confirm Memory Deletion</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<h5>{ memoryTitle }</h5>
	
							<input type="text" placeholder="Type in title of memory to confirm deletion..." onChange={this.onTypedchange} />
							<br></br>
	
							<button onClick={() => {
								this.props.deleteMemory(this.props.selectedMemory._id, this.props.selectedMemory.imageFilePath);
								this.setState({ disabled: true })
								$('#memoryDeleteModal').modal('hide')
								}} className="btn btn-lg btn-danger" disabled={this.state.disabled}>Delete</button>
						</div>
					</div>
				</div>
			</div>
		)
	}

}