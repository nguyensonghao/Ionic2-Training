import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { API_URL, APP_VERSION } from './../../constants/config';
import { ApiProvider } from './../api/api';
import { ShareProvider } from './../share/share';

declare var window: any;

@Injectable()
export class UploadProvider extends ApiProvider {
  constructor(public shareProvider: ShareProvider, public http: Http) {
    super(shareProvider);
  }

  getListImage () {
    let url = API_URL + "api/getImageList?user_id=" + this.userId + "&login_token=" + this.loginToken  + "&app_version=" + APP_VERSION;
    return this.http.get(url).map(response => response.json());
  }

  uploadImage (images: Array<any>, title: string, desciption: string) {
    let headers = new Headers();
    headers.append('enctype', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let url = API_URL + "api/uploadImage";
    const formData = new FormData();
    formData.append('app_version', APP_VERSION);
    formData.append('user_id', this.userId);
    formData.append('login_token', this.loginToken);
    formData.append('title', title);
    formData.append('description', desciption);
    images.map(img => {
      formData.append('file[]', img, img.name);
    })

    return this.http.post(url, formData, options).map(response => response.json());
  }

  addFormData (images: Array<string>): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      let imageBlobs = [];

      let that = this;
      function callFirstInArray () {
        let image = images.shift();
        that.makeFileIntoBlob(image).then(blobImage => {
          imageBlobs.push(blobImage);
          if (images.length) {
            callFirstInArray();
          } else {
            resolve(imageBlobs)
          }
        })
      }

      callFirstInArray();
    })
    
  }

  private makeFileIntoBlob (_imagePath: string): Promise<any> {
		return new Promise((resolve, reject) => {
			window.resolveLocalFileSystemURL(_imagePath, (fileEntry) => {
				fileEntry.file((resFile) => {
					var reader = new FileReader();
					reader.onloadend = (evt: any) => {
						var imgBlob: any = new Blob([evt.target.result], { type: resFile.type });
						imgBlob.name = resFile.name;
						resolve(imgBlob);
					};

					reader.onerror = (e) => {						
						reject(e);
					};

					reader.readAsArrayBuffer(resFile);
				});
			});
		});
	}
}
