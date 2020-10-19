import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { User } from 'src/app/entities/user';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Auth } from 'src/app/services/auth';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  formControl: any;
  user: User = new User("", "", "", true);


  constructor(
    private router: Router,
    private userServiceService: UserServiceService,
    private changeUser: Auth
  ) { }

  ngOnInit() {
    this.changeUser.hiddenchangeUserLogin = true;
    this.setUser();
  }

  setUser() {
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  editUser() {
    this.userServiceService.updateUser(this.user).subscribe();
    localStorage.setItem("user", JSON.stringify(this.user));

    // if (JSON.parse(localStorage.getItem("driver")))
    //   this.router.navigate(['/edit-driver']);
    // else if (JSON.parse(localStorage.getItem("passenger")))
    //   this.router.navigate(['/exists-passenger/' + parseInt(this.user.Identity)]);
    // else this.router.navigate(['/exists-user/' + parseInt(this.user.Identity)]);

    this.router.navigate(['/exists-user/' + parseInt(this.user.Identity)]);
  }

}
