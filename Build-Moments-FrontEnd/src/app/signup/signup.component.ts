import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  profileForm: UntypedFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl(''),
    password: new UntypedFormControl(''),
    firstName: new UntypedFormControl(''),
    lastName: new UntypedFormControl(''),
    mobileNumber: new UntypedFormControl(''),
    city: new UntypedFormControl(''),
  });

  constructor(
    private router: Router,
    fb: UntypedFormBuilder,
    private authService: AuthService
  ) {
    this.profileForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('[0-9]{10}$')],
      ],
      city: ['', [Validators.required]],
    });
  }

  hide = true;
  errorMessage = '';

  ngOnInit(): void {}

  get f() {
    return this.profileForm.controls;
  }

  signup(form: UntypedFormGroup) {
    // console.log(form.value);
    this.getErrorMessage();
    this.authService.signup(form.value);
  }

  getErrorMessage() {
    if (
      this.f['email'].hasError('required') ||
      this.f['password'].hasError('required') ||
      this.f['firstName'].hasError('required') ||
      this.f['lastName'].hasError('required') ||
      this.f['city'].hasError('required')
    ) {
      this.errorMessage = 'You must enter a value';
    }

    if (this.f['mobileNumber'].hasError('pattern')) {
      this.errorMessage = '10 digit phone number is required';
    }

    if (this.f['email'].hasError('email')) {
      this.errorMessage = 'Not a valid email';
    }
  }

  navigateToSignIn() {
    this.router.navigate(['/login']);
  }
}
