
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Importing social login module and facebook login provider.
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider,  GoogleLoginProvider } from 'angularx-social-login';

import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

// Ngx Bootstrap
import { TooltipModule } from 'ngx-bootstrap/tooltip';

// Uppy Module
import { UppyModule } from './uppy/uppy.module';

// Ngx Mask
import { NgxMaskModule } from 'ngx-mask';

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
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider('1018193936489-5a6s90045maq5k7mijp6fuk83j57equ7.apps.googleusercontent.com')
    },
   {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider(facebook_oauth_client_id)
   }
]);

export function provideConfig() {
   return config;
 }

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
      TooltipModule.forRoot(),
      NgxMaskModule.forRoot({
         showMaskTyped: true,
      }),
      SocialLoginModule.initialize(config),
      HttpClientModule,
      AppRoutingModule,
      UppyModule,
   ],
   providers: [
      {
         provide: AuthServiceConfig,
         useFactory: provideConfig
       }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
