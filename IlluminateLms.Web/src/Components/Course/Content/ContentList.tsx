import * as React from 'react'
import { connect } from 'react-redux';
import { ContentItem, Course } from '../../../Models';
import ContentActions from './ContentActions';
import { ContentItemService } from '../../../Services'

class ContentListContainer extends React.Component<any, any>{

  // Reorder
  componentDidMount(){
    const ele = document.getElementById('content-list-container') as HTMLUListElement;
    ele.addEventListener('moved', (e: any) => {
      let results = [];
      for (let child of e.target.children){
        results.push(parseInt(child.dataset['itemid']));
      }
      ContentItemService.ReorderContentItems(results);
    });
  }

  render() {
    return (
      <ul data-uk-accordion data-uk-sortable="handle: .uk-sortable-handle" id='content-list-container'>
        {this.props.contentItems.map((item: ContentItem) => (
          <li key={item.contentItemId} data-itemid={item.contentItemId}>
            <a className="uk-accordion-title" href="#">
              <span className="uk-sortable-handle uk-margin-small-right" data-uk-icon="icon: table"></span>
              {item.title}
            </a>
            <div className="uk-accordion-content">
              <ContentActions item={item} selectedCourse={{} as Course} getContentItems={() => {}} />
              {item.description}
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = (state: any) => ({
  contentItems: state.listContentItems,
});

const mapDispatchToProps = () => ({
});

const ContentList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentListContainer);

export default ContentList;