import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

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
  formData: FormGroup;
  constructor(
    public fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.ppssToDisplay();
  }

  initForm(): void {
    this.formData = this.fb.group({
      requirements: this.fb.array([]),
    })
  }

  ppssToDisplay(): void {

  }

  add(e: MatChipInputEvent) {
    const input = e.input;
    const value = e.value;

    if ((value || '').trim()) {
      const control = <FormArray>this.formData.controls['requirements'];
      control.push(this.fb.control(value.trim()))
    }

    if (input) {
      input.value = '';
    }
  }

  remove(i: number) {
    let control = <FormArray>this.formData.controls['requirements'];
    control.removeAt(i);
  }
}
