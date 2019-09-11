import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMapComponent } from './components/main-map/main-map.component';
import { AboutComponent } from './components/about/about.component';
import { CreditsComponent } from './components/credits/credits.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'map', component: MainMapComponent },
  { path: 'about', component: AboutComponent },
  { path: 'credits', component: CreditsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [HomeComponent, MainMapComponent, AboutComponent, CreditsComponent];
