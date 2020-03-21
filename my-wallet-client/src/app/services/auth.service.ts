import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiurl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const url = this.apiurl + 'auth';
    const body = {email, password};
    return this.http.post(url, body);
  }
}
