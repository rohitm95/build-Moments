import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  profileForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  hide = true;

  constructor(
    private router: Router,
    fb: FormBuilder,
    private authService: AuthService
  ) {
    this.profileForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  get f() {
    return this.profileForm.controls;
  }

  login(form: FormGroup) {
    // console.log(form.value);
    this.authService.login(form.value);
  }

  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }

  getErrorMessage() {
    if (this.f['email'].hasError('required') || this.f['password'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.f['email'].hasError('email') ? 'Not a valid email' : '';
  }
}
