import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { SidebarComponent } from './components/sidebar/sidebar.component';

export const routes: Routes = [    
    {path: 'dashboard', component: Dashboard ,children: [
        {path: 'sidebar', component: SidebarComponent},
    ]},
    {path: 'login', component: Login},
    {path: 'register', component: Register},
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'}, 

    
];
