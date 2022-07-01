import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {JwtModule, JwtModuleOptions} from "@auth0/angular-jwt";
import {TokenStorageService} from "./_services/token-storage.service";
import {AuthGuard} from "./_helpers/auth.guard";

export function tokenGetter() {
  return TokenStorageService.getToken();
}

const JWT_CONFIG: JwtModuleOptions = {
  config: {
    tokenGetter: tokenGetter,
    allowedDomains: [""],
    disallowedRoutes: []
  }
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JwtModule.forRoot(JWT_CONFIG)
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
