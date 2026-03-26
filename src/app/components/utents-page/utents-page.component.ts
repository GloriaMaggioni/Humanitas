import { ChangeDetectorRef, Component, inject, Input, signal } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { UsersService } from '../../services/users-service';
import { OnInit } from '@angular/core';
import { Paginator } from "../paginator/paginator";
import { AsyncPipe } from '@angular/common';
import { SnackBar } from '../../services/snack-bar';



@Component({
  selector: 'app-utents-page',
  imports: [MatTableModule,Paginator,AsyncPipe],
  templateUrl: './utents-page.component.html',
  styleUrl: './utents-page.component.css'
})
export class UtentsPageComponent  implements OnInit{
  private userService = inject(UsersService);
  private cdr = inject(ChangeDetectorRef);
  private snackBarService = inject(SnackBar)
  
  limit : number = 30;
  currentPage : number = 1;
  @Input() offset : number = (this.currentPage - 1) * this.limit;


  users$ = this.userService.users$;
  totalUser : number = 0; 


ngOnInit(): void {
  this.userService.getUser()
  this.userService.totalUser$.subscribe( totalPage =>{
    this.totalUser = totalPage;
    this.cdr.detectChanges()
  })
}


// metodo per il cambio pagina
onChangePage(pageNumber: number){
  if( pageNumber < 1) return 

  this.currentPage = pageNumber;
  this.offset = (this.currentPage - 1) * this.limit;
  this.userService.getUser(pageNumber);
}


// metodo per eliminare al click l'utente scielto
onDeleteUser(userId: number | undefined ){
 this.userService.deleteUser(userId ).subscribe({
 next: (data : any) =>{
    this.userService.getUser();
    this.snackBarService.openSnackBar('Utente eliminato!');
    this.cdr.detectChanges();
  },
  error: (error : any) => this.snackBarService.openSnackBar('Eliminazione utente non riuscita:')
  
 })

}




}


