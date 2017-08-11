import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
    selector: 'edit-image',
    templateUrl: 'edit-image.html'
})

export class EditImageComponent {
  public capture: any;

  constructor (public params: NavParams, public viewCtrl: ViewController) {      
    this.capture = {
      title: '',
      description: '',
      image: params.get('captureImage')
    }
  }

  dismiss () {
    this.viewCtrl.dismiss();
  }
}
