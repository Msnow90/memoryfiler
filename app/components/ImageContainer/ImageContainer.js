import React from 'react';

import Node from '../Node/Node';

export default ({ memory, nodes, displayNodeInfo, displayMemoryNodeInfo, environment }) => {

	var imgUrl;
	if (environment == 'develop' || environment == 'test')
		imgUrl = '/uploads/';
	else 
		imgUrl = 'https://memoryfilerimages.s3.amazonaws.com/';


	return (
		<div className="dimensions-container">
			<img className="memory-location-image" src={imgUrl + memory.imageFilePath} />

			{
				nodes && nodes.map((node, index) => {

					var displayFunction = (node.isMemory) ? displayMemoryNodeInfo : displayNodeInfo;

					return (
						<Node displayNodeInfo={displayFunction} node={node} index={index} isMemory={node.isMemory} />
					)
				})
			}
			<span className="node-creation-helper">
				<p>Here is a new node, <br></br> drag and drop to place.</p>
			</span>
		</div>
	)
}