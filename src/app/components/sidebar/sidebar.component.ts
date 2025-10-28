import { Component, ElementRef, signal, ViewChild} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from "@angular/router";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule, NgClass, NgComponentOutlet } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { FormsModule } from "@angular/forms";
import {MatIconModule} from '@angular/material/icon';
import { Url } from 'url';

@Component({
  selector: 'app-sidebar',
  imports: [MatSidenavModule, MatButtonModule, MatListModule, FormsModule, MatIconModule,RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

dashboard: string|readonly any[]|null|undefined;
events: string|readonly any[]|null|undefined;
largeLogo = '/assets/images/logo-blackGold.png';
smallLogo = 'assets/images/logoImg-2.svg';


  isOpen = signal(true);
  currentLogo = this.largeLogo;



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
      link: 'placesandspaces',
      icon: '/assets/images/p&s-icon2.svg',
      label: 'Places & Spaces'
    },
     {
      link: 'productivityandhealth',
      icon: '/assets/images/p&h-icon2.svg',
      label: 'Productivity & Health'
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
    this.currentLogo = this.isOpen() ? this.largeLogo : this.smallLogo;
  
  }



}
