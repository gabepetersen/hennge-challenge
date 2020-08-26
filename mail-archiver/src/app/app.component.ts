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
  public sortKey: string;
  public filteredData: Array<any>;
  searchToggle: boolean = false;

  // text filter control
  public textFilter: FormControl;
  // date form controls
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  get firstDate() { return this.range.get('start').value; }
  get secondDate() { return this.range.get('end').value; }

  constructor() {
    // search bar form control
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
    this.sortOrder = 'desc';
    this.sortKey = 'date';
    this.resetSort();
  }

  /*
   * Toggles the text with the search button
   */
  toggleSearchBar() {
    this.searchToggle = !this.searchToggle;
    // clear the text filter on clicking the button
    if (!this.searchToggle) {
      this.textFilter.setValue('');
      this.filterValues();
      this.resetSort();
    }
  }

  /*
   * Filters based on current search date filters and stores it in this.filteredData
   */
  public filterValues() {
    // Gather up text and date filters
    let firstDateTime = this.firstDate ? new Date(new Date(this.firstDate).setHours(0, 0, 0, 0)).getTime() - 1 : null;
    let secondDateTime = this.secondDate ? new Date(new Date(this.secondDate).setHours(23, 59, 59, 59)).getTime() : null;
    let textFilterValue = this.textFilter.value ? this.textFilter.value.trim().toLowerCase() : null;
    
    var filterCopy = this.dataSource;
    this.filteredData = filterCopy.filter((email) => {
      var dateCond = false;
      // ---- Examine Date Filter Condition ----
      if (firstDateTime && secondDateTime) {
        if ((email.date > firstDateTime) && (email.date < secondDateTime)) {
          dateCond = true;
        }
      } else if (firstDateTime) {
        if (email.date > firstDateTime) {
          dateCond = true;
        }
      } else if (secondDateTime) {
        if (email.date < secondDateTime) {
          dateCond = true;
        }  
      } else {
        dateCond = true;
      }
      // ---- Examine Search Filter Condition ----
      if ( textFilterValue ) {
        // return all the values under all of the keys in each email that include the search string (textFilterValue)
        return (Object.values(email).join(' ').toLowerCase().indexOf(textFilterValue) !== -1) && dateCond;
      } else {
        return dateCond;
      }
    });
  }

  /*
   * Toggles the sort of the data based on a header
   */
  public toggleSort(key: string) {
    this.sortKey = key;
    let sortedFilteredData = this.dataSource;
    var tempValue = this.sortToggleCheck[this.sortKey];
    // clear array
    this.sortToggleCheck = [];
    this.sortToggleCheck[this.sortKey] = tempValue;
    // check if 0 or null
    if (this.sortToggleCheck[this.sortKey]) {
      // if descending => change to ascending
      if (this.sortToggleCheck[this.sortKey] === 1) {
        this.sortToggleCheck[this.sortKey] = 2;
        // spread operator to create a copy of filteredData
        sortedFilteredData = [...this.filteredData].sort(this.compareValues(this.sortKey, 'asc'));
        this.sortOrder = 'asc';
      // if ascending => change to no sorting
      } else {
        // one for descending
        this.sortToggleCheck[this.sortKey] = 1;
        sortedFilteredData = [...this.filteredData].sort(this.compareValues(this.sortKey, 'desc'));
        this.sortOrder = 'desc';
      }
    } else {
      // one for descending
      this.sortToggleCheck[this.sortKey] = 1;
      sortedFilteredData = [...this.filteredData].sort(this.compareValues(this.sortKey, 'desc'));
      this.sortOrder = 'desc';
    }
    // put sorted data back into array
    this.filteredData = sortedFilteredData;
  }
  /*
   * Helper function to reset the sort to the current order
   */
  public resetSort() {
    let sortedFilteredData;
    if (this.sortOrder === 'asc') {
      this.sortToggleCheck[this.sortKey] = 2;
      sortedFilteredData = [...this.filteredData].sort(this.compareValues(this.sortKey, this.sortOrder));
      this.filteredData = sortedFilteredData;
    } else if (this.sortOrder == 'desc') {
      this.sortToggleCheck[this.sortKey] = 1;
      sortedFilteredData = [...this.filteredData].sort(this.compareValues(this.sortKey, this.sortOrder));
      this.filteredData = sortedFilteredData;
    }
  }

  /*
   * compare function for sorting an array of objects based on the key
   * this is so that the sort function can handle the date values (milliseconds) as well
   * referenced from: https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
   */
  public compareValues(key, order = 'desc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }
      const value1 = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
      const value2 = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
  
      let compare = 0;
      if (value1 > value2) {
        compare = 1;
      } else if (value1 < value2) {
        compare = -1;
      }
      return ( (order === 'desc') ? (compare * -1) : compare );
    };
  }

  /**
   * replace all the pseudo-newline characters in the json texts
   */
  public replaceBreaks(msgData: string) {
    return msgData.replace(/\n/g, "<br/>");
  }
}
