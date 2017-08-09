import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from  '../pages/login/login';
import { ListProductPage } from './../pages/list-product/list-product';
import { HomePage } from './../pages/home/home';
import { AuthProvider } from './../providers/auth/auth';

@Component({
  templateUrl: 'app.html',
  providers: [AuthProvider]
})

export class MyApp {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, authProvider: AuthProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // Check have token
      authProvider.getUser().then(user => {
        if (user) {
          this.rootPage = HomePage;
        } else {
          this.rootPage = LoginPage;
        }
      })
    });
  }
}

