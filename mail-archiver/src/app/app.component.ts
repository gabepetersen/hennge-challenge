import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import emailData from '../data/emailData.json';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
  
export class AppComponent {
  title = 'mail-archiver';
  public dataSource: any;

  constructor() {
    this.dataSource = emailData;
  }
  searchToggle: boolean = false;
  
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  toggleSearchBar() {
    this.searchToggle = !this.searchToggle;
  }
}
