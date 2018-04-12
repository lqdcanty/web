import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.css']
})
export class ActiveComponent implements OnInit {

  constructor(private cookieService:CookieService) { }

  ngOnInit() {
  	//this.sanLogin();
  	
  }


}
