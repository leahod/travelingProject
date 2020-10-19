import {Time} from '@angular/common';
import {Address1} from './address'
 
//import {Address} from 'ngx-google-places-autocomplete/objects/address';
export class travelingPassenger {
    public TravelingIdPassenger: number;
    public PassengerId: number;
    public Weekday: string;
    public Places: string;
    public FromTime: Time;
    public ToTime: Time;
    public FromDate: Date;
    public ToDate: Date;
    public Price: number;
    public Source: string;
    public Destination: string;
    public IsEmbedded: string;
    public IsActive: boolean;

    constructor(TravelingIdPassenger:number, PassengerId:number,Weekday:string,Places: string,FromTime: Time,ToTime: Time,FromDate: Date,ToDate: Date,Price: number,Source:string,Destination: string, IsActive: boolean) {
          this.TravelingIdPassenger = TravelingIdPassenger;
        this.PassengerId = PassengerId;
        this.Weekday=Weekday;
        this.Places=Places;
        this.FromTime=FromTime;
        this.ToTime=ToTime;
        this.FromDate=FromDate;
        this.ToDate=ToDate;
        this.Price=Price;
        this.Source=Source;
        this.Destination=Destination;
        this.IsActive=IsActive;
    }
}