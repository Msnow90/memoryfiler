export function _mouseEnter(elem, menuOpen) {
	if (menuOpen) return 1;
	const leftMenu = $('#left-menu');
	TweenMax.fromTo(leftMenu, 1, { x: 0 }, { x: 280 })
}


export function _toggleLeftMenu(menuOpen, changeMenuState) {

	if (menuOpen) {

		changeMenuState(false);
		const leftMenu = $('#left-menu');
		TweenMax.fromTo(leftMenu, 1, { x: 280 }, { x: 0 })

	}

	else {
		changeMenuState(true);
		const leftMenu = $('#left-menu');
		TweenMax.fromTo(leftMenu, 1, { x: 0 }, { x: 280 })

	}
}