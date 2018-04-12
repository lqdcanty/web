import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/forkJoin';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {
private bookDetailContent;
private noticeId:number;
private tipLayerBoolean:boolean=false;
private tipMessage:string;
private title:string;private author:string;private publish_time:string;private content:string;
private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});
  constructor(private http:Http,private activatedRoute:ActivatedRoute,private cookieService:CookieService) { }

  ngOnInit() {
  /*  this.sanLogin();*/
  	$(window).unbind("scroll");
  	this.activatedRoute.params.subscribe((Params) => { 
  		this.noticeId=Params.noticeId;
  		let body="noticeId="+this.noticeId;
  		this.http.post(environment.apiBase+"/pc/api/notices",body,{headers:this.header})
  		.map(res=>res.json())
  		.subscribe(data=>{
  			if(data.httpCode==200){
          $(window).scrollTop(0);
  				this.title=data.data.title;
  				this.author=data.data.author;
  				this.publish_time=data.data.publish_time;
  				this.content=data.data.content;
  			}else{
  				this.tipLayerBoolean=true;
  				this.tipMessage=data.msg;
          setTimeout(()=>{
            this.tipLayerBoolean=false;
          },2500)
  			}
  		})
  	})
  }
 /*  sanLogin(){
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
