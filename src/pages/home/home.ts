import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LanchAlertPage } from '../lanch-alert/lanch-alert'
import { PoubelleDataProvider } from '../../providers/poubelle-data/poubelle-data';
import {Poubelle} from "../../models/poubelle";
declare var google: any;
//declare var Destination: any;

@Component({
 selector: 'page-home',
 templateUrl: 'home.html'
})
export class HomePage {

 @ViewChild('map') mapRef: ElementRef;
 map: any;
 infoWindow: any;
 Location:any='';
 Destination: any='';
 address:any;
 poubelles: Array<Poubelle> = new Array<Poubelle>();

 
// start = 'lyon, l';
// end = 'villeurbanne, vil';
 directionsService = new google.maps.DirectionsService;
 directionsDisplay = new google.maps.DirectionsRenderer;

 
 constructor(public navCtrl: NavController, public poubelleService: PoubelleDataProvider) {
 let that=this;
   
      that.poubelleService.getRemoteData()
      .subscribe(
      (result: any) => {
        that.poubelles = result;
      },
      (error: Error) => console.log("Failed to load poubelles: " + error),
      //() => this.loadmap()
      );
   setTimeout(function () {
     that.showMap();
   }, 2000)
 }

   
   ionViewDidLoad(){
  
   }
   
 
  
   showMap(){
     
   let that=this;
   /*  const location =new google.maps.LatLng(51.507, -0.1245);
     const options={
       center: location,
       zoom:10,
       streetViewControl: false,
       mapTypeId: 'terrain'
         };
     
     this.map=new google.maps.Map(this.mapRef.nativeElement, options);
     
     this.addMarker(location, this.map);*/
      this.map = new google.maps.Map(document.getElementById('map'), {
         center: {lat: -34.397, lng: 150.644},
         zoom: 12
       })
       this.infoWindow = new google.maps.InfoWindow;
       this.directionsDisplay.setMap(this.map);


       // Try HTML5 geolocation.
       if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function(position) {
           var pos= {
             lat: position.coords.latitude,
             lng: position.coords.longitude
           };
           
           
           that.infoWindow.setPosition(pos);
           that.infoWindow.setContent('Your Location');
           that.infoWindow.open(that.map);
           that.map.setCenter(pos);
           
           that.Location= new google.maps.LatLng(pos);
           
         // display the grabich: debut  
           var features = [
          { 
            position: new google.maps.LatLng(45.7639259999777, 4.874287364518945),
            type: 'Glass'
          }, {
            position: new google.maps.LatLng(45.759888164225366, 4.876007440103087),
            type: 'Plastic'
          }, {
            position: new google.maps.LatLng(45.7808123636, 4.857569031311695),
            type: 'Glass'
          }, {
            position: new google.maps.LatLng(45.76956807671582, 4.857236427534327),
            type: 'Plastic'
          }
           ]
           
            var iconBase = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|';
            var icons = {
              MyLocation: {
                icon: iconBase + 'A4405E'
                       },
             Glass: {
                icon: iconBase + '40A497'
                      },
             Plastic: {
                icon: iconBase + '7802DF'
                    }
            };
           var MyLocationmarker = new google.maps.Marker({
                position: pos,
                map: that.map,
                title: 'Your Location!',
                icon: icons.MyLocation.icon,
                animation: google.maps.Animation.DROP,
               });
      
           
           features.forEach(function(feature) {
             var marker = new google.maps.Marker({
                                                    position: feature.position,
                                                    icon: icons[feature.type].icon,
                                                    map: that.map,
                                                    animation: google.maps.Animation.DROP,
                                                 });
          
          
          
          marker.addListener('click', function() {
          that.Destination=marker.getPosition();
          that.calculateAndDisplayRoute();
        });
             
             });
           
          that.poubelles.forEach (function(poubelle) {
            var marker = new google.maps.Marker({
                                                    position: new google.maps.LatLng( poubelle.latitude, poubelle.longitude),
                                                    icon: icons.MyLocation.icon,
                                                    map: that.map,
                                                   // animation: google.maps.Animation.DROP,
                                                 });
            marker.addListener('click', function() {
          that.Destination=marker.getPosition();
          that.calculateAndDisplayRoute();
        });

            });
           
     var geocoder=new google.maps.Geocoder();
       document.getElementById('submit').addEventListener('click', function() {
          that.geocodeAddress(geocoder,that.map);
        });
       
           
           //setMarkers(that.map);
           
         }, function() {
           this.handleLocationError(true, that.infoWindow, that.map.getCenter(),this.map);
         });
       } else {
         // Browser doesn't support Geolocation
         this.handleLocationError(false, that.infoWindow, that.map.getCenter(),that.map);
       }
     }
   
   
  /* addMarker(position, map){
     return new google.maps.Marker({
       position,
       map
     })
   }*/
handleLocationError(browserHasGeolocation, infoWindow, pos, map) {
       infoWindow.setPosition(pos);
       infoWindow.setContent(browserHasGeolocation ?
                             'Error: The Geolocation service failed.' :
                             'Error: Your browser doesn\'t support geolocation.');
       infoWindow.open(map);
     
 }
  

  geocodeAddress(geocoder,resultsMap) {
       
       
        //var geocoder=new google.maps.Geocoder(); 
        geocoder.geocode({'address': this.address}, function(results, status) {
          if (status === 'OK') {
            //NewLocation=results[0].geometry.location;
            resultsMap.setCenter(new google.maps.LatLng(results[0].geometry.location));
            var marker = new google.maps.Marker({
              map:resultsMap ,
              position:results[0].geometry.location,
            });
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
          })
     
}
  
  LanchAlert(){
    
    console.log("Seconde page");
    this.navCtrl.push(LanchAlertPage);
  }
  
  
// Destination=new google.maps.LatLng(45.7808123636, 4.857569031311695);
 calculateAndDisplayRoute() {

   this.directionsService.route({
     origin: this.Location,
     destination: this.Destination,
     travelMode: 'WALKING'
   }, (response, status) => {
     if (status === 'OK') {
       this.directionsDisplay.setDirections(response);
     } else {
       window.alert('Directions request failed due to ' + status);
}
     });
  
  }




}