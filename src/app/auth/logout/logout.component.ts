/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService, NB_AUTH_OPTIONS, NbAuthResult, getDeepFromObject } from '@nebular/auth';
import { LoadingType } from 'ng-devui/loading';
// import { NB_AUTH_OPTIONS } from '../../auth.options';
// import { getDeepFromObject } from '../../helpers';
// import { NbAuthService } from '../../services/auth.service';
// import { NbAuthResult } from '../../services/auth-result';

@Component({
  selector: 'nb-logout',
  styleUrls: ['./logout.component.scss'],
  templateUrl: './logout.component.html',
})
export class NbLogoutComponent implements OnInit {

  redirectDelay: number = 0;
  strategy: string = '';

  loading1: LoadingType;
  showLoading = false;

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected router: Router) {
                this.loading1 = undefined;
    this.redirectDelay = this.getConfigValue('forms.logout.redirectDelay');
    this.strategy = this.getConfigValue('forms.logout.strategy');
  }

  ngOnInit(): void {
   
    this.logoutUser();
  }

  logoutUser(): void {
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }
  // logout(strategy: string): void {
  //   this.service.logout(strategy).subscribe((result: NbAuthResult) => {

  //     const redirect = result.getRedirect();
  //     if (redirect) {
  //       setTimeout(() => {
  //         return this.router.navigateByUrl(redirect);
  //       }, this.redirectDelay);
  //     }
  //   });
  // }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
