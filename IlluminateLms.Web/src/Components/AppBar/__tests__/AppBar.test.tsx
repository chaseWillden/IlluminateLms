import * as React from 'react'
import * as ReactDOM from 'react-dom';
import * as enzyme from 'enzyme';
import AppBar from '../';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import createAppStore from '../../../Store';
import Profile from '../Profile';
const Adapter = require('enzyme-adapter-react-16');
enzyme.configure({ adapter: new Adapter() });

const store = createAppStore();

const Setup = (props: any) => (
  <Provider store={store}>
    <MemoryRouter>
      {props.children}
    </MemoryRouter>
  </Provider>
)

describe('AppBar', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render((
      <Setup>
        <AppBar />
      </Setup>
    ), div);
  });

  it('renders dropdown for profile', () => {
    const div = document.createElement('div');
    ReactDOM.render((
      <Setup>
        <Profile />
      </Setup>
    ), div);
  })
})