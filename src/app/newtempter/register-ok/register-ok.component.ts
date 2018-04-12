import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register-ok',
  templateUrl: './register-ok.component.html',
  styleUrls: ['./register-ok.component.css']
})
export class RegisterOkComponent implements OnInit {
private phone:String;
  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
  	$(window).unbind("scroll");
  	this.activatedRoute.params.subscribe(params=>{
  		this.phone=params.phone;
  	})
  }

}
