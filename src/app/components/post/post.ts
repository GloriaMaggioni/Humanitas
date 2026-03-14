import { Component, inject, OnInit } from '@angular/core';
import { PostModel } from '../../models/post-model';
import { PostService } from '../../services/post-service';

@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.html',
  styleUrl: './post.css',
})
export class Post implements OnInit {
  private service = inject(PostService)

  newPost : PostModel = {       // inizializza i dati del post 
    name: '',
    data: '',
    description: '',
    comment : []
  };
  ngOnInit(): void {
    
  }

 
   addNewPostClick(){
   this.service.createPost(this.newPost, this.newPost.id). subscribe({
    next : (data: any) =>{
      console.log('Dati del nuovo post:', data)
    },
    error : (err : any) =>{       console.error('Errore nel creare il nuovo post:', err)
     }
   })
 }

 // resetta il form
 cleanForm(){   //TODO: VEDERE DOVA VA ATTACCATO PER RESETTARE IL FORM
  this.newPost = {
    name: '',
    data: '',
    description: '',
    comment : []

  }
 }

}
