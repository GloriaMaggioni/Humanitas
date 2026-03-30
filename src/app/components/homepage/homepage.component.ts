import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input,  OnInit  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { UsersService } from '../../services/users-service';
import { User } from '../../models/users';
import { SlicePipe } from '@angular/common';
import { SnackBar } from '../../services/snack-bar';
import { PostService } from '../../services/post-service';
import { Post } from '../post/post';
import { PostModel } from '../../models/post-model';

@Component({
  selector: 'app-homepage',
  imports: [RouterModule,  MatInputModule,RouterModule, SlicePipe],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
  private userService = inject(UsersService);
  private postService = inject(PostService);
  private cdr = inject(ChangeDetectorRef);
  private snackBarService = inject(SnackBar)

  limit : number = 30;
  currentPage : number = 1;
  @Input() offset : number = (this.currentPage - 1) * this.limit;
  
  
  users : User[] = [];
  posts : PostModel[] = [];


  ngOnInit(): void {
    this.showUtents();
    this.showPosts()
  }

   // metodo per mostrare gli utenti nella homepage
  showUtents(){
    this.userService.getUser(1, undefined, 6)
    this.userService.users$.subscribe({
      next: (data: any) =>{
        this.users = data;
        this.cdr.detectChanges();
      }
    })
    
  }


  //  metodo per eliminare gli utenti: sincronizzato con quello della utents-page
  deleteUser(userId: number | undefined){
    this.userService.deleteUser(userId).subscribe({
      next : (data: any) =>{
        this.userService.getUser();
           this.snackBarService.openSnackBar('Utente eliminato!');
            this.cdr.detectChanges();
      },
      error : (err: any) =>  this.snackBarService.openSnackBar('Eliminazione utente non riuscita:')
    })
    
  }

 showPosts(){
  this.postService.getPost(1,6)
    this.postService.post$.subscribe({
      next: (data:any) =>{
        this.posts = data;
        this.cdr.detectChanges()
      }
    })

 }
 deletePost(postId : PostModel['id']){
  this.postService.deletePost(postId).subscribe({
     next : (data: any) =>{
        this.postService.getPost();
           this.snackBarService.openSnackBar('Post eliminato!');
            this.cdr.detectChanges();
      },
      error : (err: any) =>  this.snackBarService.openSnackBar('Eliminazione post non riuscita:')

  })
 }
 


}