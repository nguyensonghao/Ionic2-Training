import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ShareProvider } from './../../providers/share/share';
import { AuthProvider } from './../../providers/auth/auth';
import { UtilProvider } from './../../providers/util/util';
import { LoginPage } from './../login/login';
import { ERROR_LOGOUT } from './../../constants/message';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {  
  public user: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams, public shareProvider: ShareProvider, 
    public authProvider: AuthProvider, public utilProvider: UtilProvider) {
    console.log(this.shareProvider.currentUserSocial);
    this.user = this.shareProvider.currentUserSocial;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  logout () {
    this.utilProvider.showLoading(true);
    this.authProvider.logoutSocial(this.user['type']).then(result => {
      setTimeout(() => {
        this.utilProvider.showLoading(false);
        if (result) {
          this.navCtrl.setRoot(LoginPage);
        } else {
          this.utilProvider.showToast(ERROR_LOGOUT);
        }
      }, 1000);
    })
  }

}
