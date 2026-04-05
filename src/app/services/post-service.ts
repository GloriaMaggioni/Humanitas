import { ChangeDetectorRef, inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostModel } from '../models/post-model';
import { CommentModel } from '../models/comment-model';
import { User } from '../models/users';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { SnackBar } from './snack-bar';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  private http = inject(HttpClient);

  private baseUrl : string = 'https://gorest.co.in/public/v2/users'
  private postUrl: string ='https://gorest.co.in/public/v2/posts';
  private commentUrl : string = 'https://gorest.co.in/public/v2/comments';
  private myToken = environment.GOREST_APIKEY;
   private userId : number = 8414033; // todo: da mettere poi in environment (?) e da agganciare alla autenticazione
   private snackBar = inject(SnackBar)

  //  /public/v2/users/8414033/posts/274998 --> struttura url per eliminare i post di un utente preciso

  private headers = new HttpHeaders({
    'Content-Type': 'Application/json',
    'Authorization': 'Bearer ' + this.myToken
  })

  post$ = new  BehaviorSubject<PostModel[]> ([]);    // immagazzina dati dei post
  totalPost$ = new BehaviorSubject<number>(0);      //  serve per prendere il tot dei post
  filteredPost$ = new BehaviorSubject<number>(0);    // prende i post filtrati in base agli id degli user
  comment$ = new BehaviorSubject<CommentModel[]>([])  // immagazzina i dati dei commenti

 // metodo che prende i post dal server
  getPost(pageNumber: number = 1, perPage : number = 20){
    this.http.get(`${this.postUrl}?page=${pageNumber}&per_page=${perPage}`, {headers: this.headers, observe: 'response'}).subscribe({
      next :(response : any) =>{
        this.post$.next(response.body)
        const totalPost = response.headers.get('X-Pagination-Total')
        this.totalPost$.next(Number(totalPost))
      },
      error: () => this.snackBar.openSnackBar('Errore nella ricezione dei post:')
    })
  }

  // create a new post
  createPost(post : PostModel, userId: User['id']){
    return this.http.post((`${this.baseUrl}/${userId}/posts`), post, {headers: this.headers})
  }

  //delete a post
  deletePost(postId : PostModel['id']){
    return this.http.delete((`${this.postUrl}/${postId}`), {headers: this.headers})
  }
  

    // metodo che prende i post basandosi sul id degli user
  getPostsByUserId(userId: number){
    this.http.get(`https://gorest.co.in/public/v2/users/${userId}/posts`, {headers: this.headers, observe: 'response'}).subscribe({
      next: (response: any) =>{
        this.post$.next(response.body);
        const totalFilteredPost = response.headers.get('X-Pagination-Total')
        this.filteredPost$.next(Number(totalFilteredPost))
      },
      error: (error: any) =>{
        this.snackBar.openSnackBar('Errore nella ricerca dei post:');
      } 
    })
  }

   // metodo che prende i commenti
  getComment(postId : PostModel['id'] | undefined){
    return this.http.get(`${this.postUrl}/${postId}/comments`, {headers:this.headers, observe: 'response'}).pipe(
      map((response: any) => response.body)
    )
  }

  // metodo che crea un nuovo commento
  createComment(comment : CommentModel, postId : PostModel['id']){
    return this.http.post((`${this.postUrl}/${postId}/comments`), comment, {headers: this.headers})
  }
}
