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
import { Router } from "@angular/router";
import {
  NbAuthSocialLink,
  NbAuthService,
  NB_AUTH_OPTIONS,
  NbAuthResult,
  getDeepFromObject,
} from "@nebular/auth";
import { StewardService } from "../../shared/services/steward.service";
import { Login } from "../../shared/wrappers/login";
import { DOCUMENT } from "@angular/common";
import { MyErrorStateMatcher } from "../../shared/error-handler";
import { LoadingType } from "ng-devui/loading";

@Component({
  selector: "nb-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbLoginComponent {
  @ViewChild("myinput", { static: false }) myInputField: ElementRef;
  ngAfterViewInit() {
    this.myInputField.nativeElement.focus();
  }

  model: any = {};
  isFailed = false;
  message: string;
  matcher = new MyErrorStateMatcher();
  users = [];
  loadtext = "";
  isLoggedIn = true;
  login: Login;

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
    private stewardService: StewardService<any, any>,
    @Inject(DOCUMENT) document,
    protected router: Router
  ) {
    this.login = new Login();
    this.loading1 = undefined;
    this.showMessages = this.getConfigValue("forms.login.showMessages");
  }

  ngOnInit() {
    const inst = this;
    window.localStorage.clear();
  }
  onLoggedin() {
    localStorage.setItem("isLoggedin", "true");
    this.router.navigate(["/dashboard"]);
  }

  // onLoggedin() {
  //   this.showLoading = true;
  //   this.errors = [];
  //   this.messages = [];
  //   this.submitted = true;
  //   const params = new URLSearchParams();
  //   params.append("username", this.model.email);
  //   params.append("password", this.model.password);

  //   this.stewardService
  //     .sendToken("app/rest/v2/oauth/send-token", {
  //       username: this.user.username,
  //       password: this.user.password,
  //       scope: "manufacturer",
  //     })
  //     .subscribe(
  //       (response: any) => {
  //         this.submitted = false;

  //         if (response.code === 400) {
  //           this.errors.push(response.message);
  //           this.showLoading = false;
  //         } else if (response.code === 401) {
  //           this.errors.push(response.message);
  //           this.showLoading = false;
  //         } else if ("access_token" in response) {
  //           localStorage.setItem("access_token", response.access_token);
  //           localStorage.setItem("isLoggedin", "true");
  //           localStorage.setItem("username", this.user.username);
  //           this.router.navigate(["/dashboard"]);
  //           this.messages.push("Authentication was successful");
  //           this.showLoading = false;
  //         } else {
  //           if ("correlationId" in response) {
  //             localStorage.setItem("correlationId", response.correlationId);
  //             localStorage.setItem("username", this.user.username);
  //             this.messages.push("Authentication was successful");
  //             this.router.navigate(["/auth/verifyotp"]);
  //             this.showLoading = false;
  //           }
  //         }
  //         this.cd.detectChanges();
  //       },
  //       (error) => {
  //         this.message = error.error.message;

  //         this.errors.push(error.error.message);
  //         this.showLoading = false;
  //       }
  //     );
  //   this.cd.detectChanges();
  // }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
