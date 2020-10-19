import { Component, OnInit } from '@angular/core';
import {ILatLng} from '../directions-map.directive';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
n:number = 9;
  // Washington, DC, USA
  origin: ILatLng = {
    latitude: 38.889931,
    longitude: -77.009003
  };
  // New York City, NY, USA
  destination: ILatLng = {
    latitude: 40.730610,
    longitude: -73.935242
  };
  displayDirections = true;
  zoom = 14;
  constructor() { }

  ngOnInit() {
  }

}
 
  
 