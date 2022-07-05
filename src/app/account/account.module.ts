import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountRoutingModule} from "./account-routing.module";
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    RouterModule,
  ]
})
export class AccountModule {
}
