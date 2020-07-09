import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './home/home.component'
import {AccueilComponent } from './accueil/accueil.component'
import {ContactComponent} from './contact/contact.component'
import {AvocatComponent} from './avocat/avocat.component'

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'avocat/:id', component: AvocatComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
