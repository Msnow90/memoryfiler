import React from 'react';

// utils
import { _changeImageHeight, _toggleDisplay, _setAspectRatioToMemory } from '../../utils/imageManagerUtils';



export default ({ displayedMemoryTitle }) => {


	var aspectRatioSize = Number($('body').css('--memory-image-height').replace('px', ""));

	return (
		<div className="image-adjuster-container">
			<form onSubmit={(elem) => _setAspectRatioToMemory(elem, displayedMemoryTitle)} className="image-adjuster-form">
				<div class="form-group range-container">
					<label for="formControlRange">Change Image Aspect Ratio</label>
					<input name="aspect-size" min="100" max="2000" defaultValue={`"${aspectRatioSize}"`} onChange={_changeImageHeight} type="range" className="form-control-range" id="formControlRange" />
				</div>

				<button className="btn btn-md action-btn">Save Image Size</button>
			</form>
		</div>

	)
}