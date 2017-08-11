import { Component } from '@angular/core';
import { NavController, ActionSheetController, ModalController, LoadingController, Loading } from 'ionic-angular';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { File } from '@ionic-native/file';

import { ShareProvider } from './../../providers/share/share';
import { EditImageComponent } from './../../components/edit-image/edit-image';

@Component({
  	selector: 'page-home',
  	templateUrl: 'home.html',
})

export class HomePage {
  	public currentUser: any;
  	public imageCapture: string;
  	selectedType = 'tweets';
  
  	dummyTweets = [
		{
		username: 'scarlett johansson',
		handle: 'scarlett',
		likeCount: '34',
		shareCount: '15',
		text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
		date: '1485601506000',
		img: 'picture-default.jpg',
		currentImage: null
		},
		{
		username: 'scarlett johansson',
		handle: 'johansson',
		likeCount: '41',
		shareCount: '5',
		text: 'Really love the way of Building Layouts with Ionic 2 and the grid system!',
		date: '1485701506000',
		img: 'picture-default.jpg',
		currentImage: null
		},
		{
		username: 'ionic',
		handle: 'ionicframework',
		likeCount: '42',
		shareCount: '22',
		text: 'The day has finally come!  Announcing Ionic 2.0.0 final ðŸŽ‰ðŸŽŠðŸ”¥ â€¦',
		date: '1485801506000',
		img: 'twitter-ionic.jpg',
		currentImage: null
		},
		{
		username: 'scarlett johansson',
		handle: 'scarlett',
		likeCount: '15',
		shareCount: '11',
		text: 'One of my all time favorite Ionic Meetup logos: Ionic San Francisco. â¤ï¸',
		date: '1485901506000',
		img: 'picture-default.jpg',
		currentImage: null
		}
  	];

	constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, private camera: Camera, 
		public sharedProvider: ShareProvider, public file: File, public modalController: ModalController ) {
		this.currentUser = sharedProvider.currentUser;
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
						this.captureImage();
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
    
  	}

	private captureImage () {
		const options: CameraOptions = {
			quality: 50,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		}

		this.camera.getPicture(options).then((imagePath) => {
			let imageCapture = "data:image/jpeg;base64," + imagePath;
			let editImageModal = this.modalController.create(EditImageComponent, {
				captureImage: imageCapture
			})

			editImageModal.present();
		}, (err) => {
			console.log(err);
		});
	}

}
