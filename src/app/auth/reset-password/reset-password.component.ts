/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ViewChild } from "@angular/core";
import { ElementRef } from "@angular/core";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  NbAuthSocialLink,
  NbAuthService,
  NB_AUTH_OPTIONS,
  NbAuthResult,
  getDeepFromObject,
} from "@nebular/auth";
import { StewardService } from "../../shared/services/steward.service";
import { ChangePassword } from "../../shared/wrappers/login";
import { DOCUMENT } from "@angular/common";
import { MyErrorStateMatcher } from "../../shared/error-handler";
import { LoadingType } from "ng-devui/loading";
import { timer } from "rxjs";

@Component({
  selector: "nb-reset-password-page",
  styleUrls: ["./reset-password.component.scss"],
  templateUrl: "./reset-password.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbResetPasswordComponent {
  model: any = {};
  isFailed = false;
  message: string;
  matcher = new MyErrorStateMatcher();
  users = [];
  loadtext = "";
  isLoggedIn = true;
  changepassword: ChangePassword;

  loading1: LoadingType;
  showLoading = false;

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = "google";

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  socialLinks: NbAuthSocialLink[] = [];
  rememberMe = false;

  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    // public route: ActivatedRoute,
    private stewardService: StewardService<any, any>,
    @Inject(DOCUMENT) document,
    protected router: Router
  ) {
    this.changepassword = new ChangePassword();
    this.loading1 = undefined;
    this.redirectDelay = this.getConfigValue(
      "forms.resetPassword.redirectDelay"
    );
    this.showMessages = this.getConfigValue("forms.resetPassword.showMessages");
  }

  ngOnInit() {
    // console.log('this is a test for java and javascript');
    const inst = this;
  }

  resetPass(): void {
    this.showLoading = true;
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", this.user);

    this.stewardService
      .sendTokenOtp(
        "app/rest/v2/services/miliki_ChangePasswordService/changePassword",
        {
          changePasswordWrapper: {
            oldPass: this.user.currentpassword,
            newPassword: this.user.password,
          },
        }
      )
      .subscribe(
        (response: any) => {
          this.submitted = false;
          // this.loading1 = timer(3500).toPromise();
          // console.log(">>>>", response);
          if ("access_token" in response) {
            // console.log("==================================== token is there");
          }

          if ("correlationId" in response) {
            // console.log(
              // "==================================== correlationid there"
            // );
          }

          if ("code" in response) {
            //  localStorage.setItem('access_token', response.access_token);
            if (response.code === 200) {
              localStorage.setItem("isLoggedin", "true");
              this.router.navigate(["/dashboard"]);
              this.messages.push(response.message);
              this.showLoading = false;
            }
            if (response.code === 400) {
      
              this.errors.push(response.message);
              this.showLoading = false;
            }
          }

          this.cd.detectChanges();
        },
        (error) => {
          this.message = error.error.message;
          // this.notify.show(this.message);
          // this.errors = error.error.message;
          this.errors.push(error.error.message);
          // console.log("errors>>>>>>>>>>>>>>", this.errors);
          this.showLoading = false;
        }
      );
    this.cd.detectChanges();
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
