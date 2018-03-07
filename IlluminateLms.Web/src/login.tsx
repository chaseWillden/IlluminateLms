import * as React from 'react'
import * as ReactDOM from 'react-dom';
import Login from './Components/Login';
interface Window{
    [key: string]: any;
}
declare var window: Window;
const UIkit = require('uikit');
window.UIkit = UIkit

require('uikit/dist/js/uikit-icons.min.js');
require('./theme/theme.scss');

ReactDOM.render(
    <Login/>,
    document.getElementById("root")
);