import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { ValidateProvider } from '../../providers/validate/validate';
import { UtilProvider } from '../../providers/util/util';
import { INVALID_EMAIL, EMPTY_PASSWORD, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from './../../constants/message';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ValidateProvider, UtilProvider]
})

export class LoginPage {
  public user: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams, public validateProvider: ValidateProvider, public utilProvider: UtilProvider) {
    this.user = {
      email: '',
      password: ''
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  logForm () {
    if (!this.validateProvider.validateEmail(this.user['email'])) {
      this.utilProvider.showToast(INVALID_EMAIL);
    } else if (this.validateProvider.validatePassword(this.user['password'])) {
      this.utilProvider.showToast(this.validateProvider.validatePassword(this.user['password']));
    } else {
      console.log("Login successfully");
    }
  }

}
