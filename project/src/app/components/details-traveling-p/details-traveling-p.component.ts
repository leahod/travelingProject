import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TravelingPassengerService } from 'src/app/services/traveling-passenger.service';
import { travelingPassenger } from 'src/app/entities/travelingPassenger';
import { RegisterationService } from 'src/app/services/registeration.service';
import { Registeration } from 'src/app/entities/registeration';

@Component({
  selector: 'app-details-traveling-p',
  templateUrl: './details-traveling-p.component.html',
  styleUrls: ['./details-traveling-p.component.scss']
})
export class DetailsTravelingPComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private travelingPassengerService: TravelingPassengerService,
    private registerationService: RegisterationService) { }

  id: number;
  public traveling: travelingPassenger = new travelingPassenger(null, 0, "", "", null, null,null, null, 0, "", "",true);
  public registerations: Registeration=new Registeration(0,0,0);

  ngOnInit() {
    this.setTraveling();
    ///////////////////////////////////
    
  }

  setTraveling() {
    this.activatedRoute.url.subscribe(url => {
      this.id = +this.activatedRoute.snapshot.paramMap.get('id')
    });
    console.log(this.id);
    this.travelingPassengerService.getTravelingById(this.id)
      .subscribe((state: travelingPassenger) => this.traveling = state);
  }

  SaveDetails() {
    
    // this.registerationService.getRegisterationsByPassenger(this.traveling.TravelingIdPassenger)
    //   .subscribe((state: Registeration[]) => { this.registerations = state, console.log(this.registerations) })
    this.travelingPassengerService.updateTraveling(this.traveling).subscribe();
  }
}
