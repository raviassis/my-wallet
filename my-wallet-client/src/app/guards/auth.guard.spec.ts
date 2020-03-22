import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: Router, useClass: RouterMock}
      ],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('can activate', () => {
    spyOn(TestBed.inject(AuthService), 'isLogged')
      .and
      .returnValue(true);
    expect(guard.canActivate(null, null)).toBeTruthy();
  });

  it('can\'t activate', () => {
    spyOn(TestBed.inject(AuthService), 'isLogged')
      .and
      .returnValue(false);
    
    const spyRouter = spyOn(TestBed.inject(Router), 'navigate');

    expect(guard.canActivate(null, null)).toBeFalsy();
    expect(spyRouter).toHaveBeenCalled();
  });
});

class AuthServiceMock {
  isLogged() {}
}

class RouterMock {
  navigate() {}
}
