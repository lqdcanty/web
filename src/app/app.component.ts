import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute,NavigationStart,NavigationEnd } from '@angular/router';
import {Location}from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  	constructor(router:Router) {
		  
  	}
  	
  	ngOnInit() {
  		 // console.log(location.pathname)
  		 // if(location.pathname==='/topUp'){
  		 // 	console.log("abc")
  		 // }
		
		
	}
}

