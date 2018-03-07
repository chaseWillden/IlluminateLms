import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import createAppStore from './Store';
import Routes from './Routes'
import { LoadCurrentUser, GetCurrentUserRoles } from './Actions';
import AppBar from './Components/AppBar';

interface Window{
	[key: string]: any;
}
declare var window: Window;
const UIkit = require('uikit');
window.UIkit = UIkit

require('uikit/dist/js/uikit-icons.min.js');
require('./theme/theme.scss');

const store = createAppStore();
store.dispatch(LoadCurrentUser());
store.dispatch(GetCurrentUserRoles());

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<div>
				<AppBar />
				<Routes />
			</div>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
)