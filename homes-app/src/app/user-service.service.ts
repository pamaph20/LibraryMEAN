import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  sharedData: any;
  constructor() { }
  setData(data: any) {
    this.sharedData = data;
}
getData(): any {
    return this.sharedData;
}
}
