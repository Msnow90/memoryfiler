import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Home.css';

// actions and thunks
import { fetchMemoryLocations, changeMemoryLocation, clearDisplayedMemory, deleteMemory } from '../../reducers/memorylocations';
import { clearNodes, fetchNodes } from '../../reducers/nodes';

// components
// import LeftMenu from '../LeftMenu/LeftMenu';
import CenterDisplay from '../CenterDisplay/CenterDisplay';

// modals
import MemoryDeleteModal from './modals/memorydelete';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false
    }

    this.changeLocation = this.changeLocation.bind(this);
    this.changeMenuState = this.changeMenuState.bind(this);
  }

  changeLocation(elem, memoryId) {
    this.props.changeMemoryLocation(elem.target.innerText, memoryId);
  }

  componentDidMount() {
    if (!this.props.user.username) 
      this.props.history.push('/');
    
    this.props.fetchMemoryLocations(localStorage.getItem('token'))
  }

  changeMenuState(bool) {
    this.setState({
      menuOpen: bool
    })
  }

  render() {
    if (!this.props.user.username) 
      return null;
      
    return (
      <div className="App">

        <MemoryDeleteModal deleteMemory={this.props.deleteMemory} selectedMemory={this.props.displayedMemory}/>

        {/* <LeftMenu
          displayedMemory={this.props.displayedMemory} 
          changeMenuState={this.changeMenuState}
          menuOpen={this.state.menuOpen}
        /> */}
        
        <CenterDisplay 
          {...this.props} 
          displayedMemory={this.props.displayedMemory} 
          user={this.props.user} 
          changeMemoryLocation={this.changeLocation}
          changeMenuState={this.changeMenuState}
          menuOpen={this.state.menuOpen}
         />
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    memorylocations: state.memorylocations.allMemories,
    displayedMemory: state.memorylocations.displayedMemory,
    user: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {

  return {

    fetchMemoryLocations: (token) => {
      return new Promise((resolve, reject) => {
        dispatch(fetchMemoryLocations(token))
        .then(resolve)
        .catch(reject)
      })
    },

    changeMemoryLocation: (memorytitle, memoryId) => {
      dispatch(changeMemoryLocation(memorytitle))
      
      if (memoryId) {
        dispatch(clearNodes())
        dispatch(fetchNodes(memoryId))
      }
    },

    clearDisplayedMemory: () => {
      dispatch(clearDisplayedMemory());
    },

    deleteMemory: (memoryId, imageFilePath) => {
      dispatch(deleteMemory(memoryId, imageFilePath));
    } 
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
