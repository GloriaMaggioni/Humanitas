import { ChangeDetectorRef, Component, ElementRef, inject,  OnInit, output, Output, ViewChild } from '@angular/core';
import { PostModel } from '../../models/post-model';
import { PostService } from '../../services/post-service';
import {    FormsModule, NgForm } from '@angular/forms';
import { EventEmitter } from 'node:stream';

@Component({
  selector: 'app-post',
  imports: [ FormsModule],
  templateUrl: './post.html',
  styleUrl: './post.css',
})
export class Post  {
  private service = inject(PostService)

  private userId : string = "Id utente creata dall'autenticazione"    // TODO: COLLEGARE L'USERID ALLA AUTENTICAZIONE QUANDO VERRA' CREATA
   private cdr = inject(ChangeDetectorRef)
   @ViewChild('newPostForm') postForm! : NgForm
  //  @Output() postCreated : EventEmitter<void> = new EventEmitter<void>()
    postCreated = output<void>()


  newPost : PostModel = {       // inizializza i dati del post 
    name: '',
    data: '',
    description: '',
    comment : []
  };
 

 
   addNewPost(){
    if(this.postForm.valid){
        this.service.createPost(this.newPost, this.userId). subscribe({         // userId provvisorio ---> collegarla all'autenticazione
     next : (data: any) =>{
      this.newPost = data;
      this.postCreated.emit()
      this.postForm.reset();
      // this.cdr.detectChanges();
       console.log('Dati del nuovo post inviati', data)
     },
     error : (err : any) =>{       
      console.error('Errore nel creare il nuovo post:', err)
      }
    })

    }

    
 }

 

}
