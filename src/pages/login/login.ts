import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { ValidateProvider } from '../../providers/validate/validate';
import { UtilProvider } from '../../providers/util/util';

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
      this.utilProvider.showToast("Email is invalid");
    } else {

    }
  }

}
