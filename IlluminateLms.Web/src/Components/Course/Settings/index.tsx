import * as React from 'react'
import { connect } from 'react-redux';
import { Form, Input } from '../../../Containers/Form';

const SettingsContainer = () => (
  <div className='uk-container'>
    <h1>Course Settings</h1>
    <Form>
      <div data-uk-grid>
        <Input 
          divClass='uk-width-1-3@m' 
          label='Name' 
          onChange={() => {}}
          value={''}
          placeholder='Introduction to Business' />
      </div>
    </Form>
  </div>
)

const mapStateToProps = (state: any) => ({
  selectedCourse: state.selectedCourse
});

const mapDispatchToProps = () => ({
});

const Settings = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsContainer);


export default Settings;