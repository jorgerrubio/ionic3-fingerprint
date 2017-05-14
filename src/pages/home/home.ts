import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { FingerprintAIO, FingerprintOptions} from '@ionic-native/fingerprint-aio';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  fingerprintOptions: FingerprintOptions;

  constructor(private fingerprint: FingerprintAIO, private platform: Platform) {
    this.fingerprintOptions = {
      clientId: 'fingerprint-demo',
      clientSecret: 'password',
      disableBackup: true
    }
  }

  async showFingerprintDialog(){
    try{
      await this.platform.ready();
      const available = await this.fingerprint.isAvailable();
      if(available === 'OK'){
        const result =  this.fingerprint.show(this.fingerprintOptions);
        console.log(result);
      }
    }catch(e){
      console.error(e);
    }
  }

}
