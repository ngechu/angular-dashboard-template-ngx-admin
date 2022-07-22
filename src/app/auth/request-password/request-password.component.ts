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
import { timer } from "rxjs";

@Component({
  selector: "nb-request-password-page",
  styleUrls: ["./request-password.component.scss"],
  templateUrl: "./request-password.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbRequestPasswordComponent {
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

    this.showMessages = this.getConfigValue(
      "forms.requestPassword.showMessages"
    );
  }

  ngOnInit() {
    const inst = this;
    window.localStorage.clear();
  }

  onResetpassword() {
    this.showLoading = true;
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    const params = new URLSearchParams();
    params.append("username", this.model.email);

    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", this.user);

    this.stewardService
      .sendToken("app/rest/v2/forgot/password", {
        username: this.user.username,
      })
      .subscribe(
        (response: any) => {
          this.submitted = false;
          // this.loading1 = timer(3500).toPromise();
          // console.log(">>>>", response);

          if (response.code === 404) {
            this.errors.push(response.message);
            // console.log("errors>>>>>>>>>>>>>>", this.errors);
            this.showLoading = false;
          } else if (response.code === 200) {
            this.router.navigate(["/login"]);
            this.messages.push(response.message);
            this.showLoading = false;
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
