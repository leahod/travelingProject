import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Auth } from 'src/app/services/auth';
import { DriverServiceService } from 'src/app/services/driver-service.service';
import { PassengerServiceService } from 'src/app/services/passenger-service.service';
import { Passenger } from 'src/app/entities/passenger';
import { Driver } from 'src/app/entities/driver';
import { User } from 'src/app/entities/user';

@Component({
  selector: 'app-change-user-login',
  templateUrl: './change-user-login.component.html',
  styleUrls: ['./change-user-login.component.scss']
})
export class ChangeUserLoginComponent implements OnInit {

  passenger: Passenger = new Passenger(null, "", new User("", "", "", true));

  constructor(
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
      this.changeUser.textUser="אני נהג";
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
      this.changeUser.textUser="אני נוסע";
      localStorage.removeItem("passenger");
      this.driverService.getDriverById(JSON.parse(localStorage.getItem("user")).Identity).subscribe((state: Driver) => {
        state == null ?
          [this.router.navigate(['/new-driver/' + JSON.parse(localStorage.getItem("user")).Identity])] :
          [localStorage.setItem("driver", JSON.stringify(state)), this.router.navigate(['/exists-driver']), console.log(state)]
      });
    }
  }
}
