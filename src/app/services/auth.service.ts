import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<string>(
      `${environment.backendUrl}/login`,
      { email, password },
      { headers, responseType: 'text' as 'json' }
    );
  }

  register(
    name: string,
    surname: string,
    email: string,
    password: string,
    grade: string
  ): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<string>(
      `${environment.backendUrl}/register`,
      {
        name,
        surname,
        email,
        password,
        grade,
      },
      { headers, responseType: 'text' as 'json' }
    );
  }

  storeAuthToken(token: string): void {
    localStorage.setItem('authToken', token);
  }
}
