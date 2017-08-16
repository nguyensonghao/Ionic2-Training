import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'detail-image',
  templateUrl: 'detail-image.html'
})
export class DetailImageComponent {

  public imageUpload: any;

  constructor(public navParams: NavParams, public viewCtrl: ViewController) {
    this.imageUpload = this.navParams.get('imageUpload'); 
  }

  close () {
    this.viewCtrl.dismiss();
  }

}
