import * as React from 'react'
import {shallow} from 'enzyme';
import Section from '../Section';
import * as enzyme from 'enzyme';
const Adapter = require('enzyme-adapter-react-16');
enzyme.configure({ adapter: new Adapter() });


describe('Section', () => {
  it('renders without crashing', () => {
    const title = 'Test'
    const description = 'This is a test';
    const section = shallow(<Section bgImage='blank.png' title={title} description={description} />);
    expect(section.find('h3').text()).toEqual(title);
    expect(section.find('p').text()).toEqual(description);
  });
  
  it('renders without title', () => {
    const title = '';
    const description = 'This is a test';
    const section = shallow(<Section bgImage='blank.png' title={title} description={description} />);
    expect(section.find('h3').text()).toEqual(title);
    expect(section.find('p').text()).toEqual(description);
  })
})