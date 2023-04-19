import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let router: Router;
  let toastr: ToastrService;
  let stateSnapshot: RouterStateSnapshot;
  let routeSnapshot: ActivatedRouteSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ToastrModule.forRoot()]
    });

    authGuard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
    toastr = TestBed.inject(ToastrService);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should return true for canActivate if token is available', () => {
    localStorage.setItem('token', 'testToken');

    expect(authGuard.canActivate(routeSnapshot, stateSnapshot)).toBe(true);
  });

  it('should navigate to /login and display toastr error for canActivate if token is not available', () => {
    spyOn(router, 'navigate');
    spyOn(toastr, 'error');

    localStorage.removeItem('token');

    expect(authGuard.canActivate(routeSnapshot, stateSnapshot)).toBe(false);

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(toastr.error).toHaveBeenCalledWith('You must login first!');
  });
});
