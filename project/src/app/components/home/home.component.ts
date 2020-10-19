import { Component, OnInit } from '@angular/core';
  // import "compass/css3";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.js-submit').on('click', function(){
      $('html').addClass('anim');
   });
   $('.js-reload').on('click', function(){
      $('html').removeClass('anim');
   });
   
  }
   
}
