import * as React from 'react'
import * as ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import {Form} from '../Form';
import * as enzyme from 'enzyme';
const Adapter = require('enzyme-adapter-react-16');
enzyme.configure({ adapter: new Adapter() });


describe('Form', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render((
      <Form onSubmit={() => {}}>
        &nbsp;
      </Form>
    ), div);
  });

  it('triggers onsubmit', () => {
    const form = shallow((
      <Form onSubmit={(e: any) => {
        expect(e).not.toBeNull();
      }}>
        &nbsp;
      </Form>
    ));

    form.simulate('submit');
  });

  it('renders child', () => {
    const name = 'Test';

    const form = shallow((
      <Form onSubmit={() => {}}>
        <h1 id='test'>{name}</h1>
      </Form>
    ));

    expect(form.find('#test').text()).toEqual(name)
  })
})