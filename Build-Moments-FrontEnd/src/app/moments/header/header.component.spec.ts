import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [ 
        MatToolbarModule,
        MatIconModule 
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit sidenav event when toggleSideNav is called', () => {
    spyOn(component.sidenav, 'emit');
    component.toggleSideNav();
    expect(component.sidenav.emit).toHaveBeenCalled();
  });

  it('should remove token and userId from localStorage and navigate to login when logOut is called', () => {
    spyOn(localStorage, 'removeItem');
    spyOn(router, 'navigate');
    component.logOut();
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('userId');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
