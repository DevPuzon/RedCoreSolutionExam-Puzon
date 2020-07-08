import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './AdminModule/admin-login/admin-login.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./HomeModules/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },    
  {
    path: 'admin',
    loadChildren: () => import('./AdminModule/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'admin-login',
    component: AdminLoginComponent
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
