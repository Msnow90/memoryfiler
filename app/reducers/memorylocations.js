import axios from 'axios';

import { receivedErr } from './auth';
import { clearNodes } from './nodes';
import { serverError, memoryError } from './errors';

const POPULATE_MEMLOCS = 'POPULATE_MEMLOCS';
const CREATED_MEMLOC = 'CREATED_MEMLOC';
const CHANGE_MEMLOC = 'CHANGE_MEMLOC';
const CLEAR_DISPLAYED_MEMORY = 'CLEAR_DISPLAYED_MEMORY';
const CHANGE_CHILD_MEMORY = 'CHANGE_CHILD_MEMORY';
const DELETED_MEMORY = 'DELETED_MEMORY';

const populateMemLocs = (memorylocations) => {

	return {
		type: POPULATE_MEMLOCS,
		memorylocations
	}

}

export const createdMemLoc = (memorylocation) => {

	return {
		type: CREATED_MEMLOC,
		memorylocation
	}

}

export const changeMemoryLocation = (memorytitle) => {

	return {
		type: CHANGE_MEMLOC,
		memorytitle
	}
}

export const clearDisplayedMemory = () => {

	return {
		type: CLEAR_DISPLAYED_MEMORY
	}
}

export const changeChildMemory = (childMemory) => {

	return {
		type: CHANGE_CHILD_MEMORY,
		childMemory
	}
}

const deletedMemory = (memoryId) => {

	return {
		type: DELETED_MEMORY,
		memoryId
	}
}


export default (memorylocations = {}, action) => {

	switch (action.type) {

		case POPULATE_MEMLOCS:
			return Object.assign({}, memorylocations, { allMemories: action.memorylocations });

		case CREATED_MEMLOC:
			return Object.assign({}, memorylocations, { displayedMemory: action.memorylocation, allMemories: memorylocations.allMemories.concat([action.memorylocation]) });

		case CHANGE_MEMLOC:
			var memoryToDisplay = memorylocations.allMemories.filter((memory) => memory.title === action.memorytitle)[0];

			if (localStorage.getItem(memoryToDisplay.title)) {
				var aspectRatioSize = localStorage.getItem(memoryToDisplay.title);
		
				$('body').css('--memory-image-height', aspectRatioSize);

			}
		

			return Object.assign({}, memorylocations, { displayedMemory: memoryToDisplay, childNodeIndex: memoryToDisplay.childNodes.length + 1});

		case CLEAR_DISPLAYED_MEMORY:
			return Object.assign({}, memorylocations, { displayedMemory: null, childNodeIndex: 0});

		case CHANGE_CHILD_MEMORY:

		if (localStorage.getItem(action.childMemory.title)) {
			var aspectRatioSize = localStorage.getItem(action.childMemory.title);
	
			$('body').css('--memory-image-height', aspectRatioSize);
		}

			return Object.assign({}, memorylocations, {displayedMemory: action.childMemory})

		case DELETED_MEMORY:
			var memoryIndexToRemove = memorylocations.allMemories.map(memory => memory._id).indexOf(action.memoryId);
			memorylocations.allMemories.splice(memoryIndexToRemove, 1);

			return Object.assign({}, memorylocations, { displayedMemory: null, childNodeIndex: 0});

		default:
			return memorylocations;
	}
}


export const fetchMemoryLocations = (token) => {

	return (dispatch) => {

		return axios.get('/api/memorylocations', { headers: { Authorization: `${token}` }})
			.then(result => {
				dispatch(populateMemLocs(result.data))
				return result.data;
			})
			.catch(err => dispatch(serverError(err)))
	}

}

export const createMemoryLocation = (formData) => {

	return (dispatch) => {

		return axios.post('/api/memorylocations', formData)
			.then(result => {
				if (result.data && result.data.err)
					return dispatch(memoryError(result.data.err));
				dispatch(createdMemLoc(result.data))
			})
			.catch(err => dispatch(serverError(err)))
	}
}

export const deleteMemory = (memoryId, imageFilePath) => {

	return (dispatch) => {

		return axios.delete('/api/memorylocations', {data: {imageFilePath: imageFilePath, memoryId: memoryId, token: localStorage.getItem('token')}})
		.then(() => dispatch(deletedMemory(memoryId)))
		.catch(err => dispatch(serverError(err)))

	}
}