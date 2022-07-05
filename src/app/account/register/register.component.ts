import {Component, OnInit} from '@angular/core';
import {Register} from "../../_models/register.model";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../_services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  invalidLogin: boolean = false;
  credentials: Register = {username: '', displayName: '', password: ''};

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.authService.register('api/user', this.credentials)
        .subscribe({
          next: () => this.redirectToLoginPage(),
          error: (err: HttpErrorResponse) => this.invalidLogin = true
        })
    }
  }

  public redirectToLoginPage(): void {
    const loginUrl: string = `account/login`;
    this.router.navigate([loginUrl]);
  }
}

