import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Toast } from '@ionic-native/toast';

// Import pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from  '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AboutPage } from '../pages/about/about';
import { ListProductPage } from '../pages/list-product/list-product';

// Import providers
import { DetailProductPage } from '../pages/detail-product/detail-product';
import { ValidateProvider } from '../providers/validate/validate';
import { UtilProvider } from '../providers/util/util';
import { AuthProvider } from '../providers/auth/auth';
import { StorageProvider } from '../providers/storage/storage';

// Import components
import { RateComponent } from './../components/rate/rate';

import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { SharedProvider } from '../providers/shared/shared';
import { ProductProvider } from '../providers/product/product';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    AboutPage,
    ListProductPage,
    DetailProductPage,
    RateComponent
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
    DetailProductPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Toast,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ValidateProvider,
    UtilProvider,
    AuthProvider,
    StorageProvider,
    SharedProvider,
    ProductProvider
  ]
})
export class AppModule {}
