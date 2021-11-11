import {Injectable} from '@angular/core';
import {IAnnouncement} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private storageKey = 'storage';

  constructor() {
  }

  private saveStorage(items: IAnnouncement[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items))
  }

  getAll(): IAnnouncement[] {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : []
  }


  create(item: IAnnouncement): IAnnouncement[] {
    if (!item.id) {
      const list = this.getAll();
      const newId = list.length ? list[list.length - 1].id + 1 : 1;
      Object.assign(item, {id: newId, created_at: new Date()})
      list.push(item)
      this.saveStorage(list)
      return list
    }
    const all = this.getAll();
    const index = all.findIndex(value => value.id === item.id);
    all[index] = item
    this.saveStorage(all)
    return all
  }

  del(id: number): IAnnouncement[] {
    const all = this.getAll();
    const index = all.findIndex(value => value.id === id);
    all.splice(index, 1);
    this.saveStorage(all);
    return all;
  }

  top3Same(current: IAnnouncement): IAnnouncement[] {
    const all = this.getAll();
    let countWeight = 0
    const titleWords = current.title.split(' ');
    const descriptionWords = current.description.split(' ');
    const res: IAnnouncement[] = []
    const index = all.findIndex(value => value.id === current.id);
    all.splice(index, 1)
    for (let value of all) {
      titleWords.forEach(titleWord => {
        if (titleWord&&value.title.includes(titleWord)) {
          countWeight += 1
        }
      })
      descriptionWords.forEach(descriptionWord => {
        if (descriptionWord&&value.description.includes(descriptionWord)) {
          countWeight += 1
        }
      })
      if (countWeight === 2) {
        res.push(value)
        if (res.length === 3) {
          return res
        }
      }
    }
    return res
  }
}
