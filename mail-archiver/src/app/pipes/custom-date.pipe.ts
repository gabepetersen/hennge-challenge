import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
  pure: true
})
/*
 * Super cool Date pipe for formatting based on the current date
 */
export class CustomDatePipe implements PipeTransform {

  transform(value: any, ...args: any): any {
    return this.changeDate(value);
  }
  changeDate(date) {
    // CURRENT DATE SETTING FOR TESTING
    var currentDate = new Date("January 3 2020");
    var emailDate = new Date(date);
    if (currentDate.getFullYear() > emailDate.getFullYear()) {
      // if the email was from previous years
      // also getMonth() returns a number less than actual month
      return (emailDate.getFullYear() + "/" + (emailDate.getMonth() + 1) + "/" + emailDate.getDate());
    } else if (currentDate.getFullYear() == emailDate.getFullYear()) {
      // if the email was from this year and the same day
      if ((currentDate.getDate() == emailDate.getDate()) && (currentDate.getMonth() == emailDate.getMonth())) {
        // add an extra 0 if 0 minutes
        var minuteSpace = '';
        if (emailDate.getMinutes() == 0) {
          minuteSpace = '0';
        }
        return ( emailDate.getHours() + ":" + emailDate.getMinutes() + minuteSpace ); 
      } else {
        // format the date to be like "Jan 01 or Oct 13"
        var dateSpace = "";
        (emailDate.getDate() < 10) ? dateSpace = " 0" + emailDate.getDate() : dateSpace = " " + emailDate.getDate();
        var monthStr = "";
        // there is probably a better way to do this lol
        switch (emailDate.getMonth()) {
          case 0: monthStr = "Jan"; break;
          case 1: monthStr = "Feb"; break;
          case 2: monthStr = "Mar"; break;
          case 3: monthStr = "Apr"; break;
          case 4: monthStr = "May"; break;
          case 5: monthStr = "Jun"; break;
          case 6: monthStr = "Jul"; break;
          case 7: monthStr = "Aug"; break;
          case 8: monthStr = "Sep"; break;
          case 9: monthStr = "Oct"; break;
          case 10: monthStr = "Nov"; break;
          case 11: monthStr = "Dec"; break;
        }
        return (monthStr + dateSpace);
      }
    }
  }

}