import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-phonebind-ok',
  templateUrl: './phonebind-ok.component.html',
  styleUrls: ['./phonebind-ok.component.css']
})
export class PhonebindOkComponent implements OnInit {
private phone:String;
  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
  	this.activatedRoute.params.subscribe(params=>{
  		this.phone=params.phone;
  	})
  }

}
