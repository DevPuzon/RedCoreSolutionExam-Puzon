import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { AdminUsersComponent } from '../admin-users/admin-users.component';
 
import { DemoMaterialModule } from '../material-module';
import { AdminMoviesComponent } from '../movies/admin-movies/admin-movies.component';
import { AddmoviesComponent } from '../movies/addmovies/addmovies.component';
import { UpdateMovisComponent } from '../movies/update-movis/update-movis.component';
// import { entries } from 'src/app/app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    IonicModule, 
    AdminPageRoutingModule, 
    DemoMaterialModule,
  ], 
  declarations: [AdminPage,
    AdminUsersComponent, 
    AdminMoviesComponent,
  AddmoviesComponent,
UpdateMovisComponent ]
})
export class AdminPageModule {}
