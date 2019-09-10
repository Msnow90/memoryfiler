import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Dropzone from 'react-dropzone';

import { addNode } from '../../reducers/nodes';
import { nodeError, serverError } from '../../reducers/errors';


class ChildMemoryForm extends Component {

	constructor() {
		super();

		this.state = {
			uploadDisabled: true,
			titleText: '',
			descriptionText: '',
			index: 0
		}

		this.onDrop = this.onDrop.bind(this);
		this.titleChange = this.titleChange.bind(this);
		this.descriptionChange = this.descriptionChange.bind(this);
		this.indexChange = this.indexChange.bind(this);
	}

	titleChange(elem) {

		var title = elem.target.value;

		if (title !== '') this.setState({ uploadDisabled: false, titleText: title })

		else this.setState({ uploadDisabled: true })
	}

	descriptionChange(elem) {

		this.setState({
			descriptionText: elem.target.value
		})
	}

	indexChange(elem) {

		this.setState({
			index: elem.target.value
		})
	}

	onDrop(files) {

		// create proper formdata type to send image, append image file to formdata as memimg property (same as input name prop)
		var form = new FormData();
		form.append('memory-image', files[0]);
		form.append('title', this.state.titleText);
		form.append('description', this.state.descriptionText);
		form.append('index', this.state.index)
		form.append('nodeLeft', this.props.nodeLeft);
		form.append('nodeTop', this.props.nodeTop)
		form.append('memoryId', this.props.memory._id)
		form.append('token', localStorage.getItem('token'));

		axios.post('/api/nodes/childmemory', form)
			.then(result => {
				if (result.data && result.data.err)
					return this.props.nodeError(result.data.err)
				this.props.addNode(result.data)
			})
			.then(() => $('#nodeCreationModal').modal('hide'))
			.catch(err => this.props.serverError(err));


		//this.props.createMemoryLocation(form);
	}


	render() {

		return (

			<div className="container memoryform-container">
				<form>
					<div className="form-group">
						<label>* Input a title before uploading image!</label>
						<input
							onChange={this.titleChange}
							type="text"
							name="title"
							className="form-control"
							id="exampleFormControlInput1"
							placeholder="Title of Memory Location..."
						/>
					</div>

					<div className="form-group">
						<label>Description</label>
						<textarea onChange={this.descriptionChange} className="form-control" name="description" id="exampleFormControlTextarea1" rows="3"></textarea>
					</div>

					<div className="form-group">
						<label>Memory Peg Order</label>
						<input onChange={this.indexChange} required type="number" className="form-control" name="index" placeholder="*Enter the order number here*" />
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
		memory: state.memorylocations.displayedMemory
	}
}

const mapDispatchToProps = (dispatch) => {

	return {

		addNode: (node) => {
			dispatch(addNode(node));
		},

		nodeError: (err) => {
			dispatch(nodeError(err));
		},

		serverError: (err) => {
			dispatch(serverError(err));
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(ChildMemoryForm); 