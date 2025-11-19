import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { NgClass } from "@angular/common";
@Component({
  selector: 'app-events-page',
  imports: [MatButtonModule, MatSidenavModule, ],
  templateUrl: './events-page.html',
  styleUrl: './events-page.css'
})
export class EventsPage {

selectedIndex: number = 0

  buttonSelected(index: number) {
    this.selectedIndex = index;
  }

  tabs = [
    { label: 'All' },
    { label: 'Art' },
    { label: 'Tech' },
    { label: 'Business' },
    { label: 'Social' },
    { label: 'Book' },
    { label: 'Economy' }
  ]


}
