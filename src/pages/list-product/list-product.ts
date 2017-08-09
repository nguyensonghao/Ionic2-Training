import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ProductProvider } from './../../providers/product/product';
import { UtilProvider } from './../../providers/util/util';
import { AuthProvider } from './../../providers/auth/auth';
import { DetailProductPage } from './../detail-product/detail-product';
import { LoginPage } from './../login/login';

@Component({
  selector: 'page-list-product',
  templateUrl: 'list-product.html',
  providers: [ProductProvider, UtilProvider, AuthProvider]
})
export class ListProductPage {
  public listProduct: Array<Object>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public productProvider: ProductProvider, 
    public utilProvider: UtilProvider, public authProvider: AuthProvider) {
    this.listProduct = [];
  }

  ngOnInit () {
    this.utilProvider.showLoading(true);
    this.productProvider.getList()
      .subscribe(result => {
        this.utilProvider.showLoading(false);
        if (result.status) {
          this.listProduct = result.data;
        } else {
          this.utilProvider.showToast(result.message);
        }
      }, error => {
        this.utilProvider.showLoading(false);
        this.utilProvider.showErrorNotInternet();
      })
  }

  showDetail (product: Object) {
    this.navCtrl.push(DetailProductPage, {
      product: product
    })
  }

  logout () {
    this.authProvider.logout();
    this.navCtrl.setRoot(LoginPage);
  }

}
