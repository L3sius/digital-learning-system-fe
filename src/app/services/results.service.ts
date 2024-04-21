import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Timestamp } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  constructor(private http: HttpClient) {}

  saveResults(email: string | null, score: String, date: string, testName: string | null): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<string>(
      `${environment.backendUrl}/results`,
      { email, score, date, testName },
      { headers, responseType: 'text' as 'json' }
    );
  }

  getResults(email: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>(
      `${environment.backendUrl}/fetchUserResults?email=${email}`,
      { headers }
    );
  }

  getFullName(userEmail: string): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<string>(
      `${environment.backendUrl}/fetchUserFullName?email=${userEmail}`, 
      { headers, responseType: 'text' as 'json' }
    );
  }
}
