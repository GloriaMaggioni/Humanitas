import { Component, inject, Inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule, Router,  } from "@angular/router";
import{FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms"
import { AuthService } from '../../auth/auth-service';

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
  private authService = inject(AuthService)
  private router = inject(Router)

onSubmit(loginForm : NgForm){
  const email = loginForm.value.email;
  const password = loginForm.value.password
    this.authService.login()
   this.router.navigate(['/homepage'])
  console.log(loginForm)
}

}
