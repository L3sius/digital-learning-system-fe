import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../utilities/header/header.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ResultsService } from '../../services/results.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.css'
})
export class TestPageComponent implements OnInit {
  selectedValue: string | null = null;
  testName: string | null = null;
  questions: any[] = [];
  selectedQuestions: any[] = [];
  selectedAnswers: number[] = Array(5).fill(-1);
  correctAnswers: boolean[] = [];
  testSubmitted: boolean = false;
  currentDate: string = "";


  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private resultsService: ResultsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.selectedValue = params['selectedValue'];
    });

    this.http.get<any>('assets/questions.json').subscribe(data => {
      const test = data[this.selectedValue || 'default'];
      if (test && Array.isArray(test.questions)) {
        this.testName = test.testName;
        this.questions = test.questions;
        this.selectedQuestions = this.getRandomQuestions(this.questions, 5);
      } else {
        console.error('Invalid test data format');
      }
    });
  }

  getRandomQuestions(questions: any[], count: number): any[] {
    const shuffled = this.shuffleArray(questions);
    return shuffled.slice(0, count);
  }

  shuffleArray(array: any[]): any[] {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  selectAnswer(questionIndex: number, answerIndex: number): void {
    this.selectedAnswers[questionIndex] = answerIndex;
  }

  isAllAnswered(): boolean {
    return this.selectedAnswers.every(index => index !== -1);
  }

  onSubmit(): void {
    if (this.testSubmitted) {
      this.router.navigate(['/home']);
      return;
    }

    let correctCount = 0;
    for (let i = 0; i < this.selectedQuestions.length; i++) {
      const correctIndex = this.selectedQuestions[i].correctIndex;
      const selectedAnswerIndex = this.selectedAnswers[i];
      if (selectedAnswerIndex === correctIndex) {
        correctCount++;
      }
    }

    this.correctAnswers = this.selectedQuestions.map((question, index) => {
      return question.correctIndex === this.selectedAnswers[index];
    });

    console.log('Correctly marked answers:', correctCount);

    this.currentDate = new Date().toLocaleString('lt-LT', { dateStyle: 'full', timeStyle: 'medium', timeZone: 'Europe/Vilnius' });
    this.resultsService.saveResults(this.authService.getUserEmail(), correctCount.toString(), this.currentDate, this.testName).subscribe({
      next: (data) => {
        this.testSubmitted = true;
        //TODO: Implement result modal
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
