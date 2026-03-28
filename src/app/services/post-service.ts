import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostModel } from '../models/post-model';
import { CommentModel } from '../models/comment-model';
import { User } from '../models/users';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  private http = inject(HttpClient)
  private baseUrl : string = 'https://gorest.co.in/public/v2/users/'
  private postUrl: string ='https://gorest.co.in/public/v2/posts?per_page=30';
  private commentUrl : string = 'https://gorest.co.in/public/v2/comments';
  private myToken = environment.GOREST_APIKEY
  private headers = new HttpHeaders({
    'Content-Type': 'Application/json',
    'Authorization': 'Bearer ' + this.myToken
  })

  post$ = new  BehaviorSubject<PostModel[]> ([]);
  totalPost$ = new BehaviorSubject<number>(0);

  getPost(){
    this.http.get(`${this.postUrl}`, {headers: this.headers}).subscribe({
      next :(response : any) =>{
        this.post$.next(response)
        console.log('Dati dei post:', this.post$)
      },
      error: (error: any) => console.error('Errore nella ricezione dei post:', error)
    })
  }

  // create a new post
  createPost(post : PostModel, userId: User['id']){
    return this.http.post((`${this.baseUrl}${userId}/posts`), post, {headers: this.headers})
  }

  //delete a post
  deletePost(postId : PostModel['id'], userId: User['id']){
    return this.http.delete((`${this.baseUrl}${userId}/posts/${postId}`), {headers: this.headers})
  }
  
}
