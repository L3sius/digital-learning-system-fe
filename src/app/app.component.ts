import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorModalComponent } from './utilities/error-modal/error-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './utilities/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterModule,
    LoginPageComponent,
    RegisterPageComponent,
    HttpClientModule,
    ErrorModalComponent,
    MatIconModule,
    HeaderComponent,
  ],
  providers: [HttpClientModule, AuthService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'digital-learning-system-fe';
}
