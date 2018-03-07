import * as React from 'react';
import { ListAllRoles } from '../../../../Actions';
import { connect } from 'react-redux';
import { Role } from '../../../../Models';
import { NavLink } from 'react-router-dom';
require('./style.css');

class RoleListContainer extends React.Component<any, any>{

  state : any = {
    q: ''
  }

  componentWillMount(){
    this.props.getAllRoles();
  }

  /**
   * Search change
   * @param e 
   */
  searchChange(e: any){
    this.setState({q: e.target.value});
  }

  /**
   * Filter Roles
   */
  filterRoles(){
    let q = this.state.q.toLowerCase();
    let roles : Role[] = this.props.roles;
    return roles.filter(x => 
      x.description.toLowerCase().indexOf(q) > -1 ||
      x.name.toLowerCase().indexOf(q) > -1
    ).sort((a: Role, b: Role) => a.name > b.name ? 1 : -1);
  }
  
  render(){
    const roles = this.filterRoles();
    const {q} = this.state;

    return (
      <div className='uk-container'>
        <h1>Role List</h1>
        <div className="uk-margin">
            <input className="uk-input" type="text" placeholder="Search..." autoFocus value={q} onChange={this.searchChange.bind(this)} />
        </div>
        <dl className="uk-description-list">
          {roles.map((role: Role) => (
            <div className='description-list-item' key={role.roleId}>
              <dt>
                <NavLink to={'/selected/' + role.roleId}>{role.name}</NavLink>
              </dt>
              <dd>{role.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  roles: state.roles
});

const mapDispatchToProps = (dispatch: any) => ({
  getAllRoles: () => dispatch(ListAllRoles())
});

const RoleList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleListContainer);

export default RoleList;