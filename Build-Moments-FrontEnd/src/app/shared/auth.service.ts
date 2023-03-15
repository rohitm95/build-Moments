import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: String = '';
  userId: String = '';
  authUrl = 'http://localhost:3000/auth';

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  login(data: any) {
    this.http.post<any>(`${this.authUrl}/login`, data).subscribe((res) => {
      // console.log(res)
      this.token = res.token;
      this.userId = res.userId;
      window.localStorage.setItem('token', this.token.toString());
      window.localStorage.setItem('userId', this.userId.toString());
      this.toastr.success('Login Success!!');
      this.router.navigate(['/moments']);
    });
  }

  signup(data: any) {
    this.http.post<any>(`${this.authUrl}/signup`, data).subscribe((res) => {
      this.toastr.success('User Registered Successfully!', 'Please Login');
      this.router.navigate(['/login']);
    });
  }
}
