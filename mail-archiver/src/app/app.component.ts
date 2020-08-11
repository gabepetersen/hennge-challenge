import { Component } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
  
export class AppComponent {
  title = 'mail-archiver';
  searchToggle: boolean = false;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  toggleSearchBar() {
    this.searchToggle = !this.searchToggle;
  }
}
