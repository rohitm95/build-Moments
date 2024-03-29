import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerMock: Router;
  let authServiceMock: AuthService;
  
  beforeEach(async () => {
    routerMock = jasmine.createSpyObj(['navigate']);
    authServiceMock = jasmine.createSpyObj(['signup']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error message for invalid email', () => {
    component.profileForm.controls['email'].setValue('invalid-email');
    expect(component.getErrorMessage()).toEqual('Not a valid email');
  });

  it('should show error message for required fields', () => {
    component.profileForm.controls['email'].setValue('');
    component.profileForm.controls['password'].setValue('');
    expect(component.getErrorMessage()).toEqual('You must enter a value');
  });

  it('should not show error message for valid email', () => {
    component.profileForm.controls['email'].setValue('valid-email@example.com');
    expect(component.getErrorMessage()).toEqual('');
  });

  it('should call authService.login on login', () => {
    spyOn(component.authService, 'login');
    component.login(component.profileForm);
    expect(component.authService.login).toHaveBeenCalledWith(
      component.profileForm.value
    );
  });

  it('should navigate to signup page', () => {
    spyOn(component.router, 'navigate');
    component.navigateToSignUp();
    expect(component.router.navigate).toHaveBeenCalledWith(['/signup']);
  });
});
