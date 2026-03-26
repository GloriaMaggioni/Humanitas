import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input,  OnInit  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { UsersService } from '../../services/users-service';
import { User } from '../../models/users';
import { SlicePipe } from '@angular/common';
import { SnackBar } from '../../services/snack-bar';

@Component({
  selector: 'app-homepage',
  imports: [RouterModule,  MatInputModule,RouterModule, SlicePipe],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
  private userService = inject(UsersService);
  private cdr = inject(ChangeDetectorRef);
  private snackBarService = inject(SnackBar)

  limit : number = 30;
  currentPage : number = 1;
  @Input() offset : number = (this.currentPage - 1) * this.limit;
  
  
  users : User[] = [];


  ngOnInit(): void {
    this.showUtents();
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

 
 


}