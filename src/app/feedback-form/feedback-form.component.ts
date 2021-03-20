import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {

  feedbackForm: FormGroup;
  // nameControl;
  // make subcategories for easier understanding
  healthC: any = ['-- Patients portal', '-- Doctors portal'];
  remoteC: any = ['--- Registration', '--- Virtual visit'];
  documentC: any = ['-- OpenKM', '-- Microsoft SharePoint'];

  constructor(private formBuilder: FormBuilder) {
    this.feedbackForm = this.formBuilder.group({
      name: new FormControl(null),
      email: new FormControl(null),
      text: new FormControl(null),
      category: new FormControl(null)
    });
  }

  // this.nameControl = this.feedbackForm.get('name') as FormControl;
  // this.nameControl.setValue('Mark');

  ngOnInit(): void {
  }

}
