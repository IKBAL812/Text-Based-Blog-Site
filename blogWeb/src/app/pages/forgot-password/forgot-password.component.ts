import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtService } from '../../service/jwt.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  resetForm!: FormGroup;

  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private jwtService: JwtService) { }


  ngOnInit() {
    this.resetForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      newPassword: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    }, { validator: this.passwordMathValidator });
  }

  passwordMathValidator(formGroup: FormGroup) {
    const password = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password != confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }
  register() {
    const { confirmPassword, ...data } = this.resetForm.value;


    this.jwtService.resetPassword(data.email, data).subscribe(res => {
      this.snackbar.open("Password changed successfully!", "Ok");
      this.router.navigateByUrl("/login").then(() => {
        window.location.reload();
      });
    }, error => {
      console.error("Error: ", error);
      this.snackbar.open("Something went wrong!", "Ok");

    })
  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
}
