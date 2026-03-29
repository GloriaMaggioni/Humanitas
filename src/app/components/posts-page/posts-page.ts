import { Component, inject, OnInit } from '@angular/core';
import { PostService } from '../../services/post-service';
import { AsyncPipe } from '@angular/common';
import { SnackBar } from '../../services/snack-bar';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-posts-page',
  imports: [AsyncPipe],
  templateUrl: './posts-page.html',
  styleUrl: './posts-page.css',
})
export class PostsPage implements OnInit {
 private postService = inject(PostService);
 private snackBar = inject(SnackBar);
 private cdr = inject(ChangeDetectorRef);
  //  private userId : number = 8414033;

 posts$ = this.postService.post$;
 totalPost : number = 0;

  ngOnInit(): void {
    this.postService.getPost()
    this.postService.totalPost$.subscribe( totalPage =>{
      this.totalPost = totalPage;
    })
  }



 // todo: capire perchè non funziona e se userId serve
  deletePost(postId: number | undefined){
    this.postService.deletePost(postId).subscribe({
      next: (data: any)=> {
        this.postService.getPost();
        this.snackBar.openSnackBar('Post eliminato!');
        this.cdr.detectChanges();
        console.log('post eliminato:', data)
      },
      error: (error : any) =>{
         this.snackBar.openSnackBar('Errore nella eliminazione del post');
         console.error('Errore per cancellare post:', error)
      } 
    })
  }

}
