import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PoubelleDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PoubelleDataProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PoubelleDataProvider Provider');
    
  }

getRemoteData(){
       this.http.get('https://api.bellepoubelle.fr/rest/v1.0/poubelles').subscribe(data => {
           console.log(data);
       });
  }
}
