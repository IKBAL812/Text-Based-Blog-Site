import { Component } from '@angular/core';
import { JwtService } from '../../service/jwt.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup;

  //hide/unhide checker
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

  //password/confirmpassword checker
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
    data.role = "user";//set the role of the user

    this.jwtService.register(data).subscribe(res => {
      this.snackbar.open("Sign up successfull!", "Ok");
      this.router.navigateByUrl("/login");
    }, error => {
      if (error.status === 201) { // Handle 201 Created as a success case since it is understood as error
        this.snackbar.open("Sign up successful!", "Ok");
        this.router.navigateByUrl("/login");
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
