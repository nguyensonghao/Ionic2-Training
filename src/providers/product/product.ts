import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { API_URL } from './../../constants/config';

@Injectable()
export class ProductProvider {

  constructor(public http: Http) {
    console.log('Hello ProductProvider Provider');
  }

  getList () {
    let urlGetList = API_URL + "api/getListProduct";
    return this.http.get(urlGetList).map(response => response.json());
  }
}
