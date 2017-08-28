import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Crop } from '@ionic-native/crop';

import { ValidateProvider } from './../../providers/validate/validate';
import { UploadProvider } from './../../providers/upload/upload';
import { UtilProvider } from './../../providers/util/util';
import { EMPTY_TITLE_OR_DESCIPTION, UPLOAD_IMAGE_SUCCESS } from './../../constants/message';
import { ERROR_STATUS } from './../../constants/config';

@Component({
  selector: 'gallery-upload',
  templateUrl: 'gallery-upload.html'
})

export class GalleryUploadComponent {
  public capture: any;

  constructor (public params: NavParams, public viewCtrl: ViewController, public crop: Crop,
    public validateProvider: ValidateProvider, public utilProvider: UtilProvider, public uploadProvider: UploadProvider) {
    this.capture = {
      title: '',
      description: '',
      images: params.get('captureImage')
    }
  }

  dismiss () {
    this.viewCtrl.dismiss();
  }

  cropImage (image: string) {
    this.crop.crop(image, {quality: 75}).then(imageCrop => {
      for (var i = 0; i < this.capture.images.length; i++) {
        if (this.capture.images[i] == image) {
          this.capture.images[i] = imageCrop;
        }
      }
    })
  }

  upload () {
    if (this.validateProvider.validateEmpty(this.capture.title) 
      && this.validateProvider.validateEmpty(this.capture.description)) { 
      // Upload image to server
      this.utilProvider.showLoading(true);
      this.uploadProvider.addFormData(this.capture.images).then(images => {
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
