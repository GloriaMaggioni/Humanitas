import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EventsPage } from './components/events-page/events-page';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HistoryPageComponent } from './components/history-page/history-page.component';
import { FuturePageComponent } from './components/future-page/future-page.component';
import { UtentsPageComponent } from './components/utents-page/utents-page.component';
import { SettingsPageComponent } from './components/settings-page/settings-page.component';
import { SpaziCulturali } from './components/spazi-culturali/spazi-culturali';
import { SingleUtentPageComponent } from './components/single-utent-page/single-utent-page.component';
export const routes: Routes = [    
    {path: '', component: Dashboard ,children: [
        {path: '', component: HomepageComponent},
        {path: 'events', component: EventsPage},
        {path: 'history',  loadComponent: () => import('./components/history-page/history-page.component').then(m => m.HistoryPageComponent)},
        {path: 'future', loadComponent: () => import('./components/future-page/future-page.component').then(m => m.FuturePageComponent)},
        {path:'spaziCulturali', component: SpaziCulturali},
        {path: 'utents', component: UtentsPageComponent},
        {path: 'utentPage', component: SingleUtentPageComponent},
        {path: 'settings', component: SettingsPageComponent}
    ]},
     {path: 'sidebar', component: SidebarComponent},
    {path: 'login', component: Login},
    {path: 'register', component: Register},

    { path: '**', redirectTo: '' ,pathMatch: 'full'} 



    
];
