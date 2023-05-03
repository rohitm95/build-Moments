import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMomentComponent } from './add-moment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';

describe('AddMomentComponent', () => {
  let component: AddMomentComponent;
  let fixture: ComponentFixture<AddMomentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMomentComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        MatChipsModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatCardModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddMomentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
