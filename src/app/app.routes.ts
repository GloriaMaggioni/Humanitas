import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EventsPage } from './components/events-page/events-page';

export const routes: Routes = [    
    {path: 'dashboard', component: Dashboard ,children: [
        {path: 'sidebar', component: SidebarComponent},
        {path: 'events', component: EventsPage}
    ]},
    {path: 'login', component: Login},
    {path: 'register', component: Register},
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'}, 

    
];
