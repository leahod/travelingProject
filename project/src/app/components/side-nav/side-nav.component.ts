import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PassengerServiceService } from 'src/app/services/passenger-service.service';
import { DriverServiceService } from 'src/app/services/driver-service.service';
import { Auth } from 'src/app/services/auth';
import { Passenger } from 'src/app/entities/passenger';
import { User } from 'src/app/entities/user';
import { Driver } from 'src/app/entities/driver';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {


  showFiller = false;
  passenger: Passenger = new Passenger(null, "", new User("", "", "", true));

  constructor
    (
      private router: Router,
      private changeUser: Auth,
      private driverService: DriverServiceService,
      private passengerService: PassengerServiceService
    ) { }

  ngOnInit() {
  }

  changeUserLogin() {
    if (this.changeUser.changeUserLogin == 1) {
      this.changeUser.changeUserLogin = 2;
      this.changeUser.textUser = "אני נהג";
      localStorage.removeItem("driver");
      this.passengerService.getPassengerById(JSON.parse(localStorage.getItem("user")).Identity)
        .subscribe((state: Passenger) => {
          state == null ?
            [
              this.passenger.Identity = JSON.parse(localStorage.getItem("user")).Identity,
              this.passengerService.addPassenger(this.passenger).subscribe(p =>
                this.router.navigate(['/exists-passenger/' + parseInt(JSON.parse(localStorage.getItem("user")).Identity)]))
            ]
            :
            this.router.navigate(['/exists-passenger/' + parseInt(JSON.parse(localStorage.getItem("user")).Identity)])
        });
    }
    else if (this.changeUser.changeUserLogin == 2) {
      this.changeUser.changeUserLogin = 1;
      this.changeUser.textUser = "אני נוסע";
      localStorage.removeItem("passenger");
      this.driverService.getDriverById(JSON.parse(localStorage.getItem("user")).Identity).subscribe((state: Driver) => {
        state == null ?
          [this.router.navigate(['/new-driver/' + JSON.parse(localStorage.getItem("user")).Identity])] :
          [localStorage.setItem("driver", JSON.stringify(state)), this.router.navigate(['/exists-driver']), console.log(state)]
      });
    }
  }

  statistics() {
    this.router.navigate(['/statistics/']);
  }

  close() {
    setTimeout(() => {
      window.close()
    }, 100);
  }

  add() {
    if (JSON.parse(localStorage.getItem("passenger")) != null)
      this.router.navigate(['/new-traveling-p/']);
    if (JSON.parse(localStorage.getItem("driver")) != null)
      this.router.navigate(['/new-traveling-d/']);
  }
  travelings() {
    if (JSON.parse(localStorage.getItem("passenger")) != null)
      this.router.navigate(['/exists-traveling-p/']);
    if (JSON.parse(localStorage.getItem("driver")) != null)
      this.router.navigate(['/exists-traveling-d/']);

  }
}
