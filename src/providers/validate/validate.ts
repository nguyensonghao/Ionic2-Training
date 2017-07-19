import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ValidateProvider {

  constructor(public http: Http) {
    console.log('Hello ValidateProvider Provider');
  }

  validateEmail (email: string): boolean {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validatePassword (password: string): boolean {
    return true;
  }

  validateEmpty (str: string): boolean {
    return str ? true : false;
  }

}
