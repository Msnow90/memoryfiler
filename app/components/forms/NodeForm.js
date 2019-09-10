import React from 'react';

export default ({ onNodeDataCreation }) => {
	return (
		<form onSubmit={onNodeDataCreation}>

		<div className="form-group">
			<input type="text" name="node-title" className="form-control" aria-describedby="node title" placeholder="Enter title of node" />
		</div>

		<div className="form-group">
			<label>Description</label>
			<textarea className="form-control" name="node-description" rows="3"></textarea>
		</div>

		<div className="form-group">
			<label>Node Order (index)</label>
			<input required type="number" className="form-control" name="node-index" placeholder="*Enter the order number here*"/>
		</div>

		{/* <div className="form-group">
	<label for="exampleFormControlSelect2">Example multiple select</label>
	<select name="node-linkedMemory" multiple className="form-control" id="exampleFormControlSelect2">
		<option>--- Just leave as a node ---</option>
		{
			memoryListing && memoryListing.map(memory => {
				return (
					<option>{memory.title}</option>
				)
			})
		}
	</select>
</div> */}

		<button type="submit" class="btn btn-primary">Submit</button>
	</form>
	)
}