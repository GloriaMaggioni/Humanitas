import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject,  OnInit, output, Output, ViewChild } from '@angular/core';
import { PostModel } from '../../models/post-model';
import { PostService } from '../../services/post-service';
import {    FormsModule, NgForm } from '@angular/forms';
import { EventEmitter } from 'node:stream';

@Component({
  selector: 'app-post',
  imports: [ FormsModule, ],
  templateUrl: './post.html',
  styleUrl: './post.css',
})
export class Post  {
  private service = inject(PostService)

  private userId : number =  8399218;    // TODO: COLLEGARE L'USERID ALLA AUTENTICAZIONE QUANDO VERRA' CREATA
   private cdr = inject(ChangeDetectorRef)
   @ViewChild('newPostForm') postForm! : NgForm
    postCreated = output<void>()       // event emitter



  newPost : PostModel = {       // inizializza i dati del post 
    user_id: 23,
    title: 'test per il nuovo post',
    body: 'post di prova',
    comment : []
  };
 

 
   addNewPost(){
    if(this.postForm.valid){
        this.service.createPost(this.newPost, this.userId). subscribe({         // userId provvisorio ---> collegarla all'autenticazione
     next : (data: any) =>{
      this.newPost = data;
      this.postCreated.emit()
      this.postForm.reset();
      this.cdr.detectChanges();
       console.log('Dati del nuovo post inviati', data);
       console.log('DATI DAL POST FORM:', this.newPost)
     },
     error : (err : any) =>{       
      console.error('Errore nel creare il nuovo post:', err)

      }
    })

    }

    
 }

 

}
