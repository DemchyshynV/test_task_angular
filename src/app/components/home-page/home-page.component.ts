import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

import {IAnnouncement} from "../../interfaces";
import {AnnouncementService} from "../../services";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  list: IAnnouncement[];
  itemToUpdate: IAnnouncement;
  filter: FormGroup;

  constructor(private service: AnnouncementService) {
  }

  ngOnInit(): void {
    this.list = this.service.getAll()
    this.filter = new FormGroup({
      filter: new FormControl('')
    })
  }

  getList(list: IAnnouncement[]) {
    this.list = list

  }

  toUpdate(item: IAnnouncement) {
    this.itemToUpdate = item;
  }

  onInput() {
    const filter = this.filter.controls.filter.value;
    if (filter) {
      this.list = this.service.getAll().filter(value => value.title.includes(filter))
    } else {
      this.list = this.service.getAll()
    }
  }
}
