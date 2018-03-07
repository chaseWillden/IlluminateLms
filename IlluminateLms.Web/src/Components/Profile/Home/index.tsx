import * as React from 'react'
import { connect } from 'react-redux';
import { User } from '../../../Models';

const HomeContainer = (props: any) => {
  const user : User = props.currentUser
  return (
    <div className='uk-container'>
      <h1>{user.firstName} {user.lastName}'s Profile</h1>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  currentUser: state.currentUser
});

const mapDispatchToProps = () => ({
});

const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);

export default Home;