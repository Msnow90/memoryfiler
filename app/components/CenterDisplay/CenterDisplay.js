import React from 'react';

import './CenterDisplay.css';

// subcomponents
import MemoryLocationDisplay from '../MemoryLocationDisplay/MemoryLocationDisplay';



export default (props) => {

	if (!props.user) props.history.push('/');


	return (
		<div>
			<div id="center-display">
				<MemoryLocationDisplay 
					{...props} 
					changeMemoryLocation={props.changeMemoryLocation} 
					changeMenuState={props.changeMenuState} 
					menuOpen={props.menuOpen}
				/>
			</div>
		</div>

	)
}