import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

// subcomponents
import NodeDisplayModal from '../modals/nodeDisplayModal';
import NodeCreationContainer from '../NodeCreationContainer/NodeCreationContainer';

import MemoryCreationForm from '../MemoryCreationForm/MemoryCreationForm';
import ImageContainer from '../ImageContainer/ImageContainer';

// actions and thunks
import { changeChildMemory } from '../../reducers/memorylocations';
import { fetchNodes, updateNode, deleteNode, clearNodes } from '../../reducers/nodes';

class MemoryLocationDisplay extends Component {

	constructor(props) {
		super(props);

		this.state = {
			nodeTitle: "",
			nodeDescription: "",
			nodeLinkedMemory: "",
			nodeIndex: "",
			imageFilePath: "",
			nodeId: "",
			environment: ""
		}

		this.displayNodeInfo = this.displayNodeInfo.bind(this);
		this.displayMemoryNodeInfo = this.displayMemoryNodeInfo.bind(this);
		this.changeNodeTitle = this.changeNodeTitle.bind(this);
		this.changeNodeDescription = this.changeNodeDescription.bind(this);
		this.updateNodeInfo = this.updateNodeInfo.bind(this);
		this.deleteNode = this.deleteNode.bind(this);
		this.toggleNodeHelper = this.toggleNodeHelper.bind(this);
		this.changeNodeIndex = this.changeNodeIndex.bind(this);
	}

	componentDidMount() {
		axios.get('/environment')
			.then(res => {
				this.setState({
					environment: res.data.environment
				})
			})
			.catch(err => {
				// need error reporting...
			})
	}

	displayMemoryNodeInfo(node, nodeId) {
		
		var clickedNodeIndex = parseInt(node.target.id.replace("text-node-", ""));
		var clickedNode = this.props.nodes.filter(node => node._id == nodeId)[0];

		this.setState({
			
			nodeTitle: clickedNode.title,
			nodeDescription: clickedNode.description,
			nodeIndex: clickedNodeIndex,
			nodeId,
			imageFilePath: clickedNode.imageFilePath

		}, () => {
			$('#nodeDisplayModal').modal('show');
		})
	}


	// this.props.memory
	displayNodeInfo(node, nodeId) {

		var clickedNodeIndex = parseInt(node.target.id.replace("text-node-", ""));
		var clickedNode = this.props.nodes.filter(node => node._id == nodeId)[0];

		this.setState({

			nodeTitle: clickedNode.title,
			nodeDescription: clickedNode.description,
			nodeIndex: clickedNodeIndex,
			nodeId,
			imageFilePath: ""

		}, () => {
			$('#nodeDisplayModal').modal('show');
		})
	}

	updateNodeInfo(evt) {

		evt.preventDefault();

		var newNodeTitle = evt.target['node-title'].value;
		var newNodeDescription = evt.target['node-description'].value;
		var nodeIndex = evt.target['node-index'].value;
		

		this.props.updateNode(newNodeTitle, newNodeDescription, this.state.nodeId, this.props.displayedMemory._id, nodeIndex);

		$('#nodeDisplayModal').modal('hide');
	}

	changeNodeTitle(elem) {

		this.setState({
			nodeTitle: elem.target.value
		})
	}

	changeNodeDescription(elem) {

		this.setState({
			nodeDescription: elem.target.value
		})
	}

	changeNodeIndex(elem) {

		this.setState({
			nodeIndex: elem.target.value
		})
	}

	deleteNode() {
		this.props.deleteNode(this.state.nodeId, this.props.displayedMemory._id);

		$('#nodeDisplayModal').modal('hide');
	}

	toggleNodeHelper() {
		var helper = $('.node-creation-helper');

		helper.show('slow', () => {
			helper.css('display', 'inline-block');
			helper.css('position', 'absolute');
		}
			);
		setTimeout(() => helper.hide('slow'), 6000);
	}


	render() {

		var memory = this.props.displayedMemory;
		var nodes = this.props.nodes;

		var display;

		display = (memory)
		? <ImageContainer memory={memory} nodes={nodes} displayNodeInfo={this.displayNodeInfo} displayMemoryNodeInfo={this.displayMemoryNodeInfo} environment={this.state.environment}/>
		: <MemoryCreationForm />

		return (
			<div>
				{
					this.props.serverError && <div className="alert alert-danger">{this.props.serverError}</div>
				}
				{
					this.props.nodeError && <div className="alert alert-danger">{this.props.nodeError}</div>
				}
				{
					this.props.memoryError && <div className="alert alert-danger">{this.props.memoryError}</div>
				}
				<NodeCreationContainer 
					{...this.props} 
					memoryTitle={(memory) ? memory.title : ""} 
					memoryDescription={(memory) ? memory.description : ""} 
					toggleNodeHelper={this.toggleNodeHelper}
					user={this.props.user}
					changeMemoryLocation={this.props.changeMemoryLocation}
					changeMenuState={this.props.changeMenuState}
					menuOpen={this.props.menuOpen}
				/>


				<div className="memory-location-container">

					<NodeDisplayModal
						deleteNode={this.deleteNode}
						updateNodeInfo={this.updateNodeInfo}
						changeNodeTitle={this.changeNodeTitle}
						changeNodeDescription={this.changeNodeDescription}
						changeChildMemory={this.props.changeChildMemory}
						nodeTitle={this.state.nodeTitle}
						nodeDescription={this.state.nodeDescription}
						imageFilePath={this.state.imageFilePath}
						nodeId={this.state.nodeId}
						nodeIndex={this.state.nodeIndex}
						changeNodeIndex={this.changeNodeIndex}
						environment={this.state.environment}
					/>

				{display}


				</div>


			</div>
		)
	}

}

const mapStateToProps = (state) => {

	return {
		nodes: state.nodes,
		displayedMemory: state.memorylocations.displayedMemory,
		memoryListing: state.memorylocations.allMemories,
		user: state.auth,
		memoryError: state.errors.memory,
		nodeError: state.errors.node,
		serverError: state.errors.server
	}
}


const mapDispatchToProps = (dispatch) => {

	return {

		updateNode: (nodeTitle, nodeDescription, nodeId, memoryId, nodeIndex) => {
			dispatch(updateNode(nodeTitle, nodeDescription, nodeId, memoryId, nodeIndex))
		},

		deleteNode: (nodeId, memoryId) => {
			dispatch(deleteNode(nodeId, memoryId))
		},

		fetchNodes: (memoryId) => {
			dispatch(fetchNodes(memoryId))
		},

		changeChildMemory: (childMemory) => {

			dispatch(clearNodes());
			dispatch(changeChildMemory(childMemory));
			dispatch(fetchNodes(childMemory._id))
			.then(() =>	$('#nodeDisplayModal').modal('hide'))
	
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MemoryLocationDisplay)