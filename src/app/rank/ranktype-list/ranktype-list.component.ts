import { Component, OnInit,Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/forkJoin';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-ranktype-list',
  templateUrl: './ranktype-list.component.html',
  styleUrls: ['./ranktype-list.component.css']
})
export class RanktypeListComponent implements OnInit {
 private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});
  ranksLists:Array<any>=[];
  private tipLayerBoolean:boolean;
  private tipMessage:string;
  recevicetip(msg:boolean):void{
      this.tipLayerBoolean=msg;
    }
  constructor(private http : Http,private cookieService:CookieService) { }

  ngOnInit() {
    //this.sanLogin();
    $(window).unbind("scroll");
  	 //this.http.get('http://localhost:4200/assets/data/rank.json')
     let body="";
     this.http.post(environment.apiBase+"/pc/api/ranking",body,{headers:this.header})
	  .map(res=>res.json())
	  .subscribe(
	  	(data)=>{
	  		if(data.httpCode){
          this.ranksLists=data.data;
          console.log(typeof this.ranksLists);
        }else{
            this.tipLayerBoolean=true;
            this.tipMessage=data.msg;
            setTimeout(function(){
              this.tipLayerBoolean=false;
            },2500)
        }
	  	})
  }
  /*sanLogin(){
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