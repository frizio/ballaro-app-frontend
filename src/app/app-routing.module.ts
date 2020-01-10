import { CropsComponent } from './components/crops/crops.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMapComponent } from './components/main-map/main-map.component';
import { AboutComponent } from './components/about/about.component';
import { CreditsComponent } from './components/credits/credits.component';
import { AddMarketComponent } from './components/addmarket/addmarket.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'crops', component: CropsComponent },
  { path: 'map', component: MainMapComponent },
  { path: 'about', component: AboutComponent },
  { path: 'credits', component: CreditsComponent },
  { path: 'add-market', component: AddMarketComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [HomeComponent, CropsComponent, MainMapComponent, AboutComponent, CreditsComponent, AddMarketComponent];
