import axios from "axios";

import { receivedErr } from './auth';
import { serverError, nodeError } from './errors';

const ADD_NODE = 'ADD_NODE';
const FETCHED_NODES = 'FETCHED_NODES';
const UPDATED_NODE = 'UPDATED_NODE';
const DELETED_NODE = 'DELETED_NODE';

const CLEAR_NODES = 'CLEAR_NODES';



const fetchedNodes = (nodes) => {
	
	return {
		type: FETCHED_NODES,
		nodes
	}
}

export const addNode = (node) => {

	return {
		type: ADD_NODE,
		node
	}
}

const updatedNode = (node) => {

	return {
		type: UPDATED_NODE,
		node
	}
}

const deletedNode = (nodeId) => {

	return {
		type: DELETED_NODE,
		nodeId
	}
}

export const clearNodes = () => {

	return {
		type: CLEAR_NODES
	}
}


export default (nodes = [], action) => {

	switch(action.type) {

		case FETCHED_NODES:
			var sortedNodes = action.nodes.sort((a, b) => a.nodeIndex - b.nodeIndex);
			return Object.assign([], sortedNodes);

		case ADD_NODE:
			return Object.assign([], nodes.concat([action.node]));

		case UPDATED_NODE:
			var nodeToUpdate = nodes.filter((node) => node._id == action.node._id)[0];
			var updatedNodeIndex = nodes.indexOf(nodeToUpdate);

			nodes.splice(updatedNodeIndex, 1, action.node);

			return Object.assign([], nodes);

		case DELETED_NODE:
			return Object.assign([], nodes.filter(node => node._id != action.nodeId));

		case CLEAR_NODES:
			return Object.assign([]);

		default:
			return nodes;
	}
}


export const fetchNodes = (memoryId) => {

	return (dispatch) => {

		return axios.get(`/api/nodes/${memoryId}`)
		.then(result => dispatch(fetchedNodes(result.data)))
		.catch(err => dispatch(serverError(err)))

	}
}

export const createNode = (nodeObj, memoryId) => {

	return (dispatch) => {

		return axios.post('/api/nodes', { node: nodeObj, memoryId: memoryId, token: localStorage.getItem('token')})
		.then(result => {
			if (result.data && result.data.err)
				return dispatch(nodeError(result.err))
			dispatch(addNode(result.data))
		})
		.catch(err => dispatch(serverError(err)))

	}
}


export const updateNode = (nodeTitle, nodeDescription, nodeId, memoryId, nodeIndex) => {

	return (dispatch) => {

		return axios.put('/api/nodes', {nodeTitle, nodeDescription, nodeId, memoryId, nodeIndex, token: localStorage.getItem('token')})
		.then(result => dispatch(updatedNode(result.data)))
		.catch(err => dispatch(serverError(err)))

	}
}

export const deleteNode = (nodeId, memoryId) => {

	return (dispatch) => {

		return axios.delete('/api/nodes', { data: { nodeId, memoryId, token: localStorage.getItem('token') }})
		.then(() => dispatch(deletedNode(nodeId)))
		.catch(err => dispatch(serverError(err)))

	}
}