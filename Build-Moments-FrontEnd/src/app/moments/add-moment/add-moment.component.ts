import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { DragDropService } from 'src/app/shared/drag-drop.service';

@Component({
  selector: 'app-add-moment',
  templateUrl: './add-moment.component.html',
  styleUrls: ['./add-moment.component.scss'],
})
export class AddMomentComponent implements OnInit {
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly seperatorKeysCodes: number[] = [ENTER, COMMA];
  fileArr: any = [];
  imgArr: any = [];
  fileObj: any = [];
  msg: string;
  progress: number = 0;
  formData: FormGroup = new FormGroup({
    title: new FormControl(''),
    tags: new FormControl([]),
    file: new FormControl(null)
  });
  constructor(
    public fb: FormBuilder,
    public dragdropService: DragDropService,
    private sanitizer: DomSanitizer,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.ppssToDisplay();
  }

  initForm(): void {
    this.formData = this.fb.group({
      title: ['', [Validators.required]],
      tags: this.fb.array([]),
      file: ['', [Validators.required]]
    })
  }

  ppssToDisplay(): void {

  }

  add(e: MatChipInputEvent) {
    const input = e.input;
    const value = e.value;

    if ((value || '').trim()) {
      const control = <FormArray>this.formData.controls['tags'];
      control.push(this.fb.control(value.trim()))
    }

    if (input) {
      input.value = '';
    }
  }

  remove(i: number) {
    let control = <FormArray>this.formData.controls['tags'];
    control.removeAt(i);
  }

  upload(e: any) {
    const fileObj = e.target.files[0];
    console.log('event data', e.target.files[0])
    // const fileListAsArray = Array.from(e);
    // fileListAsArray.forEach((item, i) => {
      //   const file = e;
      //   const url = URL.createObjectURL(file[i]);
      //   this.imgArr.push(url);
      //   this.fileArr.push({ item, url: url });
      // })
      // this.fileArr.forEach((item: any) => {
        //   this.fileObj.push(item.item)
        // })
        // // Set files form control
        this.formData.patchValue({
          file: fileObj
        })
        console.log('formData', this.formData.get('file')?.value)
    // this.formData.get('file')?.updateValueAndValidity()
    // const fileName = `${ Date.now() }-${ this.formData.value.file[0].name }`;
    // console.log('file detail', fileName)
    // // Upload to server
    // this.dragdropService.addFiles(this.formData.value.file)
    //   .subscribe((event: HttpEvent<any>) => {
    //     switch (event.type) {
    //       case HttpEventType.Sent:
    //         console.log('Request has been made!');
    //         break;
    //       case HttpEventType.ResponseHeader:
    //         console.log('Response header has been received!');
    //         break;
    //       case HttpEventType.UploadProgress:
    //         if (event.total) {
    //           const total: number = event.total;
    //           this.progress = Math.round(event.loaded / event.total * 100);
    //         }
    //         console.log(`Uploaded! ${this.progress}%`);
    //         break;
    //       case HttpEventType.Response:
    //         console.log('File uploaded successfully!', event.body);
    //         setTimeout(() => {
    //           this.progress = 0;
    //           this.fileArr = [];
    //           this.fileObj = [];
    //           this.msg = "File uploaded successfully!"
    //         }, 3000);
    //     }
    //   })
  }
  // Clean Url
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
