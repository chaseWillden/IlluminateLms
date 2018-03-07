import * as React from 'react'
import { PeopleState } from "./PeopleState";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form, Input } from '../../../../Containers/Form';
import { Button } from '../../../../Containers/Button';
import { CreateUser } from '../../../../Actions';
import { User } from '../../../../Models';


class PeopleCreatorContainer extends React.Component<any, PeopleState> {

  state: any = {
    firstName: '',
    lastName: '',
    email: '',
    username: ''
  };

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

  componentWillReceiveProps(nextProps: any){
    const createdUser: User = nextProps.createdUser;
    if (createdUser.userId){
      this.props.history.push(`/selected/${createdUser.userId}`);
    }
  }

  render() {
    const {createUser} = this.props;

    return (
      <div className='uk-container'>
        <h1>User Creator</h1>
        <Form>
          <div data-uk-grid>
            <Input
              value={this.state.firstName}
              label='First Name'
              divClass='uk-width-1-3@m'
              onChange={this.fieldUpdate.bind(this, 'firstName')}
              autoFocus
            />
          </div>
          <div data-uk-grid>
            <Input
              value={this.state.lastName}
              label='Last Name'
              divClass='uk-width-1-3@m'
              onChange={this.fieldUpdate.bind(this, 'lastName')}
              autoFocus
            />
          </div>
          <div data-uk-grid>
            <Input
              value={this.state.email}
              label='Email'
              type='email'
              divClass='uk-width-1-3@m'
              onChange={this.fieldUpdate.bind(this, 'email')}
              autoFocus
            />
          </div>
          <div data-uk-grid>
            <div className="uk-width-1-3@m">
              <Button onClick={createUser.bind(this, this.state)} text='Create User' type='primary' />
            </div>
          </div>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  createdUser: state.createdUser
});

const mapDispatchToProps = (dispatch: any) => ({
  createUser: (user: User) => dispatch(CreateUser(user))
});

const PeopleCreator = connect(
  mapStateToProps,
  mapDispatchToProps
)(PeopleCreatorContainer);

export default withRouter(PeopleCreator as React.ComponentType<any>);