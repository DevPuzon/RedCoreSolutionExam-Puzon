import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { AdminUsersComponent } from '../admin-users/admin-users.component';
import { AdminMoviesComponent } from '../admin-movies/admin-movies.component';
import { DemoMaterialModule } from '../material-module';

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
    AdminMoviesComponent ]
})
export class AdminPageModule {}
