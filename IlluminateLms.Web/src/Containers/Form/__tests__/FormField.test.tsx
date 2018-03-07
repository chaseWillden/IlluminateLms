import * as React from 'react'
import * as ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import FormField from '../FormField';
import * as enzyme from 'enzyme';
const Adapter = require('enzyme-adapter-react-16');
enzyme.configure({ adapter: new Adapter() });


describe('Form Field', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render((
      <FormField data={1} edit={false} onChange={() => {}} />
    ), div);
  });

  it('finds value', () => {
    const value = 'Test';

    const field = shallow((
      <FormField data={value} edit={true} onChange={() => {}} />
    ));

    expect(field.find('input').exists()).toBeTruthy();
    expect(field.find('input').props().value).toEqual(value);
  });

  it('finds no input', () => {
    const value = 'Test';

    const field = shallow((
      <FormField data={value} edit={false} onChange={() => {}} />
    ));
    
    expect(field.find('input').exists()).toBeFalsy();
  });
})