import * as React from 'react'
import { 
  DROPDOWN_NAVIGATION, 
  DropdownItemProps, 
  MenuDropdown
} from '../../Containers/Navbar';
import { connect } from 'react-redux';
import { 
  VIEW_COURSE, 
  VIEW_USERS, 
  VIEW_ROLES 
} from '../../Constants/Roles';
import { containsPermissionInRoles } from '../../Helpers/PermissionHelper';

const AdminContainer = (props: any) => {

  let _dropdown : DropdownItemProps[] = [];

  // Filter out menu if they don't have access
  if (containsPermissionInRoles(props.roles, VIEW_COURSE)) _dropdown.push({type: DROPDOWN_NAVIGATION, title: 'Courses', route: '/courses'});
  if (containsPermissionInRoles(props.roles, VIEW_USERS)) _dropdown.push({type: DROPDOWN_NAVIGATION, title: 'People', route: '/people'});
  if (containsPermissionInRoles(props.roles, VIEW_ROLES)) _dropdown.push({type: DROPDOWN_NAVIGATION, title: 'Roles', route: '/roles'});

  return (
    <li>
      <a href="#">Admin</a>
      <MenuDropdown items={_dropdown} />
    </li>
  )
}

const mapStateToProps = (state: any) => ({
  roles: state.currentUserRoles
});

const mapDispatchToProps = () => ({});

const Admin = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminContainer);

export default Admin;