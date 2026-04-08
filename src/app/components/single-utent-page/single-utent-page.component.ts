import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users-service';
import { AuthService } from '../../auth/auth-service';
import { PostService } from '../../services/post-service';
import { PostModel } from '../../models/post-model';

@Component({
  selector: 'app-single-utent-page',
  imports: [],
  templateUrl: './single-utent-page.component.html',
  styleUrl: './single-utent-page.component.css'
})
export class SingleUtentPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private userService = inject(UsersService);
  private postService = inject(PostService);
  private authService = inject(AuthService)
  private cdr = inject(ChangeDetectorRef)
  
   userDetails: any;     // salva i dati completi dell'utente
   posts: PostModel[] = [];

 ngOnInit(): void {
  this.getUserDetails()
 }


  getUserDetails(){
   const id  =  Number(this.route.snapshot.paramMap.get('id'));
    const userId = id !== 0 ? id : this.authService.getUserId();
   if(userId === 0) return;

   this.userService.getUserDetails(userId).subscribe((res) =>{
    this.userDetails = res;
    this.getPosts(userId);
    this.cdr.detectChanges();
    })

 }



 getPosts(userId: number){
  this.postService.getPostsByUserId(userId)
  this.postService.post$.subscribe((posts: PostModel[]) =>{
    this.posts = posts;
    this.posts.forEach(post =>{
      this.postService.getComment(post.id).subscribe(comments =>{
        post.comment = comments;
        this.cdr.detectChanges()
      })
    })
  })
 }


}
