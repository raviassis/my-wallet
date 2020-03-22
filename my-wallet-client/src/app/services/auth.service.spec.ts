import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useClass: HttpClientMock},
        {provide: Router, useClass: RouterMock}
      ],
    });
    service = TestBed.inject(AuthService);
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login', () => {
    const url = environment.apiUrl + 'auth';
    const body =  {
      email: 'email@email',
      senha: 'senha'
    };
    const user = {
      nome: 'nome',
      token: 'token',
    };
    const spyhttp = spyOn(TestBed.inject(HttpClient), 'post')
                      .and
                      .returnValue(of(user));
    service.login(body.email, body.senha);
    expect(spyhttp).toHaveBeenCalledWith(url, body);
  });

  it('should logout', () => {
    const user = {
      nome: 'nome',
      token: 'token',
    };
    sessionStorage.setItem('user', JSON.stringify(user));
    const spyRouter = spyOn(TestBed.inject(Router), 'navigate');
    service.logout();
    expect(sessionStorage.getItem('user')).toBeFalsy();
    expect(spyRouter).toHaveBeenCalledWith(['login']);
  });

  it('should get user null', () => {
    expect(service.user).toBeNull();
  });

  it('shoud get user', () => {
    const user = {
      nome: 'nome',
      token: 'token',
    };
    sessionStorage.setItem('user', JSON.stringify(user));
    expect(service.user).toEqual(user);
  });

  it('should get token null', () => {
    expect(service.token).toBeNull();
  });

  it('should get token', () => {
    const user = {
      nome: 'nome',
      token: 'token',
    };
    sessionStorage.setItem('user', JSON.stringify(user));
    expect(service.token).toBe(user.token);
  });

  it('should is logged', () => {
    const user = {
      nome: 'nome',
      token: 'token',
    };
    sessionStorage.setItem('user', JSON.stringify(user));
    expect(service.isLogged()).toBeTrue();
  });

  it('shouldn\'t is logged', () => {
    expect(service.isLogged()).toBeFalse();
  });
});

class HttpClientMock {
  post() {}
}

class RouterMock {
  navigate() {}
}
