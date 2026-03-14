import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostModel } from '../models/post-model';
import { CommentModel } from '../models/comment-model';
import { User } from '../models/users';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  private http = inject(HttpClient)
  private baseUrl = 'https://gorest.co.in/public/v2/users/'
  private commentUrl = 'https://gorest.co.in/public/v2/comments';
  private myToken = '9f79a463da6140766583d2d2fa30e7d197680a4168d9b7bd83fb5bdf501e6dec';
  private headers = new HttpHeaders({
    'Content-Type': 'Application/json',
    'Authorization': 'Bearer ' + this.myToken
  })
  post = new  BehaviorSubject<any>  ([])

  // create a new post
  createPost(post : PostModel, userId: User['id']){
    return this.http.post((`${this.baseUrl}${userId}/posts`), post, {headers: this.headers})
  }

  //delete a post
  deletePost(postId : PostModel['id'], userId: User['id']){
    return this.http.delete((`${this.baseUrl}${userId}/posts/${postId}`), {headers: this.headers})
  }
  
}
