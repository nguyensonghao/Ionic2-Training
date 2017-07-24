import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import { UtilProvider } from './../util/util';


@Injectable()
export class StorageProvider {
  private isMobile: boolean; 

  constructor(public http: Http, public utilService: UtilProvider, public storage: Storage) {
    // Provider for storaga data in local. When user use browser, data will be save in localstorage and 
    // when use device, data will be save in native storage
    this.isMobile = this.utilService.isMobile();
  }

  setItem (key: string, value: any) {
    if (this.isMobile) {
      this.storage.set(key, value);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  getItem (key: string): Promise<any> {
    if (this.isMobile) {
      return this.storage.get(key);
    } else {
      return new Promise((resolve, reject) => {
        let result = localStorage.getItem(key);
        resolve(result ? JSON.parse(result) : null);
      })
    }
  }

  delete (key: string) {
    if (this.isMobile) {
      this.storage.remove(key);
    } else {
      localStorage.removeItem(key);
    }
  }

  clear () {
    if (this.isMobile) {
      this.storage.clear();
    } else {
      localStorage.clear();
    }
  }
}
