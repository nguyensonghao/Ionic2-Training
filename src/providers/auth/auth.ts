import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { API_URL, CURRENT_USER } from './../../constants/config';
import { StorageProvider } from './../storage/storage';

@Injectable()
export class AuthProvider {

  constructor(public http: Http, public storageProvider: StorageProvider) {
    
  }

  login (user: Object) {
    let urlApiLogin = API_URL + "user/getLogin";
    return this.http.post(urlApiLogin, user).map(response => response.json());
  }

  register (user: Object) {
    let urlApiRegister = API_URL + "user/getRegister";
    return this.http.post(urlApiRegister, user).map(response => response.json());
  }

  logout () {
    this.storageProvider.delete(CURRENT_USER);
  }

  saveUser (user: Object) {
    this.storageProvider.setItem(CURRENT_USER, user);
  }

  getUser (): Promise<Object> {
    return this.storageProvider.getItem(CURRENT_USER);
  }
}
