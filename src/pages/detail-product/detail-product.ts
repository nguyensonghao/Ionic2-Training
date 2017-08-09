import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-detail-product',
  templateUrl: 'detail-product.html',
})

export class DetailProductPage {
  public product: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.product = this.navParams.get('product');
  }
}
