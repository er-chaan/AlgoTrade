import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { AuthService } from '../auth.service';

@Component({
  selector: 'ngx-auth-kite',
  templateUrl: './auth-kite.component.html',
  styleUrls: ['./auth-kite.component.scss']
})
export class AuthKiteComponent implements OnInit {

  token: any;
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private toastrService: NbToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void { }

  getProfile() {
    this.loading = true;
    if (this.token) {
      sessionStorage.setItem('kite_authorization', this.token);
      this.authService.getProfile().subscribe(
        response => {
          if (response.status == "success") {
            this.authService.auth({authorization:this.token}).subscribe(
              response => {
                if (response.status == "success") {
                  this.toastrService.success(response.status, "API");
                  this.loading = false;
                  this.router.navigateByUrl('/kite/dashboard');
                } else {
                  this.loading = false;
                  sessionStorage.removeItem("kite_authorization");
                  this.toastrService.danger(response.message, "API");
                }
              },
              error => {
                this.loading = false;
                sessionStorage.removeItem("kite_authorization");
                this.toastrService.danger(error.status + ' : ' + error.statusText, "API");
              }
            );

          } else {
            this.loading = false;
            sessionStorage.removeItem("kite_authorization");
            this.toastrService.danger(response.message, "KITE");
          }
        },
        error => {
          this.loading = false;
          sessionStorage.removeItem("kite_authorization");
          this.toastrService.danger(error.status + ' : ' + error.statusText, "KITE");
        });
    } else {
      this.loading = false;
      this.toastrService.danger("Input Required !", "KITE");
    }
  }

}
