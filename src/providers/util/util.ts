import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';

@Injectable()
export class UtilProvider {

  constructor(public http: Http, public toastCtrl: ToastController) {
    console.log('Hello UtilProvider Provider');
  }

  showToast (message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1000
    });

    toast.present();
  }

}
