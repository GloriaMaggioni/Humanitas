import { ChangeDetectorRef, Component, inject, Input, signal } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { UsersService } from '../../services/users-service';
import { User } from '../../models/users';
import { OnInit } from '@angular/core';
import { Paginator } from "../paginator/paginator";
import { AsyncPipe } from '@angular/common';



@Component({
  selector: 'app-utents-page',
  imports: [MatTableModule,Paginator,AsyncPipe],
  templateUrl: './utents-page.component.html',
  styleUrl: './utents-page.component.css'
})
export class UtentsPageComponent  implements OnInit{
  private userService = inject(UsersService)
  private cdr = inject(ChangeDetectorRef)
  limit : number = 30
  currentPage : number = 1
  @Input() offset : number = (this.currentPage - 1) * this.limit;

  // idUser : number = 0

  users$ = this.userService.users$;
  totalUser : number = 0;           


ngOnInit(): void {
  this.userService.getUser()
  this.userService.totalUser$.subscribe( totalPage =>{
    this.totalUser = totalPage;
    this.cdr.detectChanges()
  })
}

onChangePage(pageNumber: number){
  if( pageNumber < 1) return 

  this.currentPage = pageNumber
 
   this.offset = (this.currentPage - 1) * this.limit
  this.userService.getUser(pageNumber)
}


onDeleteUser(userId: number | undefined ){
 this.userService.deleteUser(userId ).subscribe({
 next: (data : any) =>{
    alert('Utente eliminato');
    this.userService.getUser()
    this.cdr.detectChanges()
  },
  error: (error : any) =>{
    alert("Errore nella eliminazione dell'utente")
  }
 })

}

// metodo di filtro user

//  findUser(){
//   this.userService.searchUser$.subscribe({
//     next: (data: any) =>{
//       this.users$.filter((user : any) => {
//         this.users$ = user.name.include(data)
//       })
//     }
//   })
//  }



}
