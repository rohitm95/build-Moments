import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentsDashboardComponent } from './moments-dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';

describe('MomentsDashboardComponent', () => {
  let component: MomentsDashboardComponent;
  let fixture: ComponentFixture<MomentsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MomentsDashboardComponent],
      imports: [
        MatSidenavModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatExpansionModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MomentsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have opened property set to true', () => {
    expect(component.opened).toBeTruthy();
  });

  it('should have panelOpenState property set to false', () => {
    expect(component.panelOpenState).toBeFalsy();
  });
});
