import * as React from 'react'
import { User } from '../../../../Models';
import { connect } from 'react-redux';
import {
  GetUserById,
  UpdateUser,
  GetCurrentUserRoles
} from '../../../../Actions';
import { EditCancelButton } from '../../../../Containers/Button';
import { SelectedPersonContainerState } from './State';
import FormField from '../../../../Containers/Form/FormField';
import UserActions from './UserActions';
import { FieldSet } from '../../../../Containers/Form';
import RoleList from './RoleList'

const _aboutTheUser = [
  { title: 'Full Name', name: 'fullName' },
  { title: 'Display Name', name: 'displayName' },
  { title: 'Sortable Name', name: 'sortableName' },
  { title: 'Email', name: 'email' },
  { title: 'First Name', name: 'firstName' },
  { title: 'Last Name', name: 'lastName' },
  { title: 'Is Active', name: 'isActive' },
];

class SelectedUserContainer extends React.Component<any, SelectedPersonContainerState>{

  state: SelectedPersonContainerState = {
    editNames: false,
    user: {} as User,
    roles: []
  }

  componentWillMount() {
    let id = this.props.match.params['id'];
    this.props.getUserById(id);
  }

  componentWillReceiveProps(nextProps: any) {
    console.log(nextProps);
    this.setState({ user: nextProps.selectedUser, roles: nextProps.currentUserRoles || [] });
  }

  /**
   * Save changes
   */
  save() {
    if (this.state.editNames) {
      this.props.updateUser(this.state.user);
    }
    this.setState({ editNames: !this.state.editNames, user: this.props.selectedUser });
  }

  /**
   * Save field onChange event
   * @param name 
   * @param e 
   */
  saveField(name: string, val: any) {
    let user = this.state.user;
    user[name] = val;
    this.setState({ user: user });
  }

  render() {
    const user: User = this.state.user;
    return (
      <div className='uk-container'>
        <h1>
          <div className="uk-width-auto uk-inline uk-avatar-person">
            <img className="uk-border-circle" width="80" height="80" src="https://getuikit.com/docs/images/avatar.jpg" />
          </div>
          {user.firstName} {user.lastName}
        </h1>
        <div className="uk-inline">
          <EditCancelButton
            edit={this.state.editNames}
            onCancel={() => this.setState({ editNames: false })}
            onSave={this.save.bind(this)} />
          <UserActions />
        </div>
        <div className='uk-child-width-expand@s uk-margin' data-uk-grid>
          <FieldSet title='Email and Name'>
            {_aboutTheUser.map((about: any) => (
              <FormField
                title={about.title}
                data={user[about.name]}
                edit={this.state.editNames}
                key={about.name}
                onChange={this.saveField.bind(this, about.name)} />
            ))}
          </FieldSet>
          <FieldSet title='Login Information'>
            <FormField
              title='Username'
              data={user.userName}
              edit={this.state.editNames}
              onChange={this.saveField.bind(this, 'userName')} />

            <br />
            <RoleList roles={this.state.roles} />
          </FieldSet>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state: any) => ({
  selectedUser: state.selectedUser,
  currentUserRoles: state.currentUserRoles
});

const mapDispatchToProps = (dispatch: any) => ({
  getUserById: (id: number) => dispatch(GetUserById(id)),
  updateUser: (user: User) => dispatch(UpdateUser(user)),
  getCurrentUserRoles: () => dispatch(GetCurrentUserRoles())
});

const SelectedUser = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedUserContainer);

export default SelectedUser;