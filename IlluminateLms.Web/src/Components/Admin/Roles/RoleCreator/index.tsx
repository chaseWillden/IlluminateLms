import * as React from 'react'
import { connect } from 'react-redux';
import { Form, Input } from '../../../../Containers/Form';
import { Button } from '../../../../Containers/Button';
import { withRouter } from 'react-router';
import { Role } from '../../../../Models/index';
import { CreateRole } from '../../../../Actions/index';

class RoleCreatorContainer extends React.Component<any, any> {

  state: any = {
    name: 'Student',
    description: 'A students role should only see their grade book',
  };

  componentWillReceiveProps(nextProps: any){
    let role: Role = nextProps.createdRole;
    if (role.roleId > 0){
      this.props.history.push('/selected/' + role.roleId);
    }
  }

  /**
   * Update a field
   * @param {string} name
   * @param e
   */
  fieldUpdate(name: string, e: any) {
    let o: any = {};
    o[name] = e.target.value;
    this.setState(o);
  }

  render() {
    return (
      <div className='uk-container'>
        <h1>Role Creator</h1>
        <Form>
          <div data-uk-grid>
            <Input 
              divClass='uk-width-1-3@m' 
              label='Name' 
              onChange={this.fieldUpdate.bind(this, 'name')}
              value={this.state.name}
              placeholder='Student' />
          </div>
          <div data-uk-grid>
            <Input 
              divClass='uk-width-1-3@m' 
              label='Description' 
              onChange={this.fieldUpdate.bind(this, 'description')}
              value={this.state.description}
              placeholder='Students role should be...' />
          </div>
          <div data-uk-grid>
            <div className="uk-width-1-3@m">
              <Button onClick={() => {this.props.createRole(this.state)}} text='Create Role' type='primary' />
            </div>
          </div>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  createdRole: state.createdRole
});

const mapDispatchToProps = (dispatch: any) => ({
  createRole: (role: Role) => dispatch(CreateRole(role))
});

const RoleCreator = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleCreatorContainer);

export default withRouter(RoleCreator as React.ComponentClass<any>);