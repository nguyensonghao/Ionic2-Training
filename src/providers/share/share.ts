import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ShareProvider {

  public currentUser: any;
  public currentUserSocial: any;

  constructor(public http: Http) {
    console.log('Hello ShareProvider Provider');
  }
}
