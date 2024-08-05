import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtService } from '../../service/jwt.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.scss'
})
export class AddAdminComponent {
  registerForm!: FormGroup;

  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private jwtService: JwtService) { }


  ngOnInit() {
    this.registerForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    }, { validator: this.passwordMathValidator });
  }

  passwordMathValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password != confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }
  register() {
    const { confirmPassword, ...data } = this.registerForm.value;
    data.role = "admin";

    this.jwtService.register(data).subscribe(res => {
      this.snackbar.open("Admin added successfully,refresh the page!", "Ok");
      this.router.navigateByUrl("/admin-menu").then(() => {
        window.location.reload();
      });
    }, error => {
      if (error.status === 201) { // Handle 201 Created as a success case
        this.snackbar.open("Admin added successfully,refresh the page!", "Ok");
      } else {
        console.error("Error: ", error);
        this.snackbar.open("Something went wrong!", "Ok");
      }
    })
  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
}
