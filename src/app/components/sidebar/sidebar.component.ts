import { Component, ElementRef, signal, ViewChild, afterNextRender} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from "@angular/router";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { NgClass, NgComponentOutlet } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { FormsModule } from "@angular/forms";
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-sidebar',
  imports: [MatSidenavModule, MatButtonModule, MatListModule, FormsModule, MatIconModule, RouterModule ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {


  isOpen = signal(true);

  constructor(){           // carica la sidebar aperta solo dopo che il browser abbia completato il render
      setTimeout(() => {
        this.isOpen.set(true);
      }, 0)
  }

 items = [
    {
      link: ' ',
      icon: '/assets/images/home-icon2.svg',
      label: 'Home'
    },
     {
      link: 'events',
      icon: '/assets/images/event-icon2.svg',
      label: 'Events'
    },
     {
      link: 'history',
      icon: '/assets/images/history-icon2.svg',
      label: 'History'
    },
     {
      link: 'future',
      icon: '/assets/images/future-icon2.svg',
      label: 'Future'
    },
     {
      link: 'spaziCulturali',
      icon: '/assets/images/p&s-icon2.svg',
      label: 'Spazi Culturali'
    },
     {
      link: 'utents',
      icon: '/assets/images/utents-icon2.svg',
      label: 'Utents'
    },
   
    
  ] 

  setting = [ 
  {
     link: 'settings',
      icon: '/assets/images/setting-icon2.svg',
      label: 'Setting'
    }
  ];
  logout = [
    {
      link: '/login',
      icon: '/assets/images/logout-icon2.svg',
      label: 'Logout'
    }
  ]

  toggle(){
    this.isOpen.update(open => !open)
  }
  
}




