import React, { Component } from 'react';
import { connect } from 'react-redux';

// import utils
import { _dragEndFunc, _createDraggable, _toggleHiddenInfo, _toggleHiddenNodeCreation } from '../utils/nodeCreationContainerUtils';

// import modals
import NodeCreationModal from '../modals/nodeCreationModal';
import ChangeMemoryModal from '../modals/changeMemoryModal';
import MenuModal from '../modals/menuModal';

// import thunk
import { createNode } from '../../reducers/nodes';
import { logoutFromReducer } from '../../reducers/auth';
import { clearDisplayedMemory } from '../../reducers/memorylocations';

import './nstyle.css';

// got passed: nodesIndex, displayedMemoryId, memoryListing
class NodeCreationContainer extends Component {

	constructor() {
		super();

		this.state = {

			nodeLeft: "",
			nodeTop: "",
			nodeIndex: "",
			elemToBeDeleted: {},
			parentElemContainer: {},
			isMemory: false

		}

		this.createDraggablePipeline = this.createDraggablePipeline.bind(this);
		this.onNodeDataCreation = this.onNodeDataCreation.bind(this);
		this.toggleLeftMenu = this.toggleLeftMenu.bind(this);
		this.openMemoryChangeModal = this.openMemoryChangeModal.bind(this);
		this.openMenuModal = this.openMenuModal.bind(this);
	}

	openMemoryChangeModal() {
		$('#changeMemoryModal').modal('show');
	}

	openMenuModal() {
		$('#menuModal').modal('show');
	}

	onNodeDataCreation(evt) {

		evt.preventDefault();

		var nodeTitle = evt.target['node-title'].value;
		var nodeDescription = evt.target['node-description'].value;
		var nodeIndex = evt.target['node-index'].value;

		//console.log('New node index of created is: ', newNodeIndex)

		var nodeObj = {
			title: nodeTitle,
			description: nodeDescription,
			left: this.state.nodeLeft,
			top: this.state.nodeTop,
			nodeIndex: nodeIndex
		};

		this.props.createNode(nodeObj, this.props.memory._id);

		//this.state.parentElemContainer.removeChild(this.state.elemToBeDeleted); // removes the old draggable object, so we can populate with our node component instead

		$('#nodeCreationModal').modal('hide');
	}


	createDraggablePipeline(evt, isMemory) {
		var defaultNodeIndex = (this.props.nodes.length) ? this.props.nodes[this.props.nodes.length - 1].nodeIndex + 1 : 1;

		// creates draggable object at top right of img, assigns on dragend event for that object too
		var dragData = _createDraggable(defaultNodeIndex, isMemory);

		var draggable = dragData.draggable;
		var childNodeContainer = dragData.childNodeContainer;

		var _this = this; // need to keep 2 this contexts in our dragend event handler

		draggable.addEventListener('dragend', function () {

			var dragRefPoint = Draggable.get(this);
			var newNodeObject = _dragEndFunc(dragRefPoint, this, childNodeContainer); // contains our essential node data

			_this.setState({
				nodeLeft: newNodeObject.left,
				nodeIndex: newNodeObject.nodeIndex,
				nodeTop: newNodeObject.top,
				elemToBeDeleted: this,
				parentElemContainer: childNodeContainer,
				isMemory: (isMemory) ? true : false
			})


		})
	}

	toggleLeftMenu() {

		if (this.props.menuOpen) {

			this.props.changeMenuState(false);
			const leftMenu = $('#left-menu');
			TweenMax.fromTo(leftMenu, 1, { x: 280 }, { x: 0 })

		}

		else {
			this.props.changeMenuState(true);
			const leftMenu = $('#left-menu');
			TweenMax.fromTo(leftMenu, 1, { x: 0 }, { x: 280 })

		}
	}

	render() {

		var defaultNodeIndex = (this.props.nodes.length) ? this.props.nodes[this.props.nodes.length - 1].nodeIndex + 1 : 1;

		var menuToggleIcon = (this.props.menuOpen) ? <i class="fas fa-toggle-on"></i> : <i class="fas fa-toggle-off"></i>;

		var memoryTitle = (this.props.memory) ? this.props.memory.title : 'None';

		return (

			<div className="node-creation-container">

				<div className="toggle-node-creation-container">
					<NodeCreationModal
						onNodeDataCreation={this.onNodeDataCreation}
						defaultNodeIndex={defaultNodeIndex}
						isMemory={this.state.isMemory}
						nodeLeft={this.state.nodeLeft}
						nodeTop={this.state.nodeTop}
					/>

					<MenuModal
						displayedMemory={this.props.memory}
					/>

					<ChangeMemoryModal
						memoryListing={this.props.memoryListing}
						changeMemoryLocation={this.props.changeMemoryLocation}
						clearDisplayedMemory={this.props.clearDisplayedMemory}
					/>
					<div className="container-fluid">
						<div id="dashboard-nav" className="row">
							<div className="col-sm-12 col-md-6 col-lg-2 menu-item">
								<a className="menu-nav-item" onClick={this.openMemoryChangeModal}>Change Memory Palace</a>
							</div>
							<div className="col-sm-12 col-md-6 col-lg-2 menu-item">
								<a className="menu-nav-item" onClick={this.openMenuModal}>Open Menu</a>
							</div>
							<div className="col-sm-12 col-md-6 col-lg-2 menu-item">
								<a
									onClick={(evt) => {
										this.createDraggablePipeline(evt, true);
										this.props.toggleNodeHelper();
									}}
									className="menu-nav-item">Add Memory Peg
								<span

										id="memory-node-icon">
										M
								</span>
								</a>
							</div>
							<div className="col-sm-12 col-md-6 col-lg-2 menu-item padding-left-1">
								<a onClick={this.props.clearDisplayedMemory} className="menu-nav-item">
									Add Memory Palace<i className="fas fa-plus"></i>
								</a>
							</div>
							<div className="col-sm-12 col-md-2 col-lg-1 menu-item">
								<a onClick={this.props.logout} className="menu-nav-item">Logout</a>
							</div>
						</div>
					</div>

					<div id="hidden-node-creation"></div>
				</div>
			</div>


		)
	}
}

const mapStateToProps = (state) => {

	return {
		memory: state.memorylocations.displayedMemory,
		memoryListing: state.memorylocations.allMemories,
		nodes: state.nodes,
		user: state.auth
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {

	return {

		createNode: (memid, node) => {
			dispatch(createNode(memid, node))
		},

		logout: () => {
			dispatch(logoutFromReducer());
			ownProps.history.push('/');
		},

		clearDisplayedMemory: () => {
			dispatch(clearDisplayedMemory());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeCreationContainer);