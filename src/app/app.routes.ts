import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { SidebarComponent } from './components/sidebar/sidebar.component';

export const routes: Routes = [    
    {path: 'dashboard', component: Dashboard},
    {path: 'login', component: Login},
    {path: 'register', component: Register},
    {path: 'sidebar', component: SidebarComponent},
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},   //da cambiare in 'homepage' e in modo che si vede il login se non si è fatto l'accesso
    
];
