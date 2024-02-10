import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../utilities/error-modal/error-modal.component';
import { SuccessModalComponent } from '../../utilities/success-modal/success-modal.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  password?: string;
  confirmPassword?: string;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  selectedClass: string = '9';
  registerForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
    grade: new FormControl(''),
  });

  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPassword?.setErrors(null);
      return null;
    }
  };

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]], // Minimum length of 6
        confirmPassword: ['', Validators.required], // For confirming password
        name: ['', [Validators.required]],
        surname: ['', [Validators.required]],
        grade: ['', [Validators.required]],
      },
      { validators: Validators.compose([this.passwordMatchValidator]) }
    ); // Custom validator for password matching
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onRegisterClick() {
    const formData = this.registerForm.value;
    if (this.registerForm.invalid) {
      console.log('Form is invalid');
      console.log('Email:', formData.email);
      console.log('Password:', formData.password);
      return;
    }
    console.log('Email:', formData.email);
    console.log('Password:', formData.password);
    console.log('Confirm Password:', formData.confirmPassword);
    console.log('Name:', formData.name);
    console.log('Surname:', formData.surname);
    console.log('Grade:', formData.grade);

    this.authService
      .register(
        formData.name,
        formData.surname,
        formData.email,
        formData.password,
        formData.grade
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          this.openSuccessModal('Paskyra sėkmingai sukurta');
        },
        error: (e) => {
          this.openErrorModal('Toks vartotojas jau egzistuoja');
          console.log(e);
        },
      });
  }

  openErrorModal(errorMessage: string): void {
    this.dialog.open(ErrorModalComponent, {
      data: { message: errorMessage },
    });
  }

  openSuccessModal(successMessage: string): void {
    this.dialog.open(SuccessModalComponent, {
      data: { message: successMessage },
    });
  }
}
