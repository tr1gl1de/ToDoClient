import { Component, OnInit } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {TokenStorageService} from "../_services/token-storage.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private jwtHelper: JwtHelperService, private tokenService: TokenStorageService) { }

  ngOnInit(): void {
  }

  isUserAuthenticated(): boolean {
    return  this.tokenService.isUserAuthenticated();
  }

  logOut() {
    this.tokenService.signOut();
  }

}
