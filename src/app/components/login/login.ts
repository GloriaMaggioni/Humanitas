import { Component, Inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule, Router,  } from "@angular/router";
import{FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms"
import { error } from 'node:console';
@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterModule, 
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  //private route = Inject(ActivatedRoute);
//   form  = new FormGroup({
//     email: new FormControl ('', Validators.required),
//     password: new FormControl('', [Validators.required, Validators.minLength(8)])

//   })
//  private router = Inject (Router);

 
//   goToDashboard() : void{    
//     if(this.form.valid){
//           this.router.navigate[('/dashboard')]
//           console.log(this.form.value)

//     }else if(this.form.invalid){                 
//       alert('Compilare tutti i campi obbligatori') 
//     }
//   }


//   goToRegisterPage(){
//     this.router.navigate[('/register/register.html')];
//     console.log('navigazione a register richiesta')
  
//   }

}
