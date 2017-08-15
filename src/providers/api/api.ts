import { ShareProvider } from './../share/share';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiProvider {
    protected loginToken: string;
    protected userId: string;

    constructor (public shareProvider: ShareProvider) {
        let curentUser = this.shareProvider.currentUser;
        if (curentUser) {
            this.loginToken = curentUser['login_token'];
            this.userId = curentUser['id'];
        } else {
            this.loginToken = "";
            this.userId = "";
        }
    }
}