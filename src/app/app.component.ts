import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from  '../pages/login/login';
import { ProfilePage } from './../pages/profile/profile';
import { ListProductPage } from './../pages/list-product/list-product';
import { HomePage } from './../pages/home/home';
import { AuthProvider } from './../providers/auth/auth';
import { ShareProvider } from './../providers/share/share';

@Component({
  templateUrl: 'app.html',
  providers: [AuthProvider]
})

export class MyApp {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, authProvider: AuthProvider, shareProvider: ShareProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // Check have token
      authProvider.getUserSocial().then(user => {
        shareProvider.currentUserSocial = user;
        if (user) {
          this.rootPage = ProfilePage;
        } else {
          this.rootPage = LoginPage;
        }
      })
    });
  }
}

