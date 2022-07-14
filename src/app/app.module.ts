import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MenuComponent } from './menu/menu.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {JwtModule, JwtModuleOptions} from "@auth0/angular-jwt";
import {TokenStorageService} from "./_services/token-storage.service";
import {AuthGuard} from "./_helpers/auth.guard";
import {HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './home/home.component';

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
    MenuComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot(JWT_CONFIG)
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
