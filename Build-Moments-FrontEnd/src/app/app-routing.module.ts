import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddMomentComponent } from './moments/add-moment/add-moment.component';
import { MomentsDashboardComponent } from './moments/moments-dashboard/moments-dashboard.component';
import { MomentsListComponent } from './moments/moments-list/moments-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './shared/auth.guard';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'moments',
    component: MomentsDashboardComponent,
    children: [
      {
        path: '',
        component: MomentsListComponent,
      },
      {
        path: 'moments-list',
        component: MomentsListComponent,
      },
      {
        path: 'add-moment',
        component: AddMomentComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
