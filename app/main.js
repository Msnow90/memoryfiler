import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import ReactGA from 'react-ga'

import store from './store';
import Root from './components/Root';


ReactGA.initialize('UA-145118908-1');
ReactGA.pageview(window.location.pathname + window.location.search);

render(
	<Provider store={store}>
		<Root />
	</Provider>,
	document.getElementById('main')
)