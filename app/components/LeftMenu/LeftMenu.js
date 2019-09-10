import React from 'react';

import './LeftMenu.css';

import MemoryLabel from './subcomponents/MemoryLabel/MemoryLabel';
import ImageManager from './subcomponents/ImageManager/ImageManager';

// utils
import { _mouseEnter, _toggleLeftMenu } from './utils/mouseEvents';



export default ({ displayedMemory }) => {

	var colorArray = ['white', 'dark', 'black', 'indigo', 'darker', 'darkred', 'red', 'blue', 'yellow',
										'olive', 'orange', 'darkgreen', 'sea', 'tofu', 'almond', 'grey', 'brown', 'pink'
									 ];

	// var menuToggleIcon = (menuOpen) ? <i class="fas fa-toggle-on"></i> : <i class="fas fa-toggle-off"></i>;

	var displayedMemoryTitle = (displayedMemory) ? displayedMemory.title : "None";
	var displayedMemoryDescription = (displayedMemory) ? displayedMemory.description : "N/A";

	var deleteMemoryIcon = (displayedMemory) ? <i onClick={() => {
		$('#memoryDeleteModal').modal('show');
		$('#menuModal').modal('hide');
	}} class="fas fa-trash-alt"></i> : null;
	
	return (
		<div
			// onMouseEnter={(elem) => {
			// 	_mouseEnter(elem, menuOpen);
			// 	changeMenuState(true);
			// }}
			id="left-menu">

			<div className="leftmenu-title-display">
				<h5>Displayed Memory:</h5>
				<p>{ displayedMemoryTitle } {deleteMemoryIcon}</p>
				<br />
				<br />
				<h5>Description:</h5>
				<p>{ displayedMemoryDescription }</p>
			</div>

			<div className="left-menu-controls-section">
				<h5>Controls</h5>
			</div>

			<ImageManager displayedMemoryTitle={displayedMemoryTitle}/>


			<div className="input-group mb-3 color-selector-div">
				<div className="input-group-prepend">
					<label id="color-changer-label" className="input-group-text" for="inputGroupSelect01">Background</label>
				</div>
				<select onChange={selectedColor} className="custom-select" id="inputGroupSelect01">
				{
					colorArray.map(color => {

						var colorStyle = { backgroundColor: `var(--${color}-bg)`};

						return (
							<option style={colorStyle}>{color}</option>
						)
					})
				}
				</select>
			</div>


		</div>
	)
}

function selectedColor(elem) {
	$('body').css('background-color', `var(--${elem.target.value}-bg)`);
} 
