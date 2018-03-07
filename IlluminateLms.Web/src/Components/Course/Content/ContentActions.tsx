import * as React from 'react'
import { DropDownButton, DropDownItem, DropDownNav } from '../../../Containers/DropDown';
import { ContentActionProps } from './Props';
import { ContentItemService } from '../../../Services';
import { connect } from 'react-redux';
import { ListContentItems } from '../../../Actions/ContentItemActions';
import { Modal } from '../../../Containers/Modal/index';
import { Button } from '../../../Containers/Button/index';
import FormField from '../../../Containers/Form/FormField';

class ContentActionsContainer extends React.Component<ContentActionProps, any>{

	state = {
		name: '',
		focus: false
	}

	/**
	 * Delete item
	 */
	async deleteItem() {
		let removed = await ContentItemService.DeleteContentItem(this.props.item.contentItemId);
		if (removed) this.getItems();
	}

	/**
	 * Copy item
	 */
	async copyItem() {
		let copied = await ContentItemService.CopyContentItem(this.props.item.contentItemId);
		if (copied) this.getItems();
	}

	/**
	 * Renmae item
	 */
	async renameItem() {
		let renmaed = await ContentItemService.RenameContentItem(this.props.item.contentItemId, this.state.name);
		if (renmaed) this.getItems();
	}

	/**
	 * Get items
	 */
	getItems() {
		this.setState({ focus: false, name: '' });
		this.props.getContentItems(this.props.selectedCourse.courseId);
	}

	render() {
		return (
			<div>
				<Modal
					id={'renameDialog' + this.props.item.contentItemId}
					title='Rename Item'
					buttons={[
						<Button text='Cancel' className='uk-modal-close margin-right' key='cancel' icon='close' />,
						<Button text='Save' type='primary' className='uk-modal-close' key='save' icon='upload' onClick={this.renameItem.bind(this)} />
					]} >
					<FormField
						data={this.state.name}
						edit
						focus={this.state.focus}
						label
						onChange={(val: string) => this.setState({ name: val })}
						title='Edit Title'
					/>
				</Modal>
				<DropDownButton text='Actions' className='uk-align-right'>
					<DropDownNav text='Settings' icon='cog' onClick={() => { }} to={'/content/' + this.props.item.contentItemId + '/settings'} />
					<DropDownItem
						text='Rename'
						icon='pencil'
						onClick={() => this.setState({ name: this.props.item.title, focus: true })}
						data-uk-toggle={"target: #renameDialog" + this.props.item.contentItemId} />
					<DropDownItem text='Copy' icon='copy' onClick={this.copyItem.bind(this)} />
					<DropDownItem text='Delete' icon='trash' onClick={this.deleteItem.bind(this)} />
				</DropDownButton>
			</div>
		)
	}
}

const mapStateToProps = (state: any) => ({
	selectedCourse: state.selectedCourse,
});

const mapDispatchToProps = (dispatch: any) => ({
	getContentItems: (courseId: number) => dispatch(ListContentItems(courseId))
});

export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
	return Object.assign({}, ownProps, stateProps, dispatchProps);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(ContentActionsContainer);