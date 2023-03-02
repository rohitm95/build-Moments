import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
  UntypedFormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  profileForm: UntypedFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl(''),
    password: new UntypedFormControl(''),
  });
  hide = true;

  constructor(
    private router: Router,
    fb: UntypedFormBuilder,
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

  login(form: UntypedFormGroup) {
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
