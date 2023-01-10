import * as dateFns from 'date-fns'



// {format(new Date(createdAt), 'MMM dd yy')}
export function formatDate(dateString:string | Date, format = 'MMM dd yy') {
 if(typeof dateString !== 'string'){
  dateString= dateString.toString()
 }
 return dateFns.format(new Date(dateString), format)
}

