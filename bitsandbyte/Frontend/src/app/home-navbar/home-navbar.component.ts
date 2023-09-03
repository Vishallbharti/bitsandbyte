import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.css']
})
export class HomeNavbarComponent implements OnInit {

  
@Input()
public searchText = "";


  constructor() { }

  ngOnInit(): void {
  }

  

}
