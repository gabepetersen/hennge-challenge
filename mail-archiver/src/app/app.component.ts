import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import emailData from '../data/emailData.json';
import { CustomDatePipe } from './pipes/custom-date.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ CustomDatePipe ]
})
  
export class AppComponent {
  public sortOrder: string;
  public dataSource: any;
  public currentDate: Date;
  public sortToggleCheck: Array<any>;
  public filteredData: Array<any>;
  searchToggle: boolean = false;

  public textFilter: FormControl;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor() {
    this.textFilter = new FormControl();
    this.dataSource = emailData;
    this.filteredData = this.dataSource;
    this.sortToggleCheck = [];
    // change date formats in data
    this.currentDate = new Date();
    this.dataSource.forEach((email) => {
      email.date = new Date(email.date).getTime();
    });
    // automatically set the sorting based on date
    this.sortOrder = 'asc';
    this.resetSort('date');
  }

  get firstDate() { return this.range.get('startDateTime').value; }
  get secondDate() { return this.range.get('endDateTime').value; }

  toggleSearchBar() {
    this.searchToggle = !this.searchToggle;
    // clear the text filter on clicking the button
    if (!this.searchToggle) {
      this.textFilter.setValue('');
    }
  }

  /*
   * Filters based on current search date filters and stores it in this.filteredData
   */
  public filterString() {
    let firstDateTime = this.firstDate ? new Date(new Date(this.firstDate).setHours(0, 0, 0, 0)).getTime() : '';
    let secondDateTime = this.secondDate ? new Date(new Date(this.secondDate).setHours(23, 59, 59, 59)).getTime() : '';
    let textFilterValue = this.textFilter.value ? this.textFilter.value.trim().toLowerCase() : '';
    
    var filterCopy = this.dataSource;
    this.filteredData = filterCopy.filter((email) => {
      // if the date filter is valid and the email date falls within the date range
      if ( (email.date < firstDateTime) || (email.date > secondDateTime) ) {
        return false;
      } else {
        if (textFilterValue != '') {
          // return all the values under all of the keys in each email that include the search string (textFilterValue)
          return (Object.values(email).join(' ').toLowerCase().indexOf(textFilterValue) !== -1);
        }
      }
    });
  }

  /*
   * Toggles the sort of the data based on a header
   */
  public toggleSort(key: string) {
    let sortedFilteredData;
    // clear array first
    this.sortToggleCheck.forEach((x) => {
      x = 0;
    });
    // check if 0 or null
    if (this.sortToggleCheck[key]) {
      // if descending => change to ascending
      if (this.sortToggleCheck[key] === 1) {
        this.sortToggleCheck[key] = 2;
        sortedFilteredData = [...this.filteredData].sort(this.compareValues(key, 'asc'));
      } else {
        this.filteredData = this.dataSource;
      }
    } else {
      // one for descending
      this.sortToggleCheck[key] = 1;
      // spread operator to create a copy of dataSource
      sortedFilteredData = [...this.filteredData].sort(this.compareValues(key, 'desc'));
    }
    // put sorted data back into array
    this.filteredData = sortedFilteredData;
    // for testing
    console.log(this.sortToggleCheck);
  }
  /*
   * Helper function to reset the sort to the current order
   */
  public resetSort(key) {
    let sortedFilteredData;
    if (this.sortOrder === 'asc') {
      this.sortToggleCheck[key] = 2;
      sortedFilteredData = [...this.filteredData].sort(this.compareValues(key, 'asc'));
      this.filteredData = sortedFilteredData;
    } else if (this.sortOrder == 'desc') {
      this.sortToggleCheck[key] = 1;
      sortedFilteredData = [...this.filteredData].sort(this.compareValues(key, 'desc'));
      this.filteredData = sortedFilteredData;
    }
  }

  /*
   * compare function for sorting an array of objects based on the key
   * referenced from: https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
   */
  public compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
      const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }
}
