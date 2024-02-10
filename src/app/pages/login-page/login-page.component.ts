import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../utilities/error-modal/error-modal.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  showPassword: boolean = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Validate email as required and with email format
      password: ['', [Validators.required]], // Validate password as required
    });
  }

  onLoginClick() {
    const formData = this.loginForm.value;
    console.log(this.loginForm.get('email'));
    console.log(this.loginForm.get('email')?.hasError('required'));
    if (this.loginForm.invalid) {
      console.log('Form is invalid');
      console.log('Email:', formData.email);
      console.log('Password:', formData.password);
      return;
    }
    console.log('Email:', formData.email);
    console.log('Password:', formData.password);

    this.authService.login(formData.email, formData.password).subscribe({
      next: (data) => {
        console.log(data);
        this.authService.storeAuthToken(data);
        this.router.navigate(['/home']);
      },
      error: (e) => {
        this.openErrorModal('Netaisyklingas vartotojo vardas arba slaptažodis');
        console.log(e);
      },
    });
  }

  openErrorModal(errorMessage: string): void {
    this.dialog.open(ErrorModalComponent, {
      data: { message: errorMessage },
    });
  }
}
