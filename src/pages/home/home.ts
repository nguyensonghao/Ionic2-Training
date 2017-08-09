import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthProvider } from './../../providers/auth/auth';
import { LoginPage } from './../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AuthProvider]
})

export class HomePage {
  public user: Object;

  constructor(public navCtrl: NavController, public authProvider: AuthProvider) {
    this.user = {
      name: '',
      email: ''
    }
  }

  ngOnInit () {
    this.authProvider.getUser().then(user => {
      this.user = user;
    })
  } 

  logout () {
    this.authProvider.logout();
    this.navCtrl.push(LoginPage).then(() => {
      // Remove page home to avoid user back screen by physical back button android
      let index = this.navCtrl.getActive().index;
      this.navCtrl.remove(0, index);
    });
  }
}
