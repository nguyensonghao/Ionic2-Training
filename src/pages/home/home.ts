import { Component } from '@angular/core';
import { NavController, ActionSheetController, ModalController, LoadingController, Loading } from 'ionic-angular';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { Crop } from '@ionic-native/crop';
import { ImagePicker } from '@ionic-native/image-picker';

import { ShareProvider } from './../../providers/share/share';
import { CameraUploadComponent } from './../../components/camera-upload/camera-upload';
import { GalleryUploadComponent } from './../../components/gallery-upload/gallery-upload';
import { DetailImageComponent } from './../../components/detail-image/detail-image';
import { UploadProvider } from './../../providers/upload/upload';
import { UtilProvider } from './../../providers/util/util';
import { SliderPage } from './../slider/slider';
import { APP_VERSION, API_URL, CURRENT_USER, ERROR_STATUS } from './../../constants/config';

@Component({
  	selector: 'page-home',
	templateUrl: 'home.html',
	providers: [UploadProvider]
})

export class HomePage {
  	public currentUser: any;
	public imageCapture: string;
	public listImage: Array<Object>;
  
	constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, private camera: Camera, 
		public sharedProvider: ShareProvider, public modalController: ModalController, public crop: Crop,
		public uploadProvider: UploadProvider, public utilProvider: UtilProvider, public imagePicker: ImagePicker) {
		this.currentUser = sharedProvider.currentUser;
		this.listImage = [];
	}
	
	ngOnInit () {
		this.utilProvider.showLoading(true);
		this.uploadProvider.getListImage().subscribe(result => {
			this.utilProvider.showLoading(false);
			if (result.status == ERROR_STATUS) {
				this.utilProvider.showToast(result.message);
			} else {
				this.listImage = result['data'];	
			}
		}, error => {
			this.utilProvider.showLoading(false);
            this.utilProvider.showErrorNotInternet();
		})
	}

  	selectImageSource() {
    	let actionSheet = this.actionSheetCtrl.create({
      		title: 'Select Image Source',
      		buttons: [
        		{
          			text: 'Load from Library',
          			handler: () => {
						this.getFromGallery();
          			}
        		},
        		{
          			text: 'Use Camera',
					handler: () => {
						this.takePicture();
					}
        		},
        		{
          			text: 'Cancel',
          			role: 'cancel'
        		}
      		]
    	});

    	actionSheet.present();
  	}
	
	// Get multi photo from gallery with limit 10 images
	getFromGallery () {
		const options = {
			maximumImagesCount: 10,
			quality: 50
		}

		this.imagePicker.getPictures(options).then(images => {
			let modalEditCapture = this.modalController.create(GalleryUploadComponent, {
				captureImage: images
			})

			modalEditCapture.present();
		}, error => {
			console.log(error);
		})
	}

	// Take a photo from camera
  	takePicture() {
		const options: CameraOptions = {
			quality: 50,
			destinationType: this.camera.DestinationType.FILE_URI,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			sourceType: this.camera.PictureSourceType.CAMERA
		}

		this.camera.getPicture(options).then(image => {
			this.crop.crop(image, {quality: 75}).then(imageCrop => {
				let modalEditCapture = this.modalController.create(CameraUploadComponent, {
					captureImage: imageCrop
				})

				modalEditCapture.present();
			}, error => {
				// Error when user cancel crop image
				let modalEditCapture = this.modalController.create(CameraUploadComponent, {
					captureImage: image
				})

				modalEditCapture.present();
			})
		}, error => {
			console.log(error);
		})
	}

	showImage (image: any) {
		let modalDetailImage = this.modalController.create(DetailImageComponent, {
			imageUpload: image
		})

		modalDetailImage.present();
	}

	showSlider () {
		this.navCtrl.push(SliderPage, {
			listImage: this.listImage
		});
	}

}
