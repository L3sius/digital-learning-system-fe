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
  currentPage: number = 1; // Current page number
  pageSize: number = 10; // Number of items per page
  totalPages: number = 0; // Total number of pages
  achievements: string[] = [];


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
        console.log(results);
        this.userTestResults = results.sort((a: any, b: any) => {
          return b.date.localeCompare(a.date);
        });

        this.totalPages = Math.ceil(this.userTestResults.length / this.pageSize);
      },
      error: (e) => {
        console.error('Error fetching user test results:', e);
      }
    });
  }

  changeEmail() {
    return;
  }

  loadPage(page: number) {
    this.currentPage = page;
  }

  getCurrentPageData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = this.currentPage * this.pageSize;
    return this.userTestResults.slice(startIndex, endIndex);
  }
  
  getPageNumbers() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  isAchievementCompleted(achievementId: number): boolean {
    switch (achievementId) {
      case 1:
        return this.isFirstAchievementCompleted(3);
      case 2:
        return this.isSecondAchievementCompleted();
      case 3:
        return this.isThirdAchievementCompleted();
      default:
        return false;
    }
  }

  isFirstAchievementCompleted(count: number): boolean {
    if (this.userTestResults.length < count) {
      return false;
    }

    for (let i = 0; i < count; i++) {
      if (this.userTestResults[i].score !== '5') {
        return false;
      }
    }

    return true;
  }

  isSecondAchievementCompleted(): boolean {
    return this.userTestResults.length >= 10;
  }

  isThirdAchievementCompleted(): boolean {
    const currentDate = new Date();
    const today = currentDate.toDateString();
    const todayParts = today.split(' '); 

    for (const result of this.userTestResults) {
      const resultDate = result.date.split(',')[0].trim();

      if (resultDate.includes(todayParts[2]) && resultDate.includes(todayParts[3])) {
        return true;
      }
    }
  
    return false;
  }
  
  
}
