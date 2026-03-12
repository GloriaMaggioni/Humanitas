import { ChangeDetectorRef, Component, inject } from '@angular/core';
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

  //? ERRORE 500: IL SERVER DEL SITO NON FUNZIONA
  // TODO: GLI USER  CREATI DA ME NON COMPARIVANO NELLA TABELLA. COMPAIONO SOLO QUELLI GIà PRESENTI NEL SERVER
  private service = inject(UsersService);
  private cdr = inject(ChangeDetectorRef)
   displayedColumns : string[] = ['id', 'name', 'email', 'gender']

      users: User[] = []; // immagazzinati i dati 
      // searchUser: any[] = []  // immagazzina dati della ricerca dell'user



ngOnInit(): void {
  this.service.getUser();
  this.service.users$.subscribe(usersList => {
      this.users = usersList;
        this.cdr.detectChanges()
        console.log('Dati da utents-page', this.users)
        console.log('Dati di userList:', usersList)

  });

}

// metodo di filtro user

  filterUser(){
    this.service.searchUser.subscribe({
      next: (data: any) =>{
        this.users = this.users.filter(user => user.name.includes(data))
        console.log(this.users)
      },
      error: (error : any) => console.error("Errore nella ricerca dell'utente", error)
    })
  }

}
