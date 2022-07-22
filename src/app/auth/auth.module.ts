import { NbLoginComponent } from './login/login.component';
import { NbRegisterComponent } from './register/register.component';
import { NbAuthBlockComponent } from './auth-block/auth-block.component';
import { NbAuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbAlertModule, NbInputModule, NbButtonModule, NbCheckboxModule, NbSelectModule, NbRadioModule, NbLayoutModule, NbCardModule, NbIconModule } from '@nebular/theme';
import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbLogoutComponent } from './logout/logout.component';
import { AngularMaterialModule } from '../material';
import { NbResetPasswordComponent } from './reset-password/reset-password.component';
import { NbRequestPasswordComponent } from './request-password/request-password.component';
import { NbVerifyOtpComponent } from './verify-otp/verify-otp.component';
import { EqualValidator } from './password.match.directive';
import { DevUIModule, LoadingComponent } from 'ng-devui';



@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      RouterModule,
      NbAlertModule,
      NbInputModule,
      NbButtonModule,
      NbCheckboxModule,
      NgxAuthRoutingModule,
      NbSelectModule,
      NbRadioModule,
      NbLayoutModule,
      NbCardModule,
      NbIconModule,
      AngularMaterialModule,
      DevUIModule,


    ],
    declarations: [
        NbLoginComponent ,
        NbRegisterComponent,
        NbAuthBlockComponent,
        NbLogoutComponent,
        NbAuthComponent,
        NbResetPasswordComponent,
        NbRequestPasswordComponent,
        NbVerifyOtpComponent,
        EqualValidator

    ],
    entryComponents: [LoadingComponent]
  })
  export class NgxAuthModule {
  }
