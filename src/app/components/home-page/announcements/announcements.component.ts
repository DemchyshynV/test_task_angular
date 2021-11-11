import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

import {IAnnouncement} from "../../../interfaces";

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {
  @Input()
  announcements: IAnnouncement[];
  @Output()
  lift = new EventEmitter<IAnnouncement>();

  constructor() {
  }

  ngOnInit(): void {
  }

  updateList(newList: IAnnouncement[]) {
    this.announcements = newList
  }

  toUpdate(item: IAnnouncement) {
    this.lift.emit(item)
  }
}
