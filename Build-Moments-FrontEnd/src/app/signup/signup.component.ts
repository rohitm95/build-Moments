import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
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
  profileForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    mobileNumber: new FormControl(''),
    city: new FormControl(''),
  });

  constructor(
    private router: Router,
    fb: FormBuilder,
    private authService: AuthService
  ) {
    this.profileForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      city: ['', [Validators.required]],
    });
  }

  hide = true;

  ngOnInit(): void {}

  get f() {
    return this.profileForm.controls;
  }

  signup(form: FormGroup) {
    // console.log(form.value);
    this.authService.signup(form.value);
  }

  getErrorMessage() {
    if (
      this.f['email'].hasError('required') ||
      this.f['password'].hasError('required') ||
      this.f['firstName'].hasError('required') ||
      this.f['lastName'].hasError('required') ||
      this.f['mobileNumber'].hasError('required') ||
      this.f['city'].hasError('required')
    ) {
      return 'You must enter a value';
    }

    return this.f['email'].hasError('email') ? 'Not a valid email' : '';
  }

  navigateToSignIn() {
    this.router.navigate(['/login']);
  }
}
