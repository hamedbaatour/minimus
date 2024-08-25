import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {AppGuard} from './guards/app.guard';

export const routes: Routes = [
  {path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), canActivate: [AppGuard]},
  {path: 'details/:city', loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent), canActivate: [AppGuard]},
  {path: 'add', loadComponent: () => import('./pages/add/add.component').then(m => m.AddComponent), canActivate: [AppGuard]},
  {path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent), canActivate: [AuthGuard]},
  {path: 'signup', loadComponent: () => import('./pages/signup/signup.component').then(m => m.SignupComponent) , canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
