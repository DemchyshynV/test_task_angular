import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';

import {IAnnouncement} from "../../../../interfaces";
import {AnnouncementService} from "../../../../services";

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {
  @Input()
  announcement: IAnnouncement
  @Input()
  announcements: IAnnouncement[]
  @Output()
  updatedList = new EventEmitter<IAnnouncement[]>();
  @Output()
  toUpdate = new EventEmitter<IAnnouncement>();
  details = false
  top3: IAnnouncement[]

  constructor(private service: AnnouncementService) {
  }

  ngOnInit(): void {
  }

  del(): void {
    const all = this.service.del(this.announcement.id);
    this.updatedList.emit(all)
  }

  edit(): void {
    this.toUpdate.emit(this.announcement)
  }

  detail() {
    this.details = !this.details
    this.top3 = this.service.top3Same(this.announcement);
  }
}
