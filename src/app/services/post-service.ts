import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostModel } from '../models/post-model';
import { CommentModel } from '../models/comment-model';
import { User } from '../models/users';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { SnackBar } from './snack-bar';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  private http = inject(HttpClient)
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

  post$ = new  BehaviorSubject<PostModel[]> ([]);
  totalPost$ = new BehaviorSubject<number>(0);
  filteredPost$ = new BehaviorSubject<number>(0);
  comment$ = new BehaviorSubject<CommentModel[]>([])

  getPost(pageNumber: number = 1, perPage : number = 20){
    this.http.get(`${this.postUrl}?page=${pageNumber}&per_page=${perPage}`, {headers: this.headers, observe: 'response'}).subscribe({
      next :(response : any) =>{
        this.post$.next(response.body);
        const totalPost = response.headers.get('X-Pagination-Total')
        this.totalPost$.next(Number(totalPost))
        console.log('post tot:', response)
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
  

  getPostsByUserId(userId: number){
    this.http.get(`https://gorest.co.in/public/v2/users/${userId}/posts`, {headers: this.headers, observe: 'response'}).subscribe({
      next: (response: any) =>{
        this.post$.next(response.body);
        const totalFilteredPost = response.headers.get('X-Pagination-Total')
        this.filteredPost$.next(Number(totalFilteredPost))
        console.log('post filtrati tot:', response.body)

      },
      error: (error: any) =>{
        this.snackBar.openSnackBar('Errore nella ricerca dei post:');
        console.log('errore nel filtrtaggio:', error)
      } 
    })
  }

  // todo: da sistemare qui o nel componente per prendere uno solo comment per post

  getComment(){
    return this.http.get(`${this.commentUrl}`, {headers:this.headers, observe: 'response'}).subscribe({
      next: (response: any) =>{
        this.comment$.next(response.body);
        console.log('dati dei commenti:', this.comment$)
      }
    })
  }
}
