import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';


import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbAuthJWTToken, NbAuthService , NbTokenService} from '@nebular/auth';
// import { User } from '../../../models/Users';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  // user: User;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'cosmic';

  userMenu = [ { title: 'Profile',link:'/pages/profile' }, { title: 'Log out',link : '/auth/logout' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              
              private tokenService: NbTokenService,
              private authService: NbAuthService,
              private breakpointService: NbMediaBreakpointsService) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

  //   this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
  //     if (token.isValid()) {
  //         this.user = token.getPayload();
         
          
  //         this.user.currentUser = this.user.identity.identity;
  //         localStorage.setItem('phoneNUmber', this.user.identity.identity);
  //     }
  //  });
   const username = localStorage.getItem('username');
  //  console.log("inside the header >>>>>>>>>>>>>>>>>>>>>",username);
   
   this.user = username;
    

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

      const { sm } = this.breakpointService.getBreakpointsMap(); 

      this.menuService.onItemSelect() 
            .pipe(takeUntil(this.destroy$))
            .subscribe((event: { tag: string, item: any }) => {
              if (document.documentElement.clientWidth < sm){
                this.sidebarService.collapse('menu-sidebar');
              }
          });
     
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
