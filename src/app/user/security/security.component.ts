import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {
private tipLayerBoolean=false;
private phoneBind:boolean=true;
private tipMessage:string;
private loginBoolean=false;
private header = new Headers({'Content-Type':'application/json;charset=utf-8'});
reviceLogin(msg:boolean){
  this.loginBoolean=msg;
}
recevicetip(msg:boolean):void{
  this.tipLayerBoolean=msg;
}
  constructor(private cookieService: CookieService,private http:Http) { }

  ngOnInit() {
    //this.sanLogin();
    $(window).unbind("scroll");
  	if(this.getCookie("phone")==""){
  		this.phoneBind=true;
  	}else{
  		this.phoneBind=false;
  	}
  }
  getCookie(key:string){
    return this.cookieService.get(key);
  }
 /* sanLogin(){
    var longUrl=decodeURIComponent(window.location.href).split("?userData=")[0];
    var tempUrl=decodeURIComponent(window.location.href).split("?userData=")[1];
    var flage;
    if(tempUrl!=undefined){
      console.log(longUrl,tempUrl,"no");
      flage=JSON.parse(tempUrl);
      var expireDate = new Date();  
      expireDate.setDate(expireDate.getDate() + 7); 
      this.cookieService.set( 'userId', flage.userId ,expireDate);
      this.cookieService.set( 'userName', flage.userName,expireDate);
      this.cookieService.set( 'imgUrl', flage.imgUrl,expireDate);
      this.cookieService.set( 'token', flage.token,expireDate);
      this.cookieService.set( 'phone', flage.phone,expireDate);
      this.cookieService.set( 'userCode', flage.userCode,expireDate);
      window.location.href=longUrl;
      window.location.reload();
    }
  }*/

}
