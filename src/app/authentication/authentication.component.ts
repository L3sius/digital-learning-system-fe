import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css',
})
export class AuthenticationComponent {
  constructor(private http: HttpClient) {
    this.helloWorld();
  }

  text: string = '';

  helloWorld() {
    this.http
      .get('http://localhost:8080/helloworld', { responseType: 'text' })
      .subscribe((data) => {
        this.text = data;
      });
  }
}