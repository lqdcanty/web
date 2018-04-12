import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Headers, Http } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-accept-agreement',
  templateUrl: './accept-agreement.component.html',
  styleUrls: ['./accept-agreement.component.css']
})
export class AcceptAgreementComponent implements OnInit {

  constructor(private cookieService: CookieService,private router :Router) { }

  ngOnInit() {
    $(window).unbind("scroll");
  }
  getCookie(key:string){
    return this.cookieService.get(key);
  }
 

}
