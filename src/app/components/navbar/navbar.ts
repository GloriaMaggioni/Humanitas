import { HttpClient } from '@angular/common/http';
import { Component, ElementRef,signal } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import { CreatePostService } from '../../services/create-post.service';
import { PostComponent } from '../post/post.component';
import { MatAnchor } from "@angular/material/button";



@Component({
  selector: 'app-navbar',
  imports: [MatMenuModule,],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

userImgPanel = [
  {image : 'Immagine'},
  { nome: 'Nome'},
  {cognome: 'Cognome'},
  { profilo: '/components/single-utent-page.html'}
]
   


  
  






  // CreatePostService: any;

 //INSERISCO LA PARTE FINALE DELLA LOGICA PER CREARE IL POST
  //   constructor(private postService : CreatePostService){}

  // create(){
  //   const newPost : PostComponent = {
  //        nome: "Nome dell'utente",
  //        content: "Contenuto del post"
  //   };

  //    this.CreatePostService.createPost(PostComponent).subscribe({
  //     next : (res: any) => console.log('Funziona', res),
  //     error : (res: any) => console.log('Non funziona')
  //   });
  // }


   
}
