import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EventsPage } from './components/events-page/events-page';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HistoryPageComponent } from './components/history-page/history-page.component';
import { FuturePageComponent } from './components/future-page/future-page.component';
import { PlacesAndSpacesPageComponent } from './components/places-and-spaces-page/places-and-spaces-page.component';
import { ProductivityAndHealthPageComponent } from './components/productivity-and-health-page/productivity-and-health-page.component';
import { UtentsPageComponent } from './components/utents-page/utents-page.component';
import { SettingsPageComponent } from './components/settings-page/settings-page.component';
import { MilanoComponent } from './components/citiesPages/milano/milano.component';


import { MonzaComponent } from './components/citiesPages/monza/monza.component';
import { LeccoComponent } from './components/citiesPages/lecco/lecco.component';
import { ComoComponent } from './components/citiesPages/como/como.component';

export const routes: Routes = [    
    {path: '', component: Dashboard ,children: [
        {path: '', component: HomepageComponent},
        {path: 'events', component: EventsPage},
        {path: 'history', component: HistoryPageComponent},
        {path: 'milano', component: MilanoComponent},
        {path:'monza', component: MonzaComponent},
        {path:'lecco', component: LeccoComponent},
         {path: 'como', component: ComoComponent},
        {path: 'future', component: FuturePageComponent},
        {path:'placesandspaces', component: PlacesAndSpacesPageComponent},
        {path: 'productivityandhealth', component: ProductivityAndHealthPageComponent},
        {path: 'utents', component: UtentsPageComponent},
        {path: 'settings', component: SettingsPageComponent}
    ]},
     {path: 'sidebar', component: SidebarComponent},
    {path: 'login', component: Login},
    {path: 'register', component: Register},

    { path: '**', redirectTo: '' ,pathMatch: 'full'}



    
];
