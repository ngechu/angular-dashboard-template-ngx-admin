import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';
import { User } from './models/Users'
import { map } from 'rxjs/operators';


@Injectable()
export class AppRoleProvider implements NbRoleProvider {

  constructor(private authService: NbAuthService) {
    }
  
    getRole(): Observable<string | string[]> {
      return this.authService.onTokenChange()
        .pipe(
          map((token: NbAuthJWTToken) => {
          // let user : any  =   token.getPayload();
          // let defaultRole: Array<string> = ['admin'];
		      // let user_claims: string[];
		      // user_claims= token.isValid() ? defaultRole : defaultRole;
          // return user_claims;

          let user : any  =   token.getPayload();
          let defaultRole: Array<string> = ['guest'];
		      let roles: string[];
		      roles = token.isValid() ? user.identity.roles : defaultRole;
          return roles;
          }),
        );
    }
}