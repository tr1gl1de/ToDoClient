import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EnvironmentUrlService {

  urlAddress: string = environment.API_URL;

  constructor() { }
}
