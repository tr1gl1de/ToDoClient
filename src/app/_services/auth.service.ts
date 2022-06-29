import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentUrlService} from "./environment-url.service";
import {Observable} from "rxjs";
import {AuthenticatedResponse} from "../_models/authenticated-response.model";
import {LoginModel} from "../_models/login.model";
import {RepositoryExtensionsService} from "../_helpers/repository-extensions.service";
import {Register} from "../_models/register.model";
import {RegisteredUser} from "../_models/registered-user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private reposExtensions: RepositoryExtensionsService,
              private envUrl: EnvironmentUrlService) { }

  login(route: string, loginModel: LoginModel): Observable<AuthenticatedResponse> {
    return this.http.post<AuthenticatedResponse>(
      this.reposExtensions.createCompleteRoute(route, this.envUrl.urlAddress),
      loginModel,
      this.reposExtensions.generateHeaders());
  }

  register(route: string, regModel: Register): Observable<RegisteredUser> {
    return  this.http.post<RegisteredUser>(
      this.reposExtensions.createCompleteRoute(route, this.envUrl.urlAddress),
      regModel,
      this.reposExtensions.generateHeaders()
    );
  }

  refreshToken(route: string, token: string): Observable<AuthenticatedResponse> {
    return this.http.post<AuthenticatedResponse>(
      this.reposExtensions.createCompleteRoute(route, this.envUrl.urlAddress),
      token,
      this.reposExtensions.generateHeaders()
    );
  }

}
