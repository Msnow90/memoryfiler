import React from 'react';

import ChildMemoryForm from '../forms/ChildMemoryForm';
import NodeForm from '../forms/NodeForm';

export default ({ onNodeDataCreation, isMemory, nodeLeft, nodeTop, memoryId }) => {

	var formToDisplay;

	formToDisplay = (isMemory) 
	? <ChildMemoryForm memoryId={memoryId} nodeLeft={nodeLeft} nodeTop={nodeTop}/> 
	: <NodeForm onNodeDataCreation={onNodeDataCreation}/>;

	return (
		<div className="modal fade" id="nodeCreationModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="exampleModalLabel">Memory Peg Creation</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">

					{ formToDisplay }



					</div>
				</div>
			</div>
		</div>
	)
}