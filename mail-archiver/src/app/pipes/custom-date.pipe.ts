import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
  pure: true
})
export class CustomDatePipe implements PipeTransform {

  transform(value: any, ...args: any): any {
    return this.changeDate(value);
  }
  changeDate(date) {
    var currentDate = new Date();
    var emailDate = new Date(date);
    if (currentDate.getFullYear() > emailDate.getFullYear()) {
      // if the email was from previous years
      return (emailDate.getFullYear() + "/" + emailDate.getMonth() + "/" + emailDate.getDate());
    } else if (currentDate.getFullYear() == emailDate.getFullYear()) {
      // if the email was from this year and the same day
      if ((currentDate.getDate() == emailDate.getDate()) && (currentDate.getMonth() == emailDate.getMonth())) {
        return ( emailDate.getHours() + ":" + emailDate.getMinutes() );
      } else {
        // format the date to be like "Jan 01 or Oct 13"
        var dateSpace = "";
        (emailDate.getDate() < 10) ? dateSpace = " 0" + emailDate.getDate() : dateSpace = " " + emailDate.getDate();
        var monthStr = "";
        // there is probably a better way to do this lol
        switch (emailDate.getMonth()) {
          case 1: monthStr = "Jan"; break;
          case 2: monthStr = "Feb"; break;
          case 3: monthStr = "Mar"; break;
          case 4: monthStr = "Apr"; break;
          case 5: monthStr = "May"; break;
          case 6: monthStr = "Jun"; break;
          case 7: monthStr = "Jul"; break;
          case 8: monthStr = "Aug"; break;
          case 9: monthStr = "Sep"; break;
          case 10: monthStr = "Oct"; break;
          case 11: monthStr = "Nov"; break;
          case 12: monthStr = "Dec"; break;
        }
        return (monthStr + dateSpace);
      }
    }
  }

}