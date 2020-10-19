import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { stringify } from 'querystring';
import { User } from 'src/app/entities/user';
import { TravelingPassengerService } from 'src/app/services/traveling-passenger.service';
import swal from 'sweetalert';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
 

@Component({
  selector: 'app-confirm-driver',
  templateUrl: './confirm-driver.component.html',
  styleUrls: ['./confirm-driver.component.scss']
})
export class ConfirmDriverComponent implements OnInit {

  constructor(private spinnerService: Ng4LoadingSpinnerService,private activatedRoute: ActivatedRoute,private travelingPassengerService:TravelingPassengerService ) { }

   id:string; 
   details: Params;
   
    ngOnInit() {
    
      this.activatedRoute.queryParamMap
    .subscribe((params) => {
      this.details  = { ...params.keys, ...params,...params.keys, ...params };console.log(this.details.params.id)}
);
swal("?האם הנך מאשר הצטרפות נוסע לנסיעתך", {
  buttons: {
    
    catch: {
      text: "מסכים",
      value: "catch",
    },
    catch1: {
      text: "לא מסכים",
      value: "catch1",
    },
  },
})
.then((value) => {
  switch (value) {
  
 
    case "catch":
       this.confirmPassenger();
        
      break;
      case "catch1":
        swal("ביטול הצטרפות נוסע","האם אתה בטוח?", "error");
       this.close();
        break;
  
  }
});
 }
 close()
 {
  setTimeout(() => {
    window.close()
}, 5000);
 }
 
  confirmPassenger()
  {
   
      this.travelingPassengerService.sendMail(this.details.params.idTravelingD,this.details.params.idTravelingP).subscribe(x=>{
       swal(" נשלחה הודעת אישור לנוסע", "נסיעה בטוחה", "success"),
        this.close()}
       
       );
       
            
    }
  }
 
