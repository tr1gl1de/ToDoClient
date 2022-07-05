import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../_services/auth.service";
import {LoginModel} from "../../_models/login.model";
import {AuthenticatedResponse} from "../../_models/authenticated-response.model";
import {TokenStorageService} from "../../_services/token-storage.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin: boolean = false;
  credentials: LoginModel = { username:'', password:''};

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenStorageService
  ) { }

  ngOnInit(): void {

  }


  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService.login('api/user/authenticate', this.credentials)
        .subscribe({
          next: (response: AuthenticatedResponse) => {
            const accessToken = response.accessToken;
            const refreshToken = response.refreshToken;
            this.tokenService.saveToken(accessToken);
            this.tokenService.saveRefreshToken(refreshToken);
            this.invalidLogin = false;
            this.router.navigate(["/"]);
          },
          error: (err: HttpErrorResponse) => this.invalidLogin = true
        });
    }
  }
}
