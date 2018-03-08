import * as React from 'react';
import { ListCoursesByAccountId } from '../../../../Actions';
import { connect } from 'react-redux';
import { Course } from '../../../../Models';
import { H3 } from '../../../../Containers/Headers';
import { 
  withStyles, 
  Grid, 
  TextField, 
  List, 
  ListItem, 
  ListItemText 
} from 'material-ui';
import Link from './Link'

const styles = () => ({
  item: {
    paddingLeft: 0
  }
})

class CourseListContainer extends React.Component<any, any>{

  state : any = {
    q: ''
  }

  componentWillMount(){
    this.props.listCoursesByAccountId(1);
  }

  /**
   * Search change
   * @param e 
   */
  searchChange(e: any){
    this.setState({q: e.target.value});
  }

  /**
   * Filter courses
   */
  filterCourses(){
    let q = this.state.q.toLowerCase();
    let courses : Course[] = this.props.courses;
    return courses.filter(x => 
      x.name.toLowerCase().indexOf(q) > -1 || 
      x.courseCode.toLowerCase().indexOf(q) > -1
    ).sort((a: Course, b: Course) => a.courseCode > b.courseCode ? 1 : -1);
  }
  
  render(){
    const courses = this.filterCourses();
    const {q} = this.state;

    return (
      <Grid container>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <H3>Course Creator</H3>
          <TextField
            placeholder="Search..."
            fullWidth
            margin="normal"
            autoFocus
            value={q}
            onChange={this.searchChange.bind(this)}
          />
          <List>
            {courses.map((course: Course) => (
              <ListItem key={course.courseId} className={this.props.classes.item}>
                <ListItemText primary={<Link course={course} />} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    )
  }
}



const mapStateToProps = (state: any) => ({
  courses: state.courses
});

const mapDispatchToProps = (dispatch: any) => ({
  listCoursesByAccountId: (accountId: number) => dispatch(ListCoursesByAccountId(accountId))
});

const CourseList = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CourseListContainer));

export default CourseList;