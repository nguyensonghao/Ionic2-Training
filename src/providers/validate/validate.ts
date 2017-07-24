import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { EMPTY_PASSWORD, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH, INVALID_EMAIL, EMPTY_NAME } from './../../constants/message';

@Injectable()
export class ValidateProvider {

  constructor(public http: Http) {
    console.log('Hello ValidateProvider Provider');
  }

  validateEmail (email: string): Object {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email) ? {
      result: true
    } : {
      result: false,
      message: INVALID_EMAIL
    }
  }

  validatePassword (password: string): Object {
    if (this.validateEmpty(password)) {
      if (password.length < 6) {
        return {
          result: false,
          message: PASSWORD_MIN_LENGTH
        }
      } else if (password.length > 32) {
        return {
          result: false,
          message: PASSWORD_MAX_LENGTH
        }
      } else {
        return {
          result: true
        }
      }
    } else {
      return {
        result: false,
        message: EMPTY_PASSWORD
      }
    }
  }

  validateName (name: string): Object {
    if (!this.validateEmpty(name)) {
      return {
        result: false,
        message: EMPTY_NAME
      }
    }

    return {
      result: true
    }
  }

  validateEmpty (str: string): boolean {
    return str ? true : false;
  }

}
