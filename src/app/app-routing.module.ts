import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authGuard} from './guards/auth.guard';
import {appGuard} from './guards/app.guard';

export const routes: Routes = [
  {path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), canActivate: [appGuard]},
  {path: 'details/:city', loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent), canActivate: [appGuard]},
  {path: 'add', loadComponent: () => import('./pages/add/add.component').then(m => m.AddComponent), canActivate: [appGuard]},
  {path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent), canActivate: [authGuard]},
  {path: 'signup', loadComponent: () => import('./pages/signup/signup.component').then(m => m.SignupComponent) , canActivate: [authGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
