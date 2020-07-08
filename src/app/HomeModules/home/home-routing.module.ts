import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { UserLoginComponent } from '../user-login/user-login.component';
import { UserRegisterComponent } from '../user-register/user-register.component';
import { ViewMovieComponent } from '../view-movie/view-movie.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  }, 
  {
    path: 'login',
    component: UserLoginComponent,
  }, 
  {
    path: 'register',
    component: UserRegisterComponent,
  },
  {
    path: 'viewmovie/:id',
    component: ViewMovieComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
