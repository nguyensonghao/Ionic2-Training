import { Component } from '@angular/core';
import { NavController, ActionSheetController, ModalController, LoadingController, Loading } from 'ionic-angular';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { File, FileEntry } from '@ionic-native/file';
import { Crop } from '@ionic-native/crop';
import { Http, Headers, RequestOptions } from '@angular/http';

import { ShareProvider } from './../../providers/share/share';
import { EditImageComponent } from './../../components/edit-image/edit-image';
import { UploadProvider } from './../../providers/upload/upload';
import { UtilProvider } from './../../providers/util/util';
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
		public sharedProvider: ShareProvider, public file: File, public modalController: ModalController, public crop: Crop,
		public http: Http, public uploadProvider: UploadProvider, public utilProvider: UtilProvider) {
		this.currentUser = sharedProvider.currentUser;
		this.listImage = [];
	}
	
	ngOnInit () {
		let option = {
			app_version: APP_VERSION,
			login_token: this.currentUser['login_token'],
			id: this.currentUser['id']
		}

		this.utilProvider.showLoading(true);
		this.uploadProvider.getListImage(option).subscribe(result => {
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
            			this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          			}
        		},
        		{
          			text: 'Use Camera',
					handler: () => {
						this.takePicture(this.camera.PictureSourceType.CAMERA);
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


  	takePicture(sourceType) {
		const options: CameraOptions = {
			quality: 50,
			destinationType: this.camera.DestinationType.FILE_URI,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			sourceType: sourceType
		}

		this.camera.getPicture(options).then(images => {
			this.crop.crop(images, {quality: 75}).then(imagesCrop => {
				this.utilProvider.makeFileIntoBlob(imagesCrop).then(imageBlob => {
					const formData = new FormData();
					formData.append('app_version', APP_VERSION);
					formData.append('user_id', this.currentUser.id);
					formData.append('login_token', this.currentUser.login_token);
					formData.append('title', "Title");
					formData.append('description', "Description");
					formData.append('file[]', imageBlob, imageBlob.name);
					this.utilProvider.showLoading(true);
					this.uploadProvider.uploadImage(formData).subscribe(result => {
						this.utilProvider.showLoading(false);
						if (result.status == ERROR_STATUS) {
							this.utilProvider.showToast(result.message);
						} else {

						}
					})
				})
			})
		})
	}

}
