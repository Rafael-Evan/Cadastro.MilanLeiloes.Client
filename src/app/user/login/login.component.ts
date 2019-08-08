import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MilanAuthService } from 'src/app/_services/milan-auth.service';
import { AuthService, FacebookLoginProvider } from 'angularx-social-login';
declare var FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'Angular Socio login via Facebook!';
  user: any;
  model: any = {};

  constructor(private _socioAuthServ: AuthService
    , private authService: MilanAuthService
    , public router: Router
    , private toastr: ToastrService) { }

  // Method to sign in with facebook.
  signIn(platform: string): void {
    platform = FacebookLoginProvider.PROVIDER_ID;
    this._socioAuthServ.signIn(platform).then(
      (response) => {
        console.log(platform + " logged in user data is= ", response);
        this.user = response;
      }
    );
  }

  ngOnInit() {
    if (localStorage.getItem('token') !== null) {
      this.router.navigate(['/home']);
    }

    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: '383913478995156',
        cookie: true,
        xfbml: true,
        version: 'v3.1'
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  login() {
    this.authService.login(this.model)
      .subscribe(
        () => {
          this.router.navigate(['/home']);
        },
        error => {
          this.toastr.error('Falha ao tentar Logar');
        }
      );
  }

  // Method to log out.
  signOut(): void {
    this._socioAuthServ.signOut();
    this.user = null;
    console.log('User signed out.');
  }

}
