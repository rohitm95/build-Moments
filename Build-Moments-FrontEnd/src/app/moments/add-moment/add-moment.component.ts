import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FileUploadService } from 'src/app/shared/file-upload.service';

@Component({
  selector: 'app-add-moment',
  templateUrl: './add-moment.component.html',
  styleUrls: ['./add-moment.component.scss'],
})
export class AddMomentComponent implements OnInit {
  fileObj: File;
  fileUrl: string;
  errorMsg: boolean;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly seperatorKeysCodes: number[] = [ENTER, COMMA];
  form: FormGroup;
  progress: number = 0;
  constructor(
    public fb: FormBuilder,
    public fileUploadService: FileUploadService
  ) {
    this.form = this.fb.group({
      tags: this.fb.array([], Validators.required),
      name: [''],
      avatar: [null],
    });
    this.errorMsg = false;
  }

  ngOnInit() {}

  get tagControls(): FormArray {
    return this.form.controls['tags'] as FormArray;
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add a tag
    if ((value || '').trim()) {
      this.tagControls.push(this.fb.control(value));
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: string): void {
    const index = this.tagControls.value.indexOf(tag);
    if (index >= 0) {
      this.tagControls.removeAt(index);
    }
  }

  onFilePicked(event: Event): void {
    const { target } = event;
    this.errorMsg = false;
    console.log('target', target);
    // const FILE = target.files[0];
    // this.fileObj = FILE;
  }

  onFileUpload() {
    if (!this.fileObj) {
      this.errorMsg = true;
      return;
    }
    this.fileUploadService
      .getpresignedurls(this.fileObj.name, this.fileObj.type)
      .subscribe((res) => {
        if (res.success) {
          const fileuploadurl = res.urls[0];
          const imageForm = new FormData();
          imageForm.append('file', this.fileObj);
          this.fileUploadService
            .uploadfileAWSS3(fileuploadurl, this.fileObj.type, this.fileObj)
            .subscribe((event) => {});
        }
      });
  }

  // submitUser() {
  //   this.fileUploadService
  //     .addUser(this.form.value.name, this.form.value.avatar)
  //     .subscribe((event: HttpEvent<any>) => {
  //       switch (event.type) {
  //         case HttpEventType.Sent:
  //           console.log('Request has been made!');
  //           break;
  //         case HttpEventType.ResponseHeader:
  //           console.log('Response header has been received!');
  //           break;
  //         case HttpEventType.UploadProgress:
  //           // this.progress = Math.round(event.loaded / event.total * 100);
  //           console.log(`Uploaded! ${this.progress}%`);
  //           break;
  //         case HttpEventType.Response:
  //           console.log('User successfully created!', event.body);
  //           setTimeout(() => {
  //             this.progress = 0;
  //           }, 1500);
  //       }
  //     });
  // }
}
