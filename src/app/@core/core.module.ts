import { ModuleWithProviders, NgModule, Optional, SkipSelf, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbOAuth2GrantType,NbAuthOAuth2JWTToken,NbOAuth2AuthStrategy,NbOAuth2ClientAuthMethod,NbOAuth2ResponseType, NbPasswordAuthStrategy, NbAuthJWTToken, NbPasswordAuthStrategyOptions, NbAuthStrategyClass } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { AnalyticsService } from './utils';
import {PlayerService} from './utils/player.service';

import { LayoutService } from './utils/layout.service';
import { SeoService } from './utils/seo.service';
import { StateService } from './utils/state.service';
import { AppRoleProvider } from '../role.provider';


export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('admin');
  }
}

@Injectable()
export class NbMyCustomStrategy extends NbPasswordAuthStrategy {
  static setup(options: NbPasswordAuthStrategyOptions): [NbAuthStrategyClass, NbPasswordAuthStrategyOptions] {
    return [NbMyCustomStrategy, options]; // HERE we make sure our strategy reutrn correct class reference
  }
}

export class NbMyCustomStrategy2 extends NbPasswordAuthStrategy {
  static setup(options: NbPasswordAuthStrategyOptions): [NbAuthStrategyClass, NbPasswordAuthStrategyOptions] {
    return [NbMyCustomStrategy2, options]; // HERE we make sure our strategy reutrn correct class reference
  }
}

export function MyCustomErrors(module, res, options){
  return res.error ? res.error.errors : options[module].defaultErrors;
}

export const NB_CORE_PROVIDERS = [
 
  NbAuthModule.forRoot({

    strategies: [
  //     NbOAuth2AuthStrategy.setup({
  //       name: 'google',
  //     //    token : {
  //     //   class: NbAuthJWTToken,
  //     //   key: 'token',
  //     //  },
  //     baseEndpoint: 'http://backend.dev.miliki.tracom.co.ke:2020/app/rest/v2/oauth',
  //     clientId: 'miliki-Xw5tZBmm',
  //     clientSecret: '9706ece7ece6f629003dc2eb54e9f546b668e07d39b8cec952f91f74fda46744',
  //     clientAuthMethod: NbOAuth2ClientAuthMethod.BASIC,
  //     authorize: {
  //       endpoint: '/send-token',
  //       // responseType: NbOAuth2ResponseType.TOKEN,
       
  //     },
    
  //     token: {
  //       endpoint: '/send-token',
  //       grantType: NbOAuth2GrantType.PASSWORD,
  //       class: NbAuthOAuth2JWTToken,
  //     },
       
  //       // login: {
  //       //   endpoint: '/login',
  //       // },
  
  // //       errors: {
         
  // //       getter:MyCustomErrors,
    
  // // },
  //     }),
      NbPasswordAuthStrategy.setup({
        name: 'email',
      //    token : {
      //   class: NbAuthJWTToken,
      //   key: 'token',
      //  },
        baseEndpoint: 'http://backend.dev.miliki.tracom.co.ke:2020/app/rest/v2/oauth/send-token',
        // login: {
        //   endpoint: '/login',
        // },
        // register: {
        //   endpoint: '/registration',
        // },
        logout: {
          endpoint: '',
          redirect: {
              success: '/login',
              failure: '/',
          },
        },
        // requestPass: {
        //   endpoint: '/forgot',
        
    
        // },
        errors: {
         
        getter:MyCustomErrors,
    
  },
      }),
      NbMyCustomStrategy.setup({
        name: 'emails',
         token : {
        class: NbAuthJWTToken,
        key: 'token',
       },
        baseEndpoint: 'http://41.215.130.247:8823/api/v1/user',
       
        // register: {
        //   endpoint: '/corporate/registration',
        // },
        register: {
          endpoint: '/verify-otp',
          requireValidToken: true,
        },
        resetPass: {
          endpoint: '/reset',
          method: 'post',
          requireValidToken: true,
        },
        errors: {
          getter:MyCustomErrors,
        },
      }),
      NbMyCustomStrategy2.setup({
        name: 'emailss',
         token : {
        class: NbAuthJWTToken,
        key: 'token',
       },
        baseEndpoint: 'http://41.215.130.247:8823/api/v1/user',
       
        register: {
          endpoint: '/corporate/registration',
        },
        errors: {
          getter: MyCustomErrors,
        },
        
      }),
    ],
    forms: {
      login: {
        redirectDelay: 0,
        showMessages: {
          success: true,
        },
      },
      register: {
        redirectDelay: 0,
        showMessages: {
          success: true,
        },
      },
      requestPassword: {
        redirectDelay: 0,
        showMessages: {
          success: true,
        },
      },
      resetPassword: {
        redirectDelay: 0,
        showMessages: {
          success: true,
        },
      },
      logout: {
        redirectDelay: 0,
        strategy: 'email',
      },
    },
  }).providers,
    NbMyCustomStrategy,
    NbMyCustomStrategy2,

 
  {
    provide: NbRoleProvider, useClass: AppRoleProvider,
  },
  AnalyticsService,
  LayoutService,
  PlayerService,
  SeoService,
  StateService,
];

@NgModule({
  imports: [
    CommonModule,
    NbSecurityModule.forRoot({
      accessControl: {
        guest: {
          view: ['dashboard','home', 'userprofile','guest'],
          
        },
        normal: {
          parent: 'guest',
          view : ['mytickets','user'],
          create: ['ticket']
        },
        developer: {
          parent: 'normal',
          view : ['leadsdashboard','reports','reopen'],
          create: ['approval'],
          remove: '*',
        },
        admin: {
          parent: 'guest',
          view : ['admin'],
          create: ['user'],
          remove: ['user'],
        },
      },
    }),
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
