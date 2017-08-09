import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ToastController, Platform, LoadingController, AlertController  } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { ERROR_CONNECT_INTERNET } from './../../constants/message';

@Injectable()
export class UtilProvider {
  private loading: any;
  private toast: any;
  private alert: any;

  constructor(public http: Http, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController, 
    public toastNative: Toast, public alertCtrl: AlertController ) {
    
  }

  showToast (message: string) {
    if (this.isMobile()) {
      // Hidden previous toast if it is showing
      if (this.toast)
        this.toastNative.hide();

      this.toast = this.toastNative.show(message, '2000', 'bottom').subscribe(
        toast => {
          console.log(toast);
        }
      );
    } else {
      // Hidden previous toast if it is showing
      if (this.toast)
        this.toast.dismiss();
      
      this.toast = this.toastCtrl.create({
        message: message,
        duration: 2000
      });

      this.toast.present();
    }
  }

  showErrorNotInternet () {
    this.showAlert("Error!", ERROR_CONNECT_INTERNET);
  }

  isMobile (): boolean {
    return this.platform.is('mobile');
  }

  showLoading (status: boolean, message: string = 'Please wait...') {
    if (status) {
      this.loading = this.loadingCtrl.create({
        content: message
      });

      this.loading.present();
    } else {
      this.loading.dismiss();
    }
  }

  showAlert (title, message, button = 'OK') {
    // Hidden previous alert if it is showing
    if (this.alert)
      this.alert.dismiss();

    this.alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [button]
    });

    this.alert.present();
  }
}
