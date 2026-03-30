import { Component, inject, Input, OnInit } from '@angular/core';
import { PostService } from '../../services/post-service';
import { AsyncPipe } from '@angular/common';
import { SnackBar } from '../../services/snack-bar';
import { ChangeDetectorRef } from '@angular/core';
import { Paginator } from "../paginator/paginator";

@Component({
  selector: 'app-posts-page',
  imports: [AsyncPipe, Paginator],
  templateUrl: './posts-page.html',
  styleUrl: './posts-page.css',
})
export class PostsPage implements OnInit {
 private postService = inject(PostService);
 private snackBar = inject(SnackBar);
 private cdr = inject(ChangeDetectorRef);

  limit : number = 20;
  currentPage : number = 1;
  @Input() offset : number = (this.currentPage - 1) * this.limit;



 posts$ = this.postService.post$;
 totalPost : number = 0;

  ngOnInit(): void {
    this.postService.getPost()
    this.postService.totalPost$.subscribe( totalPage =>{
      this.totalPost = totalPage;
      this.cdr.detectChanges()
    })
    
  }



 // todo: capire perchè non funziona e se userId serve
  deletePost(postId: number | undefined){
    this.postService.deletePost(postId).subscribe({
      next: (data: any)=> {
        this.postService.getPost();
        this.snackBar.openSnackBar('Post eliminato con successo!');
        this.cdr.detectChanges();
        
      },
      error: () => this.snackBar.openSnackBar('Errore nella eliminazione del post')
  
    })
  }


  changePage(pageNumber : number){
    if(pageNumber < 1) return;

    this.currentPage = pageNumber;
    this.offset = this.offset
    this.postService.getPost(pageNumber)

  }
}
