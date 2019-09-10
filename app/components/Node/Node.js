import React from 'react';

export default ({ index, node, displayNodeInfo}) => {

		var left = node.left;
		var top = node.top;
		var nodeId = node._id

		var className = (node.isMemory) ? 'memory-node' : 'text-node';

		return (
			<span 
				onClick={(evt) => displayNodeInfo(evt, nodeId)} 
				key={index} 
				className={className} 
				id={`text-node-${node.nodeIndex}`} 
				style={{left: left, top: top, position: 'absolute'}}>

				{node.nodeIndex}

			</span>
		)

	}