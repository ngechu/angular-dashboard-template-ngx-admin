import { Routes, RouterModule } from '@angular/router';
// import { InboxComponent } from './inbox/inbox.component';

import { NgModule } from '@angular/core';
// import { InboxViewComponent } from './inbox-view/inbox-view.component';
import { AuthGuard } from '../../auth.guard';
import { ProfileComponent } from './profile.component';
import { ViewPersonalInfoComponent } from './view-personal-info/view-personal-info.component';

const routes: Routes = [
    {path: 'profile', component: ProfileComponent, data: {title: 'profile'}, canActivate: [AuthGuard]},
    {path: 'view-personal-info', component: ViewPersonalInfoComponent, data: {title: 'view-personal-info'}, canActivate: [AuthGuard]},
    // {path: 'inbox-view', component: InboxViewComponent, data:{title:'Inbox-view'}, canActivate:[AuthGuard]},

  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProfileRoutingModule {
  }