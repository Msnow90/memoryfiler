import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { createdMemLoc, changeMemoryLocation } from '../../reducers/memorylocations';
import { clearNodes } from '../../reducers/nodes';
import { receivedErr } from '../../reducers/auth';
import { serverError, memoryError } from '../../reducers/errors';

import Dropzone from 'react-dropzone';

import './MemoryCreationForm.css';

class MemoryForm extends Component {

	constructor(props) {
		super(props);

		this.state = {
			uploadDisabled: true,
			titleText: '',
			descriptionText: '',
			titleError: false
		}

		this.onDrop = this.onDrop.bind(this);
		this.titleChange = this.titleChange.bind(this);
		this.descriptionChange = this.descriptionChange.bind(this);
	}

	async onDrop(files) {

		// create proper formdata type to send image, append image file to formdata as memimg property (same as input name prop)
		var form = new FormData();
		form.append('memory-image', files[0]);
		form.append('memory-title', this.state.titleText);
		form.append('memory-description', this.state.descriptionText);
		form.append('token', localStorage.getItem('token'));

		axios.post('/api/memorylocations', form)
			.then(result => {
				if (result.data && result.data.err)
					return this.props.memoryError(result.data.err);
				this.props.createdMemLoc(result.data)
				setTimeout(() => {
					this.props.changeMemoryLocation(this.state.titleText)
				}, 1000)
			})
			.catch(err => this.props.serverError(err))

	}

	async titleChange(elem) {
		var title = elem.target.value;

		// check to make sure title isn't already taken
		if (this.props.memoryListing && this.props.memoryListing.length > 0) {
			var isTitleTaken = this.props.memoryListing.map(memory => {
				return memory.title == title;
			})

			isTitleTaken = isTitleTaken.reduce((a, b) => {
				return a || b;
			})

			if (isTitleTaken) {
				await this.setState({ titleError: true, uploadDisabled: true });
				return false;
			}

			if (!isTitleTaken && this.state.titleError)
				this.setState({ titleError: false, uploadDisabled: false });
		}
		if (title !== '') this.setState({ uploadDisabled: false, titleText: title })

		else this.setState({ uploadDisabled: true })
	}

	descriptionChange(elem) {
		var description = elem.target.value;

		this.setState({
			descriptionText: description
		})
	}

	render() {

		return (

			<div className="container memoryform-container">
				<form>
					<div className="form-group">
						<label>* Input a title name before uploading memory location image!</label>
						<br />
						{
							this.state.titleError && <span className="title-error">That title is already taken!</span>
						}
						<input
							onChange={this.titleChange}
							type="text"
							name="memory-title"
							className="form-control"
							id="exampleFormControlInput1"
							placeholder="Title of Memory Location..."
						/>
					</div>

					<div className="form-group">
						<label>Description</label>
						<textarea onChange={this.descriptionChange} className="form-control" name="memory-description" id="exampleFormControlTextarea1" rows="3"></textarea>
					</div>

					<Dropzone class={`dropzone`} disabled={this.state.uploadDisabled} onDrop={this.onDrop}>
						<p>Drop Image Here, or click to select a file...As soon as file is selected, a memory location will be created</p>
					</Dropzone>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state) => {

	return {
		memoryListing: state.memorylocations.allMemories
	}
}

const mapDispatchToProps = (dispatch) => {
	return {

		createdMemLoc: (memoryLocation) => {
			dispatch(createdMemLoc(memoryLocation));
			dispatch(clearNodes());
		},

		receivedErr: (err) => {
			dispatch(receivedErr(err));
		},

		changeMemoryLocation: (memoryTitle) => {
			dispatch(changeMemoryLocation(memoryTitle))
		},

		serverError: (err) => {
			dispatch(serverError(err));
		},

		memoryError: (err) => {
			dispatch(memoryError(err));
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(MemoryForm);