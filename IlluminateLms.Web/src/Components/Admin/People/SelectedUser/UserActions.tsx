import * as React from 'react'
import { DropDownButton, DropDownItem } from '../../../../Containers/DropDown';
import { Header } from '../../../../Containers/Navigation';
import { connect } from 'react-redux';
import { 
  DeleteUser, UpdatePassword, ListPermissions
} from '../../../../Actions';
import { ConfirmationModal, Modal,  } from '../../../../Containers/Modal';
import { User } from '../../../../Models/User';
import { Button } from '../../../../Containers/Button';
import FormField from '../../../../Containers/Form/FormField';
import { Select } from '../../../../Containers/Form';

const deleteConfirmationText = 'Are you sure you want to delete this user?';

class UserActionsContainer extends React.Component<any, any>{

  state = {
    password: 'TempPas$Word1'
  }

  componentWillMount(){
    this.props.getPermissions();
  }

  render(){
    const user: User = this.props.selectedUser;

    return (
      <div className='uk-inline'>
        <DropDownButton text='Actions' className='btn-margin-left uk-width-large'>
          <Header name='Administrative' />
          <DropDownItem text={'Delete ' + user.firstName} icon='trash' data-uk-toggle="target: #confDialog" />
          <DropDownItem text='Set Temp Password' icon='lock' data-uk-toggle="target: #tmpPasswordDialog" />
          <DropDownItem text='Proxy as User' icon='user' />
          <DropDownItem text='Add to Role' icon='users' data-uk-toggle='target: #roleDialog' />
        </DropDownButton>

        <ConfirmationModal 
          id="confDialog" 
          text={deleteConfirmationText} 
          yesClicked={() => this.props.deleteUser(this.props.selectedUser.userId)} children='' />

        <Modal id='tmpPasswordDialog' title="Let's Set a Temp Password" buttons={[
          <Button text='Cancel' className='uk-modal-close margin-right' key='cancel' icon='close' />,
          <Button text='Save' type='primary' className='uk-modal-close' key='save' icon='upload' onClick={() => this.props.updatePassword(user.userId, this.state.password)} />
        ]}>
          <FormField title='Password' label={true} edit={true} data={this.state.password} onChange={(val: string) => this.setState({password: val})} />
        </Modal>

        <Modal id='roleDialog' title={'Add Role to ' + user.firstName} buttons={[
          <Button text='Cancel' className='uk-modal-close margin-right' key='cancel' icon='close' />,
          <Button text='Save' type='primary' className='uk-modal-close' key='save' icon='upload' onClick={() => {}} />
        ]}>
          <Select value={-1} onChange={() => {}} options={this.props.permssions || []} />
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  selectedUser: state.selectedUser,
  passwordUpdated: state.passwordUpdated,
  permissions: state.permissions
});

const mapDispatchToProps = (dispatch: any) => ({
  deleteUser: (userId: number) => dispatch(DeleteUser(userId)),
  updatePassword: (userId: number, password: string) => dispatch(UpdatePassword(userId, password)),
  getPermissions: () => dispatch(ListPermissions())
});

const UserActions = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserActionsContainer);

export default UserActions;