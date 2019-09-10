export function _changeImageHeight(elem) {

	// this.value or elem.value has pixel amount

	$('body').css('--memory-image-height', elem.target.value);
	// var centerContainer = document.getElementById('cent');
	// centerContainer.style.setProperty('--memory-image-height', elem.target.value);
}

export function _setAspectRatioToMemory(elem, displayedMemoryTitle) {

	elem.preventDefault();

	var size = elem.target['aspect-size'].value;

	localStorage.setItem(displayedMemoryTitle, size);
}