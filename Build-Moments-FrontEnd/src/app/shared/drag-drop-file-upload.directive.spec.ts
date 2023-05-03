import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DragDropFileUploadDirective } from './drag-drop-file-upload.directive';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('DragDropFileUploadDirective', () => {
  @Component({
    template: '<div appDragDropFileUpload (fileDropped)="onFileDrop($event)"></div>'
  })
  class TestComponent {
    public onFileDrop = jasmine.createSpy('onFileDrop');
  }

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directive: DragDropFileUploadDirective;
  let element: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        DragDropFileUploadDirective
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.debugElement.query(By.directive(DragDropFileUploadDirective));
    directive = element.injector.get(DragDropFileUploadDirective);
  });

  it('should create an instance', () => {
    const directive = new DragDropFileUploadDirective();
    expect(directive).toBeTruthy();
  });

  it('should set the background color to #e2eefd on dragover event', () => {
    const event = new Event('dragover');
    spyOn(event, 'preventDefault');
    spyOn(event, 'stopPropagation');
    element.triggerEventHandler('dragover', event);
    expect(directive.background).toBe('#e2eefd');
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('should set the background color to #ffffff on dragleave event', () => {
    const event = new Event('dragleave');
    spyOn(event, 'preventDefault');
    spyOn(event, 'stopPropagation');
    element.triggerEventHandler('dragleave', event);
    expect(directive.background).toBe('#ffffff');
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('should emit fileDropped event on drop event', () => {
    const file = new File([], 'test.jpg');
    const event = {
      preventDefault: jasmine.createSpy('preventDefault'),
      stopPropagation: jasmine.createSpy('stopPropagation'),
      dataTransfer: {
        files: [file]
      }
    };
    element.triggerEventHandler('drop', event);
    expect(directive.background).toBe('#ffffff');
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(component.onFileDrop).toHaveBeenCalledWith([file]);
  });
});
