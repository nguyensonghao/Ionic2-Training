import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ValidateProvider } from '../../providers/validate/validate';
import { UtilProvider } from '../../providers/util/util';
import { AuthProvider } from './../../providers/auth/auth';
import { ShareProvider } from './../../providers/share/share';
import { ERROR_STATUS, APP_VERSION } from './../../constants/config';
import { RegisterPage } from './../register/register';
import { HomePage } from './../home/home';
import { ProfilePage } from './../profile/profile';
import { ERROR_LOGIN_FACEBOOK } from './../../constants/message';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ValidateProvider, UtilProvider, AuthProvider]
})

export class LoginPage {
  public user: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams, public validateProvider: ValidateProvider, 
    public utilProvider: UtilProvider, public authProvider: AuthProvider, public shareProvider: ShareProvider) {
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
              this.shareProvider.currentUser = result.data;
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

  loginFacebook () {
    this.authProvider.loginFacebook().then((data) => {
      if (data) {
        data['type'] = 'facebook';
        data['avatar'] = data['picture']['data']['url'];
        this.shareProvider.currentUserSocial = data;
        this.authProvider.saveUserSocial(data);
        this.navCtrl.setRoot(ProfilePage);
      } else {
        this.utilProvider.showToast(ERROR_LOGIN_FACEBOOK);
      }
    })
  }

  loginGoogle () {
    this.authProvider.loginGoogle();
  }

  goRegister () {
    this.navCtrl.push(RegisterPage);
  }

}
