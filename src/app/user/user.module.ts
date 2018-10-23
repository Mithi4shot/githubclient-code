import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RouterModule } from '@angular/router';
import { RepositoriesComponent } from './user-profile/repositories/repositories.component';
import { FollowersComponent } from './user-profile/followers/followers.component';
import { GistsComponent } from './user-profile/gists/gists.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { DashRepositoriesComponent } from './user-dashboard/dash-repositories/dash-repositories.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'profile/:login-username', component: UserProfileComponent },
      { path: 'dashboard/:dash-username', component: UserDashboardComponent }
    ])
  ],
  declarations: [UserProfileComponent, RepositoriesComponent, FollowersComponent, GistsComponent, UserDashboardComponent, DashRepositoriesComponent]
})
export class UserModule { }
