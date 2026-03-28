import { Component, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { SingleUtentPageComponent } from "../single-utent-page/single-utent-page.component";
import { PostsPage } from "../posts-page/posts-page";

@Component({
  selector: 'app-settings-page',
  imports: [SingleUtentPageComponent, PostsPage],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css'
})
export class SettingsPageComponent {
  isPanelOpen = signal('');

  panel(type: string){
     this.isPanelOpen.set(type)
   
  }

}
