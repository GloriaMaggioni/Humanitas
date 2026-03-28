import { Component, inject, OnInit } from '@angular/core';
import { PostService } from '../../services/post-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-posts-page',
  imports: [AsyncPipe],
  templateUrl: './posts-page.html',
  styleUrl: './posts-page.css',
})
export class PostsPage implements OnInit {
 private postService = inject(PostService)

 posts$ = this.postService.post$;
 totalPost : number = 0;

  ngOnInit(): void {
    this.postService.getPost()
    this.postService.totalPost$.subscribe( totalPage =>{
      this.totalPost = totalPage;
    })
  }

}
