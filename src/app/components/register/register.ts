import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterModule,],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
//     private route = Inject(ActivatedRoute);
//   form  = new FormGroup({
//     firstName : new FormControl('', [Validators.required]),
//     lastName: new FormControl('', Validators.required),
//     email: new FormControl ('', Validators.required),
//     password: new FormControl('', [Validators.required, Validators.minLength(8)])

//   })
//  private router = Inject (Router);

 
//   goToDashboard(){    
//     if(this.form.valid){
//           this.router.navigate[('/dashboard/dashboard.html')];
//           this.form.reset();
//           console.log(this.form.value)

//     }else if(this.form.invalid){                   
//       alert('Compilare tutti i campi obbligatori') 
//     }
//   }
}
