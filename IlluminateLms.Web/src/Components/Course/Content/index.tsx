import * as React from 'react'
import Add from './Add';
import { connect } from 'react-redux';
import { ListContentItems } from '../../../Actions/ContentItemActions';
import { Course } from '../../../Models';
import ContentList from './ContentList'

class ContentContainer extends React.Component<any, any>{

  state = {
    gotItems: false
  }

  componentWillMount(){
    if (this.props.selectedCourse.courseId > -1){
      this.renderContentItems(this.props.selectedCourse);
    }
  }

  componentWillReceiveProps(nextProps: any) {
    this.renderContentItems(nextProps.selectedCourse);
  }

  /**
   * Render the content items
   * @param course 
   */
  renderContentItems(course: Course) {
    if (course.courseId > -1 && !this.state.gotItems) {
      this.props.getContentItems(course.courseId);
      this.setState({ gotItems: true });
    }
  }

  render() {

    if (this.props.selectedCourse.courseId === -1) return <span />

    return (
      <div className='uk-container'>
        <h1>Content</h1>
        <ContentList />
        <Add />
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  selectedCourse: state.selectedCourse,
  createdContentItem: state.createdContentItem
});

const mapDispatchToProps = (dispatch: any) => ({
  getContentItems: (courseId: number) => dispatch(ListContentItems(courseId))
});

const Content = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentContainer);

export default Content;