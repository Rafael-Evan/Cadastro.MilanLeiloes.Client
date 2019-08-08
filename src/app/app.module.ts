import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Importing social login module and facebook login provider.
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider} from 'angularx-social-login';

import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';

// Client id for the facebook oauth. This is used for validation of our application to facebook.
// https://developers.facebook.com/
// tslint:disable-next-line: variable-name
const facebook_oauth_client_id = 'Your-facebook-client-id.';
const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(facebook_oauth_client_id)
  }
]);

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      DocumentosComponent,
      HomeComponent,
      UserComponent,
      LoginComponent,
      RegistrationComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      ToastrModule.forRoot(),
      SocialLoginModule.initialize(config),
      HttpClientModule,
      AppRoutingModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
