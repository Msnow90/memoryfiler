import React from 'react';

export default ({ memorytitle, changeLocation, index, memoryId }) => {

	return (

		<div key={index} className="memory-label-container" onClick={(evt) => {changeLocation(evt, memoryId)}}>
			<p>{memorytitle}</p>
		</div>
	)
}