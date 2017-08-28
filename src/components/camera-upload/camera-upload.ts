import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { ValidateProvider } from './../../providers/validate/validate';
import { EMPTY_TITLE_OR_DESCIPTION, UPLOAD_IMAGE_SUCCESS } from './../../constants/message';
import { ERROR_STATUS } from './../../constants/config';
import { UploadProvider } from './../../providers/upload/upload';
import { UtilProvider } from './../../providers/util/util';

@Component({
  selector: 'camera-upload',
  templateUrl: 'camera-upload.html'
})

export class CameraUploadComponent {
  public capture: any;

  constructor (public params: NavParams, public viewCtrl: ViewController, public validateProvider: ValidateProvider, 
    public utilProvider: UtilProvider, public uploadProvider: UploadProvider) {      
    this.capture = {
      title: '',
      description: '',
      image: params.get('captureImage')
    }
  }

  dismiss () {
    this.viewCtrl.dismiss();
  }

  upload () {
    if (this.validateProvider.validateEmpty(this.capture.title) 
      && this.validateProvider.validateEmpty(this.capture.description)) {      
      // Upload Image to server
      this.utilProvider.showLoading(true);
      this.uploadProvider.addFormData([this.capture.image]).then(images => {
        this.uploadProvider.uploadImage(images, this.capture.title, this.capture.description).subscribe(result => {
          this.utilProvider.showLoading(false);
          if (result.status == ERROR_STATUS) {
            this.utilProvider.showToast(result.message);
          } else {
            this.utilProvider.showToast(UPLOAD_IMAGE_SUCCESS);
          }

          this.viewCtrl.dismiss();
          this.loadImage();
          
        }, error => {
          this.utilProvider.showLoading(false);
          this.utilProvider.showErrorNotInternet();
        })
      })
    } else {
      this.utilProvider.showToast(EMPTY_TITLE_OR_DESCIPTION);
    }
  }

  loadImage () {
    this.params.get('loadImage')();
  }
}
