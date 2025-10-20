import { Component, ElementRef, signal, ViewChild} from '@angular/core';
import { RouterLink } from "@angular/router";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {  NgClass, NgComponentOutlet,} from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { FormsModule } from "@angular/forms";
import {MatIconModule} from '@angular/material/icon';
import { Url } from 'url';

@Component({
  selector: 'app-sidebar',
  imports: [MatSidenavModule, MatButtonModule, MatListModule, FormsModule, MatIconModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
dashboard: string|readonly any[]|null|undefined;
events: string|readonly any[]|null|undefined;

  isOpen = signal(true);


  toggle(){
    this.isOpen.update(open => !open)
  
  }
  
 
}
