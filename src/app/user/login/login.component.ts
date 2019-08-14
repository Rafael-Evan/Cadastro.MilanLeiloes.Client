import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MilanAuthService } from 'src/app/_services/milan-auth.service';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
declare var FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: SocialUser;
  title = 'Angular Socio login via Facebook!';
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
        console.log(platform + 'logged in user data is= ', response);
        this.user = response;
        this.router.navigate(['/user/registration'],
          { queryParams: { 'social': this.user } }
        );

      }
    );
  }

  ngOnInit() {
    if (localStorage.getItem('token') !== null) {
      this.router.navigate(['/home']);
    }

    // tslint:disable-next-line: only-arrow-functions
    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: '383913478995156',
        cookie: true,
        xfbml: true,
        version: 'v3.1'
      });
      FB.AppEvents.logPageView();
    };

    // tslint:disable-next-line: only-arrow-functions
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  signInWithGoogle(): void {
    this._socioAuthServ.
      signIn(GoogleLoginProvider.PROVIDER_ID).
      then(
        (response) => {
          console.log(response);
          this.user = response;
          this.router.navigate(['/user/registration'],
            { queryParams: { 'social': this.user } }
          );
        }
      );
  }

  login() {
    if (this.model.username != null || this.model.password != null) {
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
  }

  // Method to log out.
  signOut(): void {
    this._socioAuthServ.signOut();
    this.user = null;
    console.log('User signed out.');
  }

}
