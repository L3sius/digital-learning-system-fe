import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router) { }

  navigateToHomePage(): void {
    this.router.navigate(['/home']);
  }

  navigateToSettingsPage(): void {
    this.router.navigate(['/settings-page']);
  }

}
