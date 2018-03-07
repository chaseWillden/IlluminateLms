import * as React from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { SelectContentItem } from '../../../Actions'
import { ContentItem } from '../../../Models'

class ContentSettingsContainer extends React.Component<any, any>{

	componentDidMount(){
		const id = this.props.match.params.contentItemId;
		this.props.selectContentItem(id);
	}

	render(){
		const item : ContentItem = this.props.selectedContentItem;
		return (
			<div className='uk-container'>
				<h1>Content Settings</h1>
				<h3>{item.title}</h3>
			</div>
		)
	}
}

const mapStateToProps = (state: any) => ({
  selectedContentItem: state.selectedContentItem,
});

const mapDispatchToProps = (dispatch: any) => ({
	selectContentItem: (contentItemId: number) => dispatch(SelectContentItem(contentItemId))
});

const ContentSettings = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentSettingsContainer);

export default withRouter(ContentSettings as React.ComponentType<any>);