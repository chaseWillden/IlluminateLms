import * as React from 'react'
import { Modal } from '../../../Containers/Modal';
import { Button } from '../../../Containers/Button';
import { Input } from '../../../Containers/Form';
import { connect } from 'react-redux';
import { ContentItem, Course } from '../../../Models';
import { ListContentItems } from '../../../Actions/ContentItemActions';
import { ContentItemService } from '../../../Services';
require('./style.scss');

class AddContainer extends React.Component<any, any>{

  state = {
    title: '',
    description: ''
  }

  /**
   * Update a field
   * @param {string} name
   * @param e
   */
  fieldUpdate(name: string, e: any) {
    let o: any = {};
    o[name] = e.target.value;
    this.setState(o);
  }

  /**
   * Save the new content item
   */
  async save(){
    let course : Course = this.props.selectedCourse;
    let item : ContentItem = {
      description: this.state.description,
      title: this.state.title
    } as ContentItem;
    await ContentItemService.CreateContentItem(item, course.courseId);
    this.props.getContentItems(course.courseId);
  }

  render() {
    return (
      <div>
        <button className="uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom btn-grey" data-uk-toggle='target: #addNewDialog'>
          <span data-uk-icon="icon: plus"></span>
          Add a New Item
        </button>
        <Modal id='addNewDialog' title='Add new Content Item' buttons={[
          <Button text='Cancel' key='Cancel' className='uk-modal-close margin-right' icon='close' />,
          <Button type='primary' text='Save' key='save' className='uk-modal-close' icon='upload' onClick={this.save.bind(this)} />
        ]}>
          <div data-uk-grid>
            <Input
              value={this.state.title}
              label='Title'
              divClass='uk-width-1-1@m'
              onChange={this.fieldUpdate.bind(this, 'title')}
              autoFocus
            />
          </div>
          <div data-uk-grid>
            <Input
              value={this.state.description}
              label='Description'
              divClass='uk-width-1-1@m'
              onChange={this.fieldUpdate.bind(this, 'description')}
              textarea
            />
          </div>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  selectedCourse: state.selectedCourse
});

const mapDispatchToProps = (dispatch: any) => ({
  getContentItems: (courseId: number) => dispatch(ListContentItems(courseId))
});

const Add = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddContainer);

export default Add;