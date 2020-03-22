import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiurl = environment.apiUrl;
  private keyUser = 'user';
  // tslint:disable-next-line: variable-name
  private _user;

  get user() {
    if (!this._user) {
      this.getSession();
    }
    return this._user;
  }

  get token() {
    if (!this._user) {
      this.getSession();
    }
    return this._user?.token || null;
  }

  constructor(
    private http: HttpClient,
    public router: Router) { }

  private saveSession(user) {
    sessionStorage.setItem(this.keyUser, JSON.stringify(user));
  }

  private getSession() {
    this._user = JSON.parse(sessionStorage.getItem(this.keyUser));
  }

  login(email: string, senha: string): Observable<any> {
    const url = this.apiurl + 'auth';
    const body = {email, senha};
    return this.http.post(url, body)
                .pipe(
                  map((res) => {
                    this.saveSession(res);
                    this.getSession();
                  }),
                );
  }

  logout() {
    this._user = null;
    sessionStorage.removeItem(this.keyUser);
    this.router.navigate(['login']);
  }

  isLogged() {
    return !!this.token;
  }
}
