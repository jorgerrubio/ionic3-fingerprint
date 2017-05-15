import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Login } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private navCtrl: NavController, private navParams: NavParams) {}

  removeFingerprintData(){
    window.localStorage.removeItem('fingerprint');
    this.navCtrl.setRoot(Login);
  }

}
