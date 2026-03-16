import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef,inject,signal } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import { UsersService } from '../../services/users-service';
import { User } from '../../models/users';
import { Event } from '@angular/router';
import { FormControl, FormGroup, FormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { Post } from "../post/post";
import { SingleUtentPageComponent } from "../single-utent-page/single-utent-page.component";
import { PostService } from '../../services/post-service';
import { PostModel } from '../../models/post-model';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-navbar',
  imports: [MatMenuModule, FormsModule, Post, SingleUtentPageComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  private userService = inject(UsersService);


  // da sistemare per renderlo funzionante e dinamico
userImgPanel = [  // TODO: vedere che cosa è e se serve
  {image : 'Immagine'},
  { nome: 'Nome'},
  {cognome: 'Cognome'},
  { profilo: '/components/single-utent-page.html'}
]
  newUser : User = {   // inizializzato i parametri del model user: campi obbligatori
    name: '',
    email: '',
    gender: '',
    status: 'active'      
  } ;

 
   

isOpen = signal(false);
isCreate = signal(false);
testoDigitato: string = ''; // prende il testo digitato nella search bar (newText)

createPost() {
  this.isOpen.update(open => !open)
  if(this.isCreate() == true){
    this.isOpen.set(false)
  }
}
 
// apre/chiude il modal per creare il nuovo user
 openNewUserForm(){
     this.isCreate.update(open => !open);
      if(this.isOpen() == true){
     this.isCreate.set(false);
    
     this.addUserClick()

  }
   this.cleanForm();     
    

 }

// aggiungere i dati del nuovo user
 addUserClick(){
  this.userService.addUser( this.newUser).subscribe({
    next: (data: any) =>{
      const currentUser = this.userService.users$.getValue();
     currentUser.push(data);
      this.userService.users$.next(currentUser)
      console.log('Dati da addUserClick', data)
    } ,
    error: (err: any) => console.error('Errore nel creare il nuovo user', err)    
  })
 }

 // resetta il form per creare il nuovo user
cleanForm(){
   this.newUser = {
    name: '',
    email: '',
    gender: '',
    status: 'active'
  };

}

// metodo che prende il nuovo testo digitato nella search bar e aggiorna i dati
findUser(newText: string){
 this.userService.searchUser.next(newText)

}



   
}
