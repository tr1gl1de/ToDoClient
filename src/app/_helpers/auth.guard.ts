import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {TokenStorageService} from "../_services/token-storage.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {HttpClient} from "@angular/common/http";
import {AuthenticatedResponse} from "../_models/authenticated-response.model";
import {AuthService} from "../_services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private tokenService: TokenStorageService,
              private jwtHelper: JwtHelperService, private http: HttpClient,
              private authService: AuthService) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const token = this.tokenService.getToken();

      if (this.tokenService.isUserAuthenticated()) {
        return true;
      }

      const isRefreshSuccess = await this.tryRefreshToken(token);
      if (isRefreshSuccess){
        this.router.navigate(["login"]);
      }

      return isRefreshSuccess;
  }

  private async tryRefreshToken(token: string | null): Promise<boolean> {
    const refreshToken: string | null = this.tokenService.getRefreshToken();
    if (!token || !refreshToken) {
      return false;
    }

    const credentials = JSON.stringify({accessToken: token, refreshToken: refreshToken});
    let isRefreshSuccess: boolean;

    const refreshRes = await new Promise<AuthenticatedResponse>((resolve, reject) => {
      this.authService.refreshToken('api/user/refresh', credentials)
        .subscribe({
          next: (res: AuthenticatedResponse) => resolve(res),
          error: (_) => {reject; isRefreshSuccess = false;}
        });
    });

    this.tokenService.saveToken(refreshRes.accessToken);
    this.tokenService.saveRefreshToken(refreshRes.refreshToken);
    isRefreshSuccess = true;

    return isRefreshSuccess;
  }

}
