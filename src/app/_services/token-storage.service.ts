import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

const TOKEN_KEY = "jwt";
const REFRESH_TOKEN_KEY = "refreshToken";

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private jwtHelper: JwtHelperService) {  }

  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Return jwt token from local storage.
   *
   * @remarks
   * This static method returned jwt token
   *
   * @returns accessToken
   */
  public static getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveRefreshToken(refreshToken: string): void {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  public isUserAuthenticated(): boolean {
    const token = this.getToken();

    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }

    return false;
  }

  public signOut(): void {
    localStorage.clear();
  }
}
