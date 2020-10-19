import {Time} from '@angular/common';
//import {Address1} from './address'
export class travelingDriver {
    public TravelingIdDriver: number;
    public DriverId: number;
    public Weekday: string;
    public Places: string;
    public Time: Time;
    public FromDate: Date;
    public ToDate: Date;
    public Price: number;
    public Source: string;
    public Destination: string;
    public NumSeats  :number;
    public NumSeatsAvailable :number;
    public IsActive: boolean;

    constructor(TravelingIdDriver:number, DriverId:number,Weekday:string,Places: string,Time: Time,FromDate: Date,ToDate: Date,Price: number,
        Source:string,Destination: string , NumSeats :number,NumSeatsAvailable,IsActive: boolean) {
          this.TravelingIdDriver = TravelingIdDriver;
        this.DriverId = DriverId;
        this.Weekday=Weekday;
        this.Places=Places;
        this.Time=Time;
        this.FromDate=FromDate;
        this.ToDate=ToDate;
        this.Price=Price;
        this.Source=Source;
        this.Destination=Destination;
        this.NumSeats=NumSeats;
        this.NumSeatsAvailable=NumSeatsAvailable;
        this.IsActive=IsActive;
    }
}