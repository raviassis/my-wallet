import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiurl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  criarConta(user): Observable<any> {
    const url = this.apiurl + 'users';
    return this.http.post(url, user);
  }
}
