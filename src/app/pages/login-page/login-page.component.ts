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

  //TODO: Add authentication service
  //constructor(private authService: AuthService) {}
  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Validate email as required and with email format
      password: ['', [Validators.required]], // Validate password as required
    });
  }

  onLoginClick() {
    // Check if the form is valid
    const formData = this.loginForm.value;
    console.log(this.loginForm.get('email'));
    console.log(this.loginForm.get('email')?.hasError('required'));
    if (this.loginForm.invalid) {
      // The form is invalid, do not proceed with login
      console.log('Form is invalid');
      console.log('Email:', formData.email);
      console.log('Password:', formData.password);
      return;
    }
    // Gather form data
    // Form is valid, proceed with login
    //const formData = this.loginForm.value;
    console.log('Email:', formData.email);
    console.log('Password:', formData.password);

    // Send the data to the backend
    /*this.authService.login(formData).subscribe((response) => {
      if (response === true) {
        // Redirect to the home page if the response is true
        this.router.navigate(['/home']); // Import and inject Router
      } else {
        // Handle login failure (e.g., show error message)
      }
    });*/

    this.router.navigate(['/home']);
  }
}
