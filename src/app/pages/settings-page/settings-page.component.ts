import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../utilities/header/header.component';
import { ResultsService } from '../../services/results.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css'
})
export class SettingsPageComponent implements OnInit {

  fullName = '';
  userEmail: string | null = null; // Initialize with null
  userTestResults: any[] = []; // Array to store user test results
  isButtonDisabled: boolean = true;

  constructor(private resultsService: ResultsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userEmail = this.authService.getUserEmail();
    console.log(this.userEmail);

    if (!this.userEmail) {
      //TODO: Implement check if user email is null
      console.log("User email is not found")
      return;
    }

    this.resultsService.getFullName(this.userEmail).subscribe({
      next: (results) => {
        this.fullName = results;
      },
      error: (e) => {
        console.error('Error fetching user full name:', e);
      }
    });

    this.resultsService.getResults(this.userEmail).subscribe({
      next: (results) => {
        this.userTestResults = results;
      },
      error: (e) => {
        console.error('Error fetching user test results:', e);
      }
    });
  }

  changeEmail() {
    return;
  }

}
