import * as React from 'react'
import * as ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import * as enzyme from 'enzyme';
import { Modal } from '../Modal'
const Adapter = require('enzyme-adapter-react-16');
enzyme.configure({ adapter: new Adapter() });


describe('Modal', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render((
      <Modal buttons={[]} id='test' title='Test Title'>
        Test
      </Modal>
    ), div);
  });

  it('renders correct title', () => {
    const name = 'Test';
    const modal = shallow(
      <Modal buttons={[]} id='test' title={name}>
        Test
      </Modal>
    );

    expect(modal.find('h2').text()).toEqual(name);
  });
})