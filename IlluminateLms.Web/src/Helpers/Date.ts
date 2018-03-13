import * as moment from 'moment'

export const FormatDate = (date: string) => moment(date).format('MMMM Do YYYY, h:mm:ss a');