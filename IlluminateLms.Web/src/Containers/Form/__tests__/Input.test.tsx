import * as React from 'react'
import * as ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import {Input} from '../';
import * as enzyme from 'enzyme';
const Adapter = require('enzyme-adapter-react-16');
enzyme.configure({ adapter: new Adapter() });


describe('Input', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render((
      <Input value={'Test'} onChange={() => {}}  />
    ), div);
  });

  it('finds value', () => {
    const value = 'Test';

    const input = shallow((
      <Input value={value} onChange={() => {}} />
    ));

    expect(input.find('input').props().value).toEqual(value);
  });

  it('changes value', () => {
    const value = 'Test';
    const newValue = value + 1;

    const input = shallow((
      <Input value={value} onChange={(changed) => {
        expect(changed).toEqual(newValue);
      }} />
    ));
    
    expect(input.find('input').props().value).toEqual(value);
    input.setProps({value: newValue});
    expect(input.find('input').props().value).toEqual(newValue);
  })
})