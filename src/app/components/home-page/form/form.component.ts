import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  OnChanges,
} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

import {AnnouncementService} from "../../../services";
import {IAnnouncement} from '../../../interfaces';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {
  @Input()
  toUpdate: IAnnouncement | object
  @Output()
  updatedList = new EventEmitter<IAnnouncement[]>();

  form: FormGroup;
  saveButton = true

  constructor(private service: AnnouncementService) {
  }

  ngOnChanges(): void {
    if (this.toUpdate) {
      this.saveButton = false
      this.form.patchValue(this.toUpdate)
    }
  }


  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(''),
      description: new FormControl('')
    })
  }

  save(): void {
    const item = Object.assign(this.toUpdate || {}, this.form.getRawValue());
    const all = this.service.create(item);
    if (this.toUpdate) {
      this.toUpdate = {};
    }
    this.form.patchValue({title: '', description: ''})
    this.saveButton = true
    this.updatedList.emit(all)

  }
}
