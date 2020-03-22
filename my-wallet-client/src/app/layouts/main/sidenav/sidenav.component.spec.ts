import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavComponent } from './sidenav.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavComponent ],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout', () => {
    const spyAuth = spyOn(TestBed.inject(AuthService), 'logout');
    component.logout();
    expect(spyAuth).toHaveBeenCalled();
  });
});

class AuthServiceMock {
  logout() {}
}
