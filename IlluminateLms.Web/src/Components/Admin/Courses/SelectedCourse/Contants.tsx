import * as React from 'react'
import { Grid } from 'material-ui'

const prettyPrint = (course: any, about: any) => {
  const data = course[about.name];
  if (about.type === 'boolean') return data ? 'Yes' : 'No';
  return data;
}

export const DetailedItem = (props: any) => (
  <Grid container>
    <Grid item xs={4}>
      <strong>{props.about.title}:</strong>
    </Grid>
    <Grid item xs={8}>{prettyPrint(props.course, props.about)}</Grid>
  </Grid>
)