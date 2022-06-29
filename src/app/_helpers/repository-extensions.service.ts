import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RepositoryExtensionsService {

  constructor() { }

  public createCompleteRoute(route: string, envAddress: string): string {
    return `${envAddress}/${route}`;
  }

  public generateHeaders() {
    return{
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }
}
