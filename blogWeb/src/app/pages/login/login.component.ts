import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtService } from '../../service/jwt.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private jwtService: JwtService,
    private cookieService: CookieService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  //option to log in anonymously
  anonLogin() {
    this.cookieService.deleteAll();
    this.router.navigateByUrl("/view-all").then(() => {
      window.location.reload();
    });
  }
  login() {
    const data = this.loginForm.value;

    this.jwtService.login(data).subscribe(res => {
      this.snackbar.open("Log in successful!", "Ok");
      const jwtToken = res.jwtToken;
      this.cookieService.deleteAll();//deleting all cookie data in case there is a previos jwt
      this.router.navigateByUrl("/view-all").then(() => {
        window.location.reload();
      });
      this.cookieService.set('jwt', jwtToken);//putting the new jwt
    }, error => {
      if (error.status === 404 || error.status === 401) {
        this.snackbar.open("Email or password is wrong!", "Ok");
      } else {
        console.error("Error: ", error);
        this.snackbar.open("Something went wrong!", "Ok");
      }
    });
  }

  resetPassword() {
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      width: '500px',
      height: '400px',// Increase the height of the dialog
      data: { email: this }
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
