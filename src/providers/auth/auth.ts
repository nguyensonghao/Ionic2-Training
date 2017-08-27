import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import 'rxjs/add/operator/map';

import { API_URL, CURRENT_USER, CURRENT_USER_SOCIAL } from './../../constants/config';
import { StorageProvider } from './../storage/storage';

@Injectable()
export class AuthProvider {

  constructor(public http: Http, public storageProvider: StorageProvider, public facebook: Facebook, public googlePlus: GooglePlus) {

  }

  login(user: Object) {
    let urlApiLogin = API_URL + "user/getLogin";
    return this.http.post(urlApiLogin, user).map(response => response.json());
  }

  loginFacebook(): Promise<Object> {
    return new Promise((resolve, reject) => {
      this.facebook.login(['public_profile', 'user_friends', 'email', 'user_birthday']).then((res: FacebookLoginResponse) => {
        if (res.status == 'connected') {
          this.getInformationFacebook().then(data => {
            resolve(data);
          })
        } else {
          resolve(null);
        }
      }).catch(e => {
        console.log(e);
        reject(e);
      });
    })
  }

  getInformationFacebook(): Promise<Object> {
    return new Promise((resolve, reject) => {
      this.facebook.api('/me?fields=name,picture,email', null).then(data => {
        resolve(data)
      }).catch(e => {
        resolve(null);
      })
    })
  }

  loginGoogle() {
    this.googlePlus.login({}).then(data => {
      console.log(data);
    }, error => {
      console.log(error);
    })
  }

  register(user: Object) {
    let urlApiRegister = API_URL + "user/getRegister";
    return this.http.post(urlApiRegister, user).map(response => response.json());
  }

  logout() {
    this.storageProvider.delete(CURRENT_USER);
  }

  logoutSocial (type: String): Promise<boolean> {
    this.storageProvider.delete(CURRENT_USER_SOCIAL);
    if (type == 'facebook') {
      return this.logoutFacebook();
    } else {

    }
  }

  private logoutFacebook (): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.facebook.logout().then(result => {
        resolve(result == 'OK');
      }, (error) => {
        resolve(false);
      });
    })
  }

  saveUser(user: Object) {
    this.storageProvider.setItem(CURRENT_USER, user);
  }

  getUser(): Promise<Object> {
    return this.storageProvider.getItem(CURRENT_USER);
  }

  saveUserSocial(user: Object) {
    this.storageProvider.setItem(CURRENT_USER_SOCIAL, user);
  }

  getUserSocial(): Promise<Object> {
    return this.storageProvider.getItem(CURRENT_USER_SOCIAL);
  }
}
