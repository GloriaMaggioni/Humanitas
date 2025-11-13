import { HttpClient } from '@angular/common/http';
import { Component, ElementRef,signal } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import { CreatePostService } from '../../services/create-post.service';
import { PostComponent } from '../post/post.component';



@Component({
  selector: 'app-navbar',
  imports: [MatMenuModule, PostComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  // da sistemare per renderlo funzionante e dinamico
userImgPanel = [
  {image : 'Immagine'},
  { nome: 'Nome'},
  {cognome: 'Cognome'},
  { profilo: '/components/single-utent-page.html'}
]
   

isOpen = false;
isCreate = signal(false);

createPost() {
  this.isOpen = !this.isOpen;
  if(this.isCreate() == true){
    this.isOpen =  false;
  }
}

createNewUser(){
    this.isCreate.update(open => !open);
     if(this.isOpen == true){
    this.isCreate.set(false);
  }
}
  
  






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
