import { Component, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { SingleUtentPageComponent } from "../single-utent-page/single-utent-page.component";
import { Post } from "../post/post";

@Component({
  selector: 'app-settings-page',
  imports: [SingleUtentPageComponent, Post],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css'
})
export class SettingsPageComponent {
  isPanelOpen = signal('');

  panel(type: string){
     this.isPanelOpen.set(type)
   
  }

}
