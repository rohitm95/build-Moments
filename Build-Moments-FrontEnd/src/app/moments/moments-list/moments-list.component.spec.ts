import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { MomentsListComponent } from './moments-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FeedService } from 'src/app/shared/feed.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('MomentsListComponent', () => {
  let component: MomentsListComponent;
  let fixture: ComponentFixture<MomentsListComponent>;
  let dialogSpy: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MomentsListComponent],
      imports: [ MatDialogModule, HttpClientModule ],
      providers: [
        FeedService,
        ToastrService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MomentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deletePost method', () => {
    spyOn(component, 'deletePost');
    component.deletePost(1); // pass some random id
    expect(component.deletePost).toHaveBeenCalled();
  });

  it('should have dataSource defined', () => {
    expect(component.dataSource).toBeDefined();
  });
});
