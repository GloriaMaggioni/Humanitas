import { Component} from '@angular/core';
import { RouterLink } from "@angular/router";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  imports: [MatSidenavModule, MatButtonModule,NgIf ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
 isCollapsed = false; //all'inizio non è chiusa

 chiudi(){
  this.isCollapsed = !this.isCollapsed;
 }
  
  
  
 
}
