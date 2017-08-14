import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from './../../providers/auth/auth';
import { ValidateProvider } from './../../providers/validate/validate';
import { UtilProvider } from './../../providers/util/util';
import { ERROR_STATUS, APP_VERSION } from './../../constants/config';
import { REGISTER_SUCCESS } from './../../constants/message';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [UtilProvider, ValidateProvider, AuthProvider]
})

export class RegisterPage {
  public user: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams, public utilProvider: UtilProvider, 
    public validateProvider: ValidateProvider, public authProvider: AuthProvider) {
    this.user = {
      email: "",
      password: "",
      name: ""
    }
  }

  register () {
    let validateName = this.validateProvider.validateName(this.user['name']);
    if (!validateName['result']) {
      this.utilProvider.showToast(validateName['message']);
    } else {
      let valdiateEmail = this.validateProvider.validateEmail(this.user['email']);
      if (!valdiateEmail['result']) {
        this.utilProvider.showToast(valdiateEmail['message']);
      } else {
        let validatePassword = this.validateProvider.validatePassword(this.user['password']);
        if (validatePassword['result']) {
          // Call api to register user
          this.utilProvider.showLoading(true);
          this.user['app_version'] = APP_VERSION;
          this.authProvider.register(this.user)
            .subscribe(result => {
              this.utilProvider.showLoading(false);
              if (result.status == ERROR_STATUS) {
                this.utilProvider.showToast(result.message);
              } else {
                this.utilProvider.showToast(REGISTER_SUCCESS);
                setTimeout(() => {
                  this.navCtrl.pop();
                }, 1500);
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
  }

}
