import React from 'react';

// obtains nodeTitle and nodeDescription from state of Node container
export default ({ 
	deleteNode, updateNodeInfo, nodeTitle, 
	nodeDescription, imageFilePath, changeChildMemory, 
	changeNodeTitle, changeNodeDescription, nodeId, 
	nodeIndex, changeNodeIndex, environment }) => {

	var optionalImgDisplay;
	var changeLocationLink;

	var nodeObj = { title: nodeTitle, description: nodeDescription, _id: nodeId, imageFilePath: imageFilePath };
	
	var imgUrl;
	if (environment == 'develop' || environment == 'test')
		imgUrl = '/uploads/';
	else 
		imgUrl = 'https://memoryfilerimages.s3.amazonaws.com/';

	// changeLocationLink = (imageFilePath) ? <button id="childmem-img-btn" className="btn btn-lg action-btn" onClick={() => changeChildMemory(nodeObj)}>Go To Memory</button> : null;
	optionalImgDisplay = (imageFilePath) ? <div className="node-display-img-container"><img className="node-display-img" src={imgUrl + imageFilePath} /></div> : null;

	return (
		<div className="modal fade" id="nodeDisplayModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="exampleModalLabel">View/Edit Memory Peg Info</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">

							{optionalImgDisplay}
					

						<form onSubmit={updateNodeInfo}>

							<div className="form-group">
								<input onChange={changeNodeTitle} type="text" name="node-title" className="form-control" aria-describedby="node title" value={nodeTitle} />
							</div>

							<div className="form-group">
								<label>Description</label>
								<textarea onChange={changeNodeDescription} className="form-control" name="node-description" id="exampleFormControlTextarea1" rows="3" value={nodeDescription}></textarea>
							</div>

							<div className="form-group">
								<label>Order (index)</label>
								<input onChange={changeNodeIndex} required type="number" className="form-control" name="node-index" placeholder="*Enter the order number here*" value={nodeIndex} />
							</div>


							<button type="submit" class="btn btn-success modal-btn">Update</button>
							<span onClick={deleteNode} class="btn btn-danger modal-btn">Delete</span>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}