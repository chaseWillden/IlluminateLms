import * as React from 'react'
import {RouteData, RouteType} from './JsonData'
import Results from './Results';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { SearchCourses } from '../../../Actions';
import { Course } from '../../../Models';
import { UP, DOWN, ENTER } from '../../../Constants/Events'

class SearchContainer extends React.Component<any, any>{

  state = {
    q: '',
    results: [],
    active: 0
  }

  componentWillReceiveProps(nextProps: any){
    if (this.state.q.length === 0) return;
    let courses : Course[] = nextProps.courses;
    let results = this.state.results;
    for (let c of courses){
      let o: RouteType = {
        type: 'course',
        title: c.courseCode + ' - ' + c.name,
        path: '/courses/selected/' + c.courseId
      };
      results.push(o as never);
    }
  }

  /**
   * On text change
   * @param e 
   */
  change(e: any){
    if (e.target.value.length > 3){
      this.props.searchCourse(e.target.value.toLowerCase());
    }
    let results = RouteData.filter(x => x.title.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1);
    this.setState({
      q: e.target.value,
      results: e.target.value.length === 0 ? [] : results
    });
  }

  /**
   * Item selected
   * @param item 
   */
  selected(){
    this.setState({q: '', results: []});
  }

  /**
   * Change the active menu item
   * @param e 
   */
  changeActive(e: any){
    const {active, results} = this.state;
    const {history} = this.props;
    switch (e.keyCode){
      case DOWN: { // down
        if (active + 1 >= results.length) this.setState({active: 0});
        else this.setState({active: active + 1});
        break;
      }
      case UP: { // up
        if (active - 1 < 0) this.setState({active: results.length - 1});
        else this.setState({active: active - 1});
        break;
      }
      case ENTER: {
        let chosen : any = this.state.results[this.state.active];
        history.push(chosen.path);
        this.selected();
        break;
      }
    }
  }

  render(){
    return (
      <div className='uk-inline'>
        <a className="uk-form-icon" href="#" data-uk-icon="icon: search" />
        <input 
          type='text' 
          className='uk-input uk-form-width-large' 
          placeholder='Search...' 
          autoFocus 
          value={this.state.q} 
          onChange={this.change.bind(this)}
          onKeyDown={this.changeActive.bind(this)}
        />
        <Results results={this.state.results} onClick={this.selected.bind(this)} active={this.state.active} />
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  courses: state.courses
});

const mapDispatchToProps = (dispatch: any) => ({
  searchCourse: (q: string) => dispatch(SearchCourses(q))
});

const Search = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer);

export default withRouter(Search as React.ComponentClass<any>);