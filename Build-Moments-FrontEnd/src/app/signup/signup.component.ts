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
  country: Country;
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
    this.profileForm = fb.nonNullable.group({
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
    this.authService.signup(form.value);
  }

  navigateToSignIn() {
    this.router.navigate(['/login']);
  }
}

interface Country {
  name: string;
  alpha2code: string;
  alpha3code: string;
  numericCode: string;
  callingCode: string;
}
