import { NbAuthComponent } from './auth.component';
import { NbLoginComponent } from './login/login.component';
import { NbRegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NbLogoutComponent } from './logout/logout.component';
import { NbRequestPasswordComponent } from './request-password/request-password.component';
import { NbResetPasswordComponent } from './reset-password/reset-password.component';
import { NbVerifyOtpComponent } from './verify-otp/verify-otp.component';


export const routes: Routes = [
    {
      path: '',
      component: NbAuthComponent,
      children: [
        {
          path: 'login',
          component: NbLoginComponent ,
        },
        {
          path: 'logout',
          component: NbLogoutComponent,
        },
        {
          path: 'register',
          component: NbRegisterComponent,
        },

        {
          path: 'requestPass',
          component: NbRequestPasswordComponent,
        },
        {
          path: 'resetPassword',
          component: NbResetPasswordComponent,
        },
        {
          path: 'verifyotp',
          component: NbVerifyOtpComponent
        },
      ],
    },
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class NgxAuthRoutingModule {
  }
