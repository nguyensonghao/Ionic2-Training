import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ValidateProvider } from '../../providers/validate/validate';
import { UtilProvider } from '../../providers/util/util';
import { AuthProvider } from './../../providers/auth/auth';
import { ERROR_STATUS, APP_VERSION } from './../../constants/config';
import { RegisterPage } from './../register/register';
import { HomePage } from './../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ValidateProvider, UtilProvider, AuthProvider]
})

export class LoginPage {
  public user: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams, public validateProvider: ValidateProvider, 
    public utilProvider: UtilProvider, public authProvider: AuthProvider) {
    this.user = {
      email: '',
      password: ''
    };
  }

  logForm () {
    let validateEmail = this.validateProvider.validateEmail(this.user['email']);
    if (!validateEmail['result']) {
      this.utilProvider.showToast(validateEmail['message']);
    } else {
      let validatePassword = this.validateProvider.validatePassword(this.user['password']);
      if (validatePassword['result']) {
        // Email and password valid, call api login
        this.utilProvider.showLoading(true);
        this.user['app_version'] = APP_VERSION;
        this.authProvider.login(this.user)
          .subscribe(result => {
            this.utilProvider.showLoading(false);
            if (result.status == ERROR_STATUS) {
              this.utilProvider.showToast(result.message);
            } else {
              // Save data. If in browser, data will be save in localStorage and in device, data will be save in native storage
              this.authProvider.saveUser(result.data);
              this.navCtrl.setRoot(HomePage);
            }
          }, error => {
            this.utilProvider.showLoading(false);
            this.utilProvider.showErrorNotInternet();
          })
      } else {
        this.utilProvider.showToast(validatePassword['message']);
      }
    }
  }

  goRegister () {
    this.navCtrl.push(RegisterPage);
  }

}
