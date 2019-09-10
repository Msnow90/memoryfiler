import Draggable from 'gsap/draggable';


// ======================= _dragEndFunc ===================== //
/* Calculates proper position for the node after it's dropped */

export function _dragEndFunc(draggableInstance, spanInstance, childNodeContainer) {

	/*
	 - spanInstance refers to the "this" emitted from dragend event, which is the span object
	 - draggableInstance refers to the draggable object in the gsap draggable lookup table (used to disable in this case)
	*/

	// transformStringArr gives us [*xaxis*, *yaxis*, *this one doesn't matter*]
	var transformStringArr = spanInstance.style.transform.replace("translate3d(", "").replace(")", "").split(',');
	transformStringArr[1] = transformStringArr[1].trim(); // need to trim the white space for y-axis

	var relativeX = parseInt(transformStringArr[0]) + parseInt(childNodeContainer.clientWidth); // need to add since transform returns negative num
	var relativeY = parseInt(childNodeContainer.clientHeight) - parseInt(transformStringArr[1]);

	var setPercentageLeft = relativeX / childNodeContainer.clientWidth;
	var setPercentageTop = relativeY / childNodeContainer.clientHeight;

	draggableInstance.kill();

	childNodeContainer.removeChild(spanInstance);
	// spanInstance.style.transform = "translate3d(0,0,0)";

	var topPercentage = (100 - setPercentageTop * 100).toString() + '%';
	var leftPercentage = (setPercentageLeft * 100).toString() + '%';

	// spanInstance.style.left = leftPercentage;
	// spanInstance.style.top = topPercentage;

	// from here call method that adds spanInstance to a reducer that holds current node in question

	$('#nodeCreationModal').modal('show');

	return {
		left: leftPercentage,
		top: topPercentage,
		nodeIndex: spanInstance.id.replace('text-node-', "")
	}
}


// ========================= _createDraggable ======================== //
/* 						Handles creating the initial draggable object 					*/

export function _createDraggable(nodeNumber, isMemory) {

	var childNodeContainer = document.getElementsByClassName('dimensions-container')[0]; // this is the parent container of the memory image



	// configure new node element
	var newNode = document.createElement('span');
	var nodeClassName = (isMemory) ? 'memory-node' : 'text-node';
	
	newNode.id = `text-node-${nodeNumber}`;
	newNode.style.position = 'absolute';
	newNode.classList.add(nodeClassName)
	newNode.innerText = nodeNumber;

	childNodeContainer.appendChild(newNode);

	var newDragObj = Draggable.create(`#text-node-${nodeNumber}`, { 
		bounds: '.dimensions-container'
	 })[0];

	 

	return {
		draggable: newDragObj,
		childNodeContainer
	}

}



export function _toggleHiddenInfo() {
 $('#hidden-info').toggle('slow');
}


export function _toggleHiddenNodeCreation() {
$('#hidden-node-creation').toggle('slow');
}