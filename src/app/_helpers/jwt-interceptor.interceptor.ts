import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenStorageService} from "../_services/token-storage.service";
import {EnvironmentUrlService} from "../_services/environment-url.service";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenStorageService, private envUrl: EnvironmentUrlService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = request;
    const token = this.tokenService.getToken();
    const isApiUrl = request.url.startsWith(this.envUrl.urlAddress);
    if (token && isApiUrl) {
      authReq = request.clone({
        headers: request.headers.set(TOKEN_HEADER_KEY, `Bearer ${token}`)
      });
    }
    return next.handle(authReq);
  }
}
