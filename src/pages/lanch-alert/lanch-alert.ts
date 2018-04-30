import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
/**
 * Generated class for the LanchAlertPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lanch-alert',
  templateUrl: 'lanch-alert.html',
})
export class LanchAlertPage {
scanData : {};
options :BarcodeScannerOptions;
  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LanchAlertPage');
  }
scanCode(){
  /*this.options = {
        prompt : "Scan your barcode "
    }*/
    this.barcodeScanner.scan().then((barcodeData) => {

        console.log(barcodeData);
        this.scanData = barcodeData.text;
    }, (err) => {
        console.log("Error occured : " + err);
    });
}
  
}
