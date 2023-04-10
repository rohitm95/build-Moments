import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Import Component and required services, Wrapper classes
import { SignupComponent } from './signup.component';
import {
  UntypedFormControl,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let routerMock: Router;
  let authServiceMock: AuthService;

  beforeEach(async () => {
    // Mock services
    routerMock = jasmine.createSpyObj(['navigate']);
    authServiceMock = jasmine.createSpyObj(['signup']);

    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        UntypedFormGroup,
        UntypedFormControl,
        UntypedFormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;

    // Mock form values
    component.profileForm.setValue({
      email: 'sarah@example.com',
      password: 'password1',
      firstName: 'Sarah',
      lastName: 'Johnson',
      countryCode: 'US',
      mobileNumber: '1234567891',
      city: 'New York',
    });

    fixture.detectChanges();
  });

  it('should create SignupComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call navigateToSignIn', () => {
    component.navigateToSignIn();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should call signup', () => {
    const spy = spyOn(component, 'signup');
    component.signup(component.profileForm);
    expect(spy).toHaveBeenCalled();
  });
});
