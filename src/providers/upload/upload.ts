import { API_URL } from './../../constants/config';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UploadProvider {

  constructor(public http: Http) {
    
  }

  getListImage (option: Object) {
    let url = API_URL + "api/getImageList?user_id=" + option['id'] + "&login_token=" + option['login_token']  + "&app_version=" + option['app_version'];
    return this.http.get(url).map(response => response.json());
  }

  uploadImage (formData: any) {
    let headers = new Headers();
    headers.append('enctype', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let url = API_URL + "api/uploadImage";
    return this.http.post(url, formData, options).map(response => response.json());
  }
}
