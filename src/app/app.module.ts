import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Importing social login module and facebook login provider.
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider} from 'angularx-social-login';

import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {FormsModule} from '@angular/forms';
 
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';

// Client id for the facebook oauth. This is used for validation of our application to facebook.
// https://developers.facebook.com/
const facebook_oauth_client_id: string = 'Your-facebook-client-id.';
let config = new AuthServiceConfig([
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
      UserComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
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
