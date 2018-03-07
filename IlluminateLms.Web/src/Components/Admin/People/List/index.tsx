import * as React from 'react';
import { ListAllUsers } from '../../../../Actions';
import { connect } from 'react-redux';
import { User } from '../../../../Models';
import { NavLink } from 'react-router-dom';

class PeopleListContainer extends React.Component<any, any>{

  state : any = {
    q: ''
  }

  componentWillMount(){
    this.props.getAllUsers();
  }

  /**
   * Search change
   * @param e 
   */
  searchChange(e: any){
    this.setState({q: e.target.value});
  }

  /**
   * Filter users
   */
  filterUsers(){
    let q = this.state.q.toLowerCase();
    let users : User[] = this.props.users;
    return users.filter(x => 
      x.firstName.toLowerCase().indexOf(q) > -1 || 
      x.lastName.toLowerCase().indexOf(q) > -1 ||
      x.email.toLowerCase().indexOf(q) > -1
    ).sort((a: User, b: User) => a.displayName > b.displayName ? 1 : -1);
  }
  
  render(){
    const users = this.filterUsers();
    const {q} = this.state;

    return (
      <div className='uk-container'>
        <h1>User List</h1>
        <div className="uk-margin">
            <input className="uk-input" type="text" placeholder="Search..." autoFocus value={q} onChange={this.searchChange.bind(this)} />
        </div>
        <ul className="uk-list uk-list-divider">
          {users.map((user: User) => (
            <li key={user.userId}>
              <NavLink to={'/selected/' + user.userId}>
                <span>{user.lastName}, {user.firstName}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  users: state.users
});

const mapDispatchToProps = (dispatch: any) => ({
  getAllUsers: () => dispatch(ListAllUsers())
});

const PeopleList = connect(
  mapStateToProps,
  mapDispatchToProps
)(PeopleListContainer);

export default PeopleList;