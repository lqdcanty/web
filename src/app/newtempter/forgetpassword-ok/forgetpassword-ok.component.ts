import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-forgetpassword-ok',
  templateUrl: './forgetpassword-ok.component.html',
  styleUrls: ['./forgetpassword-ok.component.css']
})
export class ForgetpasswordOkComponent implements OnInit {

private phone:String;
  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
  	$(window).unbind("scroll");
  	this.activatedRoute.params.subscribe(params=>{
  		this.phone=params.phone;
  	})
  }

}

