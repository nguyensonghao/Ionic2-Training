import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { EMPTY_PASSWORD, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH } from './../../constants/message';

@Injectable()
export class ValidateProvider {

  constructor(public http: Http) {
    console.log('Hello ValidateProvider Provider');
  }

  validateEmail (email: string): boolean {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validatePassword (password: string): string {
    if (this.validateEmpty(password)) {
      if (password.length < 6) {
        return PASSWORD_MIN_LENGTH;
      } else if (password.length > 32) {
        return PASSWORD_MAX_LENGTH;
      } else {
        return "";
      }
    } else {
      return EMPTY_PASSWORD;
    }
  }

  validateEmpty (str: string): boolean {
    return str ? true : false;
  }

}
