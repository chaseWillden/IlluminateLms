import * as React from 'react'
import { Role, Permission } from '../../../../Models';
import { connect } from 'react-redux';
import { Button } from '../../../../Containers/Button';
import FormField from '../../../../Containers/Form/FormField';
import { 
  GetRoleById, 
  UpdateRole, 
  ListPermissions, 
  AddedPermissions, 
  GetCurrentUserRoles
} from '../../../../Actions';
import PermissionList from './PermissionList';

const _aboutTheRole = [
  {title: 'Name', name: 'name'},
  {title: 'Description', name: 'description'}
];

class SelectedRoleContainer extends React.Component<any, any>{

  state: any = {
    editNames: false,
    editPermissions: false,
    role: {} as Role
  }

  componentWillMount() {
    let id = this.props.match.params['id'];
    this.props.getRoleById(id);
    this.props.listPermissions();
  }

  componentWillReceiveProps(nextProps: any) {
    this.setState({ role: nextProps.selectedRole });
    if (nextProps.addedPermissions && nextProps.addedPermissions.length > 0){
      this.props.getCurrentUserRoles();
    }
  }

  /**
   * Save changes
   */
  save(which: string) {
    if (which === 'names'){
      if (this.state.editNames) {
        this.props.updateRole(this.state.role);
      }
      this.setState({ editNames: !this.state.editNames, user: this.props.selectedRole });
    }
    else if (which === 'permissions'){
      if (this.state.editPermissions){
        this.props.addPermissions(this.state.role.roleId, this.state.role.permissions);
      }
      this.setState({editPermissions: !this.state.editPermissions});
    }
  }

  /**
   * Save field onChange event
   * @param name 
   * @param e 
   */
  saveField(name: string, val: any) {
    let user = this.state.user;
    user[name] = val;
    this.setState({user: user});
  }

  render() {
    const role: Role = this.state.role;
    return (
      <div className='uk-container'>
        <h1>
          <div className="uk-width-auto uk-inline uk-avatar-person">
            <img className="uk-border-circle" width="80" height="80" src="https://getuikit.com/docs/images/avatar.jpg" />
          </div>
          {role.name}
        </h1>
        <div className="uk-inline">
          <Button
            type={this.state.editNames ? 'primary' : 'default'}
            onClick={this.save.bind(this, 'names')}
            text={this.state.editNames ? 'Save' : 'Edit Names'}
            icon={this.state.editNames ? 'upload' : 'pencil'}
          />
          <Button
            type={this.state.editPermissions ? 'primary' : 'default'}
            onClick={this.save.bind(this, 'permissions')}
            text={this.state.editPermissions ? 'Save' : 'Edit Permissions'}
            icon={this.state.editPermissions ? 'upload' : 'pencil'}
            className='btn-margin-left'
          />
          <Button 
            onClick={() => this.setState({editNames: false, editPermissions: false})} 
            text='Cancel' 
            show={this.state.editNames || this.state.editPermissions} 
            icon='close' 
            className='btn-margin-left'/>
        </div>
        <div className='uk-child-width-expand@s uk-margin' data-uk-grid>
          <fieldset className='uk-fieldset'>
            <legend className="uk-legend">Name</legend>
            {_aboutTheRole.map((about: any) => (
              <FormField 
                title={about.title}
                data={role[about.name]}
                edit={this.state.editNames} 
                key={about.name}
                onChange={this.saveField.bind(this, about.name)} />
            ))}
          </fieldset>
          <PermissionList edit={this.state.editPermissions} />
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state: any) => ({
  selectedRole: state.selectedRole,
  permissions: state.permissions,
  addedPermissions: state.addedPermissions
});

const mapDispatchToProps = (dispatch: any) => ({
  getRoleById: (id: number) => dispatch(GetRoleById(id)),
  updateRole: (role: Role) => dispatch(UpdateRole(role)),
  listPermissions: () => dispatch(ListPermissions()),
  addPermissions: (roleId: number, permissions: Permission[]) => dispatch(AddedPermissions(roleId, permissions)),
  getCurrentUserRoles: () => dispatch(GetCurrentUserRoles())
});

const SelectedRole = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedRoleContainer);

export default SelectedRole;