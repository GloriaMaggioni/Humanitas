import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-events-page',
  imports: [MatButtonModule,MatSidenavModule],
  templateUrl: './events-page.html',
  styleUrl: './events-page.css'
})
export class EventsPage {
showFiller = false;

mostra = false;
}
