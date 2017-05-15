import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { FingerprintAIO, FingerprintOptions} from '@ionic-native/fingerprint-aio';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  private fingerprintOptions: FingerprintOptions;
  private isFingerprint: boolean;

  constructor(private alertCtrl: AlertController, private navCtrl: NavController, private navParams: NavParams, private fingerprint: FingerprintAIO, private platform: Platform, private toastCtrl: ToastController) {
    this.isFingerprint = false;
    this.fingerprintOptions = {
      clientId: 'fingerprint-demo',
      clientSecret: 'password',
      disableBackup: true
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  async showFingerprintDialog(){
    try{
      await this.platform.ready();
      const available = await this.fingerprint.isAvailable();
      if(available === 'OK'){
        const result =  this.fingerprint.show(this.fingerprintOptions);
        
        result.then((r) => {
          console.log(r);
          window.localStorage.setItem('fingerprint', r.withFingerprint);
          this.isFingerprint = true;
          this.showAlertMessage(false);
        }, (e) => {
          console.error(e);
          this.showAlertMessage(true);
        });
        
      }
    }catch(e){
      console.error(e);
      this.showAlertMessage(true);
    }
  }

  private showAlertMessage(e: boolean){
    let optionsAlert = {
      message: (e) ? 'No valid fingerprint' : 'valid fingerprint goto to home page',
      title: (e) ? 'Error' : 'Ok login',
    };
    if(!e){
      optionsAlert['buttons'] = [
        {
          text: 'Cancel',
          handler: () => {
            this.showToast();
          }
        },
        {
          text: 'Home',
          handler: () => {
            this.gotoHome();
          }
        }
      ];
    }
    let myAlert = this.alertCtrl.create(optionsAlert);
    myAlert.present();
  }

  private showToast() {
    let toast = this.toastCtrl.create({
      message: 'Cancel goto home',
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

  private gotoHome(){
    this.navCtrl.setRoot(HomePage);
  }

}
