import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { AdminUsersComponent } from '../admin-users/admin-users.component';
import { AdminMoviesComponent } from '../movies/admin-movies/admin-movies.component';
import { AddmoviesComponent } from '../movies/addmovies/addmovies.component';
import { UpdateMovisComponent } from '../movies/update-movis/update-movis.component';
 
const routes: Routes = [
  {
    path: '',
    component: AdminPage, 
    children:[ 
      {
        path: 'movies',
        component: AdminMoviesComponent
      },
      {
        path: 'add-movies',
        component: AddmoviesComponent
      },
      {
        path: 'users',
        component: AdminUsersComponent
      },
      {
        path: 'update-movies/:id',
        component: UpdateMovisComponent
      },
    ]
  },     
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
