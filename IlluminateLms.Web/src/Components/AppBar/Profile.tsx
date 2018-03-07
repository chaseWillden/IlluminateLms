import * as React from 'react'
import { connect } from 'react-redux';
import { AuthService } from '../../Services';
import { 
  DropdownItemProps, 
  DROPDOWN_NAVIGATION, 
  DROPDOWN_HEADER, 
  DROPDOWN_ACTION, 
  MenuDropdown
} from '../../Containers/Navbar';

const _dropdown : DropdownItemProps[] = [
  {type: DROPDOWN_HEADER, title: 'User Pages'},
  {type: DROPDOWN_NAVIGATION, title: 'Profile', route: '/profile', icon: 'user'},
  {type: DROPDOWN_HEADER, title: 'Actions'},
  {type: DROPDOWN_ACTION, title: 'Logout', icon: 'sign-out', action: () => AuthService.logout()}
]

const ProfileContainer = (props: any) => (
  <div className="uk-navbar-right">
    <ul className="uk-navbar-nav">
      <li>
        <a href="#">{props.currentUser.firstName} {props.currentUser.lastName}</a>
        <MenuDropdown items={_dropdown} />
      </li>
    </ul>
  </div>
)

const mapStateToProps = (state: any) => ({
  currentUser: state.currentUser,
});

const mapDispatchToProps = () => ({});

const Profile = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);

export default Profile;