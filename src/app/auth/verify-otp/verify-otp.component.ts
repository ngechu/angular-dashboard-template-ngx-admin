/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService, NB_AUTH_OPTIONS, NbAuthResult, getDeepFromObject } from '@nebular/auth';
import { StewardService } from '../../shared/services/steward.service';
import { LoadingType } from 'ng-devui/loading';
import { Otp } from '../../shared/wrappers/login';
// import { NB_AUTH_OPTIONS } from '../../auth.options';
// import { getDeepFromObject } from '../../helpers';

// import { NbAuthService } from '../../services/auth.service';
// import { NbAuthResult } from '../../services/auth-result';

@Component({
  selector: 'nb-verify-otp-page',
  styleUrls: ['./verify-otp.component.scss'],
  templateUrl: './verify-otp.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbVerifyOtpComponent {
  model: any = {};
  isFailed = false;
  message: string;
  loading1: LoadingType;
  showLoading = false;
  otps: Otp;

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = 'emails';

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected cd: ChangeDetectorRef,
              private stewardService: StewardService<any, any>,
          
              protected router: Router) {

    this.redirectDelay = this.getConfigValue('forms.register.redirectDelay');
    this.showMessages = this.getConfigValue('forms.register.showMessages');
    this.loading1 = undefined;
    // this.strategy = this.getConfigValue('forms.requestPassword.strategy');
  }

  onVerify() {
    const corId = localStorage.getItem('correlationId');
   
    this.showLoading = true;
    this.submitted = true;
    // this.otps.correlationId = corId;
    this.stewardService
      .sendToken('app/rest/v2/oauth/verify-token', { "correlationId":corId,"otpCode":this.user.otpCode})
      .subscribe(
        (response) => {
          // console.log('the response from backend',response);
          this.submitted = false;
        
            if ('access_token' in response) {
              localStorage.setItem('access_token', response.access_token);
              // localStorage.setItem('isLoggedin', 'true');
          
                // this.router.navigate(['/resetPassword']);
              
              
              // this.notify.showSuccess('Authentication was successful');
              // this.messages.push('Authentication was successful');
              this.showLoading = false;
              this.router.navigate(['/auth/resetPassword']);
              // this.router.navigate(['/auth/resetPassword',{ 'tk': response.access_token },{'isLg':'true'},{'username':localStorage.getItem('username')}]);
            } else {
              // this.notify.showWarning(response.message);
              this.errors.push(response.message);
              this.showLoading = false;
            
          }
          this.cd.detectChanges();
        },
        (error) => {
         
          this.isFailed = true;
          this.message = error.error.message;
          this.errors.push(error.error.message);
          this.showLoading = false;
         
        }
      );
      this.cd.detectChanges();
  }

  // requestPasss(): void {
  //   this.errors = this.messages = [];
  //   this.submitted = true;
  //   this.service.register(this.strategy, this.user).subscribe((result: NbAuthResult) => {
  //     this.submitted = false;
  //     if (result.isSuccess()) {
  //       this.messages = result.getMessages();
  //     } else {
  //       this.errors = result.getErrors();
  //     }

  //     const redirect = result.getRedirect();
  //     if (redirect) {
  //       setTimeout(() => {
  //         return this.router.navigateByUrl('auth/resetPassword');
  //       }, this.redirectDelay);
  //     }
  //     this.cd.detectChanges();
  //   });
  // }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
