import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NbToastrService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';

import { ZerodhaService } from "../../../zerodha/zerodha.service";

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

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
    // {
    //   value: 'material-light',
    //   name: 'Material Light',
    // },
    // {
    //   value: 'material-dark',
    //   name: 'Material Dark',
    // },
  ];

  currentTheme = 'default';

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  now: string;
  time: any;

  nifty50: any;
  bankNifty: any;
  sensex: any;

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private authService: NbAuthService,
    private router: Router,
    private toastrService: NbToastrService,
    private zerodhaService: ZerodhaService
  ) {
    setInterval(() => {
      this.time = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
    }, 1);
    setInterval(() => {
      // this.getPriceFeed();
    }, 5000);
  }


  getPriceFeed() {
    this.zerodhaService.getNifty50().subscribe(
      response => {
        if (response.message == "success") {
          this.nifty50 = response.data;
        }
      },
      error => {
        this.toastrService.danger("Something went wrong !", "Price Feed");
      }
    );
    this.zerodhaService.getBankNifty().subscribe(
      response => {
        if (response.message == "success") {
          this.bankNifty = response.data;
        }
      },
      error => {
        this.toastrService.danger("Something went wrong !", "Price Feed");
      }
    );
    this.zerodhaService.getSensex().subscribe(
      response => {
        if (response.message == "success") {
          this.sensex = response.data;
        }
      },
      error => {
        this.toastrService.danger("Something went wrong !", "Price Feed");
      }
    );
  }

  ngOnInit() {

    this.currentTheme = this.themeService.currentTheme;

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

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
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('/auth');
    this.toastrService.success("Logged Out Successfully", "Success");
  }

}
