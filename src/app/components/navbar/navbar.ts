import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef,inject,signal } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import { UsersService } from '../../services/users-service';
import { User } from '../../models/users';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { Post } from "../post/post";
import { SingleUtentPageComponent } from "../single-utent-page/single-utent-page.component";
import { PostService } from '../../services/post-service';
import { PostModel } from '../../models/post-model';
import { CommonModule } from '@angular/common';
import { SnackBar } from '../../services/snack-bar';
import { RouterLink } from "@angular/router";
import { error } from 'node:console';




@Component({
  selector: 'app-navbar',
  imports: [MatMenuModule, FormsModule, Post, ReactiveFormsModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  private userService = inject(UsersService);
  private postService = inject(PostService);
   private fb = inject(FormBuilder);
  private snackBar = inject(SnackBar);



   
isOpen = signal(false);
isCreate = signal(false);
testoDigitato: string = ''; // prende il testo digitato nella search bar 
searchUserId: number = 0;


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



newUserForm : FormGroup = this.fb.group({
  name: ['', Validators.required],
  gender: ['',Validators.required],
  email: ['', [Validators.required, Validators.email]],
  status: ['active', Validators.required]
});

 // resetta il form per creare il nuovo user
cleanForm(){
   this.newUser = {
    name: '',
    email: '',
    gender: '',
    status: 'active'
  };

}
   


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



 // metodo che aggiunge il nuovo utente

 addUser(){
   if(this.newUserForm.valid){
     this.userService.addUser(this.newUserForm.value as User).subscribe({
       next: (response: any) =>{
         this.userService.getUser()
         this.newUserForm.reset()
         this.snackBar.openSnackBar('Nuovo utente creato!')
      },
      error: (error : any) => this.snackBar.openSnackBar('Errore nella creazione del nuovo utente:')
      
    })
  } else  {
    this.snackBar.openSnackBar("Inserire campi del form validi:")
  }

 }




 // metodo che prende il nuovo testo digitato nella search bar e aggiorna i dati
findUser( ){
 this.userService.getUser(1, this.testoDigitato)
}


// TODO: NON FUNZIONA ,BISOGNA CAPIRE IL PERCHè
findPostByUserId(){
  if(this.testoDigitato  === ''){ 
    return  
  }else {
    const utent = this.userService.users$.getValue().find(user => user.name == this.testoDigitato);
 
 if(utent  && utent.id){
  this.postService.getPostsByUserId(utent.id);
  console.log('post da findPostNyUserId nella navbar:', utent.name)
 }else{
 console.warn('Attenzione: Nessun utente trovato o ID non disponibile per la ricerca dei post.');
  // this.snackBar.openSnackBar('Errore nella ricerca dei post:', )
  console.error('Errore ricerca post: Utente non trovato o ID mancante per', this.testoDigitato);

 } 
  }
 
} 

   
}
