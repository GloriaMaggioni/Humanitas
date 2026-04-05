import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { PostService } from '../../services/post-service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SnackBar } from '../../services/snack-bar';
import { ChangeDetectorRef } from '@angular/core';
import { Paginator } from "../paginator/paginator";
import { CommentModel } from '../../models/comment-model';
import { PostModel } from '../../models/post-model';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-posts-page',
  imports: [AsyncPipe, Paginator, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './posts-page.html',
  styleUrl: './posts-page.css',
})
export class PostsPage implements OnInit {
 private postService = inject(PostService);
 private snackBar = inject(SnackBar);
 private cdr = inject(ChangeDetectorRef);
 private fb = inject(FormBuilder)

  limit : number = 20;
  currentPage : number = 1;
  @Input() offset : number = (this.currentPage - 1) * this.limit;

   posts$ = this.postService.post$;
   totalPost : number = 0;
   isOpen = signal(false);
   isCreate = signal(false);

   private postId: number | undefined=  275614; // TODO: DA SISTEMARE DINAMICAMENTE

  newCommentForm : FormGroup = this.fb.group({
     name: ['', Validators.required],
     email: ['', [Validators.required, Validators.email]],
     body: ['', Validators.required],
  })


  openCommentModal(postId? : number | undefined){
    console.log('isCreate prima:', this.isCreate())
    this.isCreate.update(open => !open);
     console.log('isCreate dopo:', this.isCreate());
     this.postId = postId
    if(this.isOpen() == true){
      this.isCreate.set(false)
    }
    this.isOpen.set(false)
  }



  ngOnInit(): void {
    this.postService.getPost()
    this.postService.totalPost$.subscribe( totalPage =>{
      this.totalPost = totalPage;
      this.cdr.detectChanges()
    })
    this.postService.post$.subscribe(posts =>{
       posts.forEach((post:PostModel) =>{
        this.postService.getComment(post?.id).subscribe( (totalComments)=> {
          post.comment = totalComments
          this.cdr.detectChanges()

        })
      });
    
    })
    this.cdr.detectChanges()
  }

onSubmit(){
  this.addComment()
}


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

  addComment(){
    if(this.newCommentForm.valid){
      this.postService.createComment(this.newCommentForm.value as CommentModel, this.postId).subscribe({
        next: (response :any) =>{
          this.postService.getComment(this.postId).subscribe(comments =>{
            const post = this.postService.post$.getValue().find((comment) =>comment.id === this.postId)
            if(post){
              post.comment = comments
            }
          })
           this.newCommentForm.reset();
          this.cdr.detectChanges();
          this.snackBar.openSnackBar('Nuovo commento creato con successo!')
        },
        error: (err: any) => this.snackBar.openSnackBar('Errore nella creazione del nuovo commento:', err)
      })

    }
  }

  // metodo per eliminare un comment
  deleteComment(commentId : number | undefined, postId: number | undefined){
    this.postService.deleteComment(commentId).subscribe({
      next: () => {
        this.postService.getComment(postId).subscribe((totalComments) =>{
          const post = this.postService.post$.getValue().find(post => post.id === postId);
          if(post){
             post.comment = totalComments;
             this.cdr.detectChanges()
          }

        })
         this.snackBar.openSnackBar('Eliminato  commento con successo!');
        this.cdr.detectChanges();
      },
      error: (error : any) =>{ this.snackBar.openSnackBar('Errore nella eliminazione del commento:', error); 
        console.error('Errore nella eliminazione:', error)
      }
    })
    // console.log('Commento eliminato', id)
  }



  // metodo per cambio pagina con in btns del paginator
  changePage(pageNumber : number){
    if(pageNumber < 1) return;

    this.currentPage = pageNumber;
    this.offset = this.offset
    this.postService.getPost(pageNumber)

  }
}
