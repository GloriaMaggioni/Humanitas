import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { UsersService } from '../../services/users-service';
import { User } from '../../models/users';
import { OnInit } from '@angular/core';
import { Paginator } from "../paginator/paginator";

export interface UsersTable {
  id: number,
  name: string,
  email: string,
  gender: string,

}

@Component({
  selector: 'app-utents-page',
  imports: [MatTableModule,Paginator],
  templateUrl: './utents-page.component.html',
  styleUrl: './utents-page.component.css'
})
export class UtentsPageComponent  implements OnInit{


  // TODO: GLI USER  CREATI DA ME NON COMPARIVANO NELLA TABELLA. COMPAIONO SOLO QUELLI GIà PRESENTI NEL SERVER
  private service = inject(UsersService);
  private cdr = inject(ChangeDetectorRef)

  @Input() limit : number = 30;           // user per page
   @Input() currentPage : number = 1
   offset :  number = (this.currentPage - 1) * this.limit;       // punto di inizio
   @Input() totalUser : number = 0;
   
   displayedColumns : string[] = ['id', 'name', 'email', 'gender']

      users: User[] = []; // immagazzinati i dati 



ngOnInit(): void {
  this.service.getUser();
  this.service.users$.subscribe(usersList => {
      this.users = usersList;
      this.totalUser = 10000;
        this.cdr.detectChanges()
        console.log('Dati di userList in ngOnInit:', usersList)

  });

}

// metodo di filtro user

  filterUser(){
    this.service.searchUser.subscribe({
      next: (data: any) =>{
        this.users = this.users.filter(user => user.name.includes(data))
        // console.log('Dati da filterUser:', this.users)
      },
      error: (error : any) => console.error("Errore nella ricerca dell'utente", error)
    })
  }

    onChangePage(pageNumber : number){
    if( pageNumber < 1) return     // controllo per valori negativi: se false ferma tutto
   
    this.currentPage =  pageNumber;
    this.offset =  (this.currentPage - 1) * this.limit;
     this.service.getUser(pageNumber)
    
 }

}
