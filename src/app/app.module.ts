import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Importing social login module and facebook login provider.
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {FormsModule} from '@angular/forms';
 
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { DocumentsComponent } from './Documents/Documents.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';


// Client id for the facebook oauth. This is used for validation of our application to facebook.
// https://developers.facebook.com/
const facebook_oauth_client_id: string = 'Your-facebook-client-id.';
const google_oauth_client_id: string = 'Your-Google-Client-ID';
let config = new AuthServiceConfig([
   {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(google_oauth_client_id)
    },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(facebook_oauth_client_id)
  }
]);
 

@NgModule({
   declarations: [
      AppComponent,
      DocumentsComponent,
      NavComponent,
      LoginComponent,
      UserComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      ToastrModule.forRoot(), 
      SocialLoginModule.initialize(config),
      HttpClientModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
