import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Toast } from '@ionic-native/toast';
import { Camera } from "@ionic-native/camera";
import { File } from '@ionic-native/file';
import { Crop } from '@ionic-native/crop';
import { ImagePicker } from '@ionic-native/image-picker';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

// Import pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from  '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AboutPage } from '../pages/about/about';
import { ListProductPage } from '../pages/list-product/list-product';
import { SliderPage } from './../pages/slider/slider';
import { ProfilePage } from './../pages/profile/profile';

// Import providers
import { DetailProductPage } from '../pages/detail-product/detail-product';
import { ValidateProvider } from '../providers/validate/validate';
import { UtilProvider } from '../providers/util/util';
import { AuthProvider } from '../providers/auth/auth';
import { StorageProvider } from '../providers/storage/storage';

// Import components
import { RateComponent } from './../components/rate/rate';
import { GalleryUploadComponent } from '../components/gallery-upload/gallery-upload';
import { CameraUploadComponent } from '../components/camera-upload/camera-upload';
import { DetailImageComponent } from '../components/detail-image/detail-image';

import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { ProductProvider } from '../providers/product/product';
import { ShareProvider } from '../providers/share/share';
import { UploadProvider } from '../providers/upload/upload';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    AboutPage,
    ListProductPage,
    DetailProductPage,
    SliderPage,
    ProfilePage,
    RateComponent,
    GalleryUploadComponent,
    CameraUploadComponent,
    DetailImageComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    AboutPage,
    ListProductPage,
    DetailProductPage,
    SliderPage,
    ProfilePage,
    GalleryUploadComponent,
    CameraUploadComponent,
    DetailImageComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Toast,
    Camera,
    File,
    Crop,
    ImagePicker,
    Facebook,
    GooglePlus,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ValidateProvider,
    UtilProvider,
    AuthProvider,
    StorageProvider,
    ProductProvider,
    ShareProvider,
    UploadProvider
  ]
})
export class AppModule {}
