import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-slider',
  templateUrl: 'slider.html',
})
export class SliderPage {
  public listImage: Array<any>

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.listImage = this.navParams.get('listImage');
  }
}
