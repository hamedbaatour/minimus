import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {DetailsComponent} from './pages/details/details.component';
import {AddComponent} from './pages/add/add.component';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {AuthGuard} from './guards/auth.guard';
import {AppGuard} from './guards/app.guard';
import {HowToSetupComponent} from './pages/how-to-setup/how-to-setup.component';
import {RedirectWhenSetupGuard, SetupGuard} from "./guards/setup.guard";

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [SetupGuard, AppGuard]},
  {path: 'details/:city', component: DetailsComponent, canActivate: [SetupGuard, AppGuard]},
  {path: 'add', component: AddComponent, canActivate: [SetupGuard, AppGuard]},
  {path: 'login', component: LoginComponent, canActivate: [SetupGuard, AuthGuard]},
  {path: 'signup', component: SignupComponent , canActivate: [SetupGuard, AuthGuard]},
  {path: 'how-to-setup', component: HowToSetupComponent, canActivate: [RedirectWhenSetupGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
