import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useClass: HttpClientMock},
      ],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http post', () => {
    const url = environment.apiUrl + 'users';
    const httpClient = TestBed.inject(HttpClient);
    const spyHttpClient = spyOn(httpClient, 'post')
                            .and
                            .returnValue(of({}));

    service.criarConta({});
    expect(spyHttpClient).toHaveBeenCalledWith(url, {});
  });
});

class HttpClientMock {
  post() {}
}
