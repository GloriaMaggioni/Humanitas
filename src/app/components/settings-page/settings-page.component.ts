import { Component,  inject,  signal } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { SingleUtentPageComponent } from "../single-utent-page/single-utent-page.component";
import { PostsPage } from "../posts-page/posts-page";
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-settings-page',
  imports: [SingleUtentPageComponent, PostsPage],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css'
})
export class SettingsPageComponent {
  isPanelOpen = signal('profilo');
 authService = inject(AuthService)


  panel(type: string){
     this.isPanelOpen.set(type)
   
  }

}
