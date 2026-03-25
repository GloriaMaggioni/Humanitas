import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef,inject,signal } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import { UsersService } from '../../services/users-service';
import { User } from '../../models/users';
import { Event } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { Post } from "../post/post";
import { SingleUtentPageComponent } from "../single-utent-page/single-utent-page.component";
import { PostService } from '../../services/post-service';
import { PostModel } from '../../models/post-model';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-navbar',
  imports: [MatMenuModule, FormsModule, Post, SingleUtentPageComponent, ReactiveFormsModule],
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
testoDigitato: string = ''; // prende il testo digitato nella search bar 

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
  }
   this.cleanForm();     
   this.isOpen.set(false)
    

 }
 onSubmit(){
  this.addUser()
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

private fb = inject(FormBuilder)

newUserForm : FormGroup = this.fb.group({
  name: ['', Validators.required],
  gender: ['',Validators.required],
  email: ['', [Validators.required, Validators.email]],
  status: ['active', Validators.required]
})

 addUser(){
   if(this.newUserForm.valid){
     this.userService.addUser(this.newUserForm.value as User).subscribe({
       next: (response: any) =>{
         this.userService.getUser()
         this.newUserForm.reset()
         console.log('Dati del nuovo user', response)
      },
      error: (error : any) =>{
        console.error('Errore nella creazione del nuovo utente:', error);
       alert(error)
      }
     })
  } else {
    alert("Inserire campi del form validi")
  }

 }




  

 // metodo che prende il nuovo testo digitato nella search bar e aggiorna i dati
findUser( ){
 this.userService.getUser(1, this.testoDigitato)
}

   
}
