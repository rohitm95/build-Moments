import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpClient;
  let router: Router;
  let toastr: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService, ToastrService],
    });

    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpClient);
    router = TestBed.inject(Router);
    toastr = TestBed.inject(ToastrService);
    // spyOn(http, 'post').and.returnValue({ subscribe: () => {} });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('should call login method', () => {
    const data = { email: 'test@test.com', password: 'testpassword' };
    spyOn(service, 'login').and.callThrough();
    service.login(data);
    expect(service.login).toHaveBeenCalledWith(data);
  });

  it('should call signup method', () => {
    const data = { email: 'test@test.com', password: 'testpassword', confirmPassword: 'testpassword' };
    spyOn(service, 'signup').and.callThrough();
    service.signup(data);
    expect(service.signup).toHaveBeenCalledWith(data);
  });
});
