import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ToastController, Platform, LoadingController  } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';

@Injectable()
export class UtilProvider {
  private loading: any;
  private toast: any;

  constructor(public http: Http, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController, public toastNative: Toast) {
    console.log('Hello UtilProvider Provider');
  }

  showToast (message: string) {
    if (this.isMobile()) {
      // Hidden previous toast if it is showing
      if (this.toast)
        this.toastNative.hide();

      this.toast = this.toastNative.show(message, '1000', 'bottom').subscribe(
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
        duration: 1000
      });

      this.toast.present();
    }
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

}
