import { HttpRequest , HttpHandler , HttpInterceptor , HttpEvent , HttpHeaders} from '@angular/common/http';
import {Observable } from 'rxjs';
import { NbTokenService ,NbAuthService, NbAuthJWTToken} from '@nebular/auth';
import {Injectable} from '@angular/core';
import { User } from './models/Users';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {
    constructor(private tokenService: NbAuthService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
      
        const access_token = localStorage.getItem('access_token');
          if (access_token) {
            //    let user : User = token.getPayload();
               
               
            //    localStorage.setItem('currentUser', JSON.stringify(user));
               
            //    let tokenValue = token.getValue();
               req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + access_token) });
          }
     
        req = req.clone({ headers: req.headers.append('Accept', 'application/json').append('Content-Type', 'application/json') });
        return next.handle(req);
    }
}