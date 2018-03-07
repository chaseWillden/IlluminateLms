import * as React from 'react'
import FormField from '../../../../Containers/Form/FormField';
import { Permission } from '../../../../Models';
import { connect } from 'react-redux';
import { PermissionListProps } from './Props';

class PermissionListContainer extends React.Component<PermissionListProps, any>{
  /**
   * Get index of permission
   * @param permissions 
   * @param permission 
   */
  indexOfPermission(permissions: Permission[], permission: Permission){
    for (var i = 0; i < permissions.length; i++){
      if (permissions[i].value === permission.value) return i;
    }
    return -1;
  }

  /**
   * Change permission
   * @param permission 
   * @param val 
   */
  changePermission(permission: Permission){
    let role = this.props.selectedRole;
    let idx = this.indexOfPermission(role.permissions, permission);
    if (idx > -1){
      role.permissions.splice(idx, 1);
    }
    else{
      role.permissions.push(permission);
    }
    this.setState({role: role});
  }

  render() {
    const {selectedRole} = this.props;
    return (
      <fieldset className='uk-fieldset'>
        <legend className="uk-legend">Permissions</legend>
        {this.props.permissions.map((permission: Permission) => (
          <FormField
            title={permission.name}
            data={selectedRole.permissions && this.indexOfPermission(selectedRole.permissions, permission) > -1}
            edit={this.props.edit}
            key={permission.value}
            onChange={this.changePermission.bind(this, permission)}
          />
        ))}
      </fieldset>
    )
  }
}

const mapStateToProps = (state: any) => ({
  selectedRole: state.selectedRole,
  permissions: state.permissions
});

const mapDispatchToProps = () => ({
});

const PermissionList = connect(
  mapStateToProps,
  mapDispatchToProps
)(PermissionListContainer);

export default PermissionList;