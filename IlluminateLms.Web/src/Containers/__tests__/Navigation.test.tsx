import * as React from 'react'
import * as ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import {Divider, Header} from '../Navigation';
import * as enzyme from 'enzyme';
const Adapter = require('enzyme-adapter-react-16');
enzyme.configure({ adapter: new Adapter() });


describe('Navigation', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Divider />, div);
  });
  
  it('renders without crashing', () => {
    const name = 'Title';
    const div = document.createElement('div');
    ReactDOM.render(<Header name={name} />, div);
  })
  
  it('renders the name', () => {
    const name = 'Title';
    const header = shallow(<Header name={name} />);
    expect(header.text()).toEqual(name);
  })
})