import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../utilities/header/header.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

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


  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.selectedValue = params['selectedValue'];
      /*if (this.selectedValue) {
        this.loadTestData(this.selectedValue);
      }*/
    });

    this.http.get<any>('assets/questions.json').subscribe(data => {
      const test = data[this.selectedValue || 'default'];
      if (test && Array.isArray(test.questions)) {
        this.testName = test.testName;
        this.questions = test.questions;
        this.selectedQuestions = this.getRandomQuestions(this.questions, 5);
      } else {
        console.error('Invalid test data format');
        // Handle invalid test data format here
      }
    });
  }

  getRandomQuestions(questions: any[], count: number): any[] {
    const shuffled = this.shuffleArray(questions);
    return shuffled.slice(0, count);
  }

  shuffleArray(array: any[]): any[] {
    // Implementation of Fisher-Yates shuffle algorithm
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
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

    this.testSubmitted = true;
    console.log('Correctly marked answers:', correctCount);
  }
}
