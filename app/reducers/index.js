import {combineReducers} from 'redux';
// import others reducers here
import auth from './auth';
import memorylocations from './memorylocations';
import nodes from './nodes';
import errors from './errors';

// add pipeline of reducers here
const appReducer = combineReducers({
	auth,
	memorylocations,
  nodes,
  errors
})


export default (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}