import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { AdminUsersComponent } from '../admin-users/admin-users.component';
import { AdminMoviesComponent } from '../admin-movies/admin-movies.component';

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
        path: 'users',
        component: AdminUsersComponent
      },
    ]
  },     
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
