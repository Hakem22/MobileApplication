import { HttpClient } from '@angular/common/http';
import { Poubelle } from '../../models/poubelle';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';

/*
  Generated class for the PoubelleDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PoubelleDataProvider {
private poubellesUrl = 'https://api.bellepoubelle.fr/rest/v1.0/poubelles';
  
  
  constructor(public http: HttpClient) {
    console.log('Hello PoubelleDataProvider Provider');
    
  }

 getRemoteData() : Observable<Poubelle[]> {
       return this.http.get<Poubelle[]>(this.poubellesUrl);
          
  }
  /*log(message: string) {
        this.messageService.add('PoubelleService: ' + message);
    }*/
}
