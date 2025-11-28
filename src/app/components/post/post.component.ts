
import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { CreatePostService } from '../../services/create-post.service';


@Component({
  selector: 'app-post',
  imports: [MatCardModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  content= '';
  fileSelected?: File;
  token = 'c4b96ee906b520a132c4e7b6e53b560f1e5f182ddafc3c968da651a76dcbeea6'
  constructor(private createPostService: CreatePostService){}
 onFileSelected(event: any): void{
  this.fileSelected = event.target.files[0]
 }

 onSubmit(): void{
  if(!this.content) return;

  this.createPostService.richiestaNuovoPost(this.token, this.content, this.fileSelected).subscribe({
    next: res => console.log('Creazione post corretta:', res),
    error: err => console.log('Errore nella creazione del post:', err)
  })
 }
  
} 
