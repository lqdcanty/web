import { Component, OnInit,Output, Input,EventEmitter} from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/forkJoin';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
/*import { SanloginService} from "./serve/sanlogin.service";*/


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  private anc;
  private abcd;
  ranksLists = "";
	private Swiper;
	private banners;
	dataSource1:Observable<any>;//用来接收http相应返回的那个首页上部分流；
  dataRecent:Observable<any>;//用来接收http相应返回的那个首页中最近更新的流；
  bannersList:Array<any>=[];
  homeRecntlyList:Array<any>=[];//用于我们的模板中数据的绑定首页最近更新数据；
  noticesList:Array<any>=[];
  //rank相关数据；
  rankingList:Array<any>=[];
  rankingRank:Array<any>=[];
  private bannersImg:Array<any>=[];
  private homeSlideArray:Array<any>=[];
  public rankingRank1:Array<any>;public rankingRank1Name:string;private rankingRank1Id:number;
  public rankingRank2:Array<any>;public rankingRank2Name:string;private rankingRank2Id:number;
  public rankingRank3:Array<any>;public rankingRank3Name:string;private rankingRank3Id:number;
  public rankingRank4:Array<any>;public rankingRank4Name:string;private rankingRank4Id:number;
  public rankingRank5:Array<any>;public rankingRank5Name:string;private rankingRank5Id:number;
  public rankingRank6:Array<any>;public rankingRank6Name:string;private rankingRank6Id:number;
  public rankingRank7:Array<any>;public rankingRank7Name:string;private rankingRank7Id:number;
  public rankingRank8:Array<any>;public rankingRank8Name:string;private rankingRank8Id:number;
  constructor(private http:Http,private cookieService:CookieService) { 
    this.dataSource1=this.http.post(environment.apiBase+'/pc/api/index',{})
	  .map(res=>res.json()) //主要作用就是想把数据的格式转化层json格式;
    this.dataRecent=this.http.post(environment.apiBase+'/pc/api/recently',{})
    .map(res=>res.json())
  }
  ngOnInit() {
    this.sanLogin();
    $(window).unbind("scroll");
    this.dataSource1.subscribe(
    	(data)=>{
        this.noticesList=data.data.notices;
        this.bannersList=data.data.banners;
        this.rankingList=data.data.ranking;
        var rbanner=this.bannersList.length;
        for(var j=0;j<rbanner;j++){
          var tempBanner = this.bannersList[j];
          var rType = this.bannersList[j].bannerType;
          if(rType=='4'){
            this.bannersImg.push(tempBanner);
          }else if(rType=='3'){
            this.homeSlideArray.push(tempBanner);
          }
        }

        var rLength = this.rankingList.length;
        
        for(var i=0;i<rLength;i++){
          var tempRank = this.rankingList[i];
          var rType = this.rankingList[i].rankingType;
          if(rType==='7'){
            this.rankingRank.push(tempRank);
          }
        }
        this.rankingRank1=this.rankingRank[0].bookList;
        this.rankingRank1Name=this.rankingRank[0].rankingName;
        this.rankingRank1Id=this.rankingRank[0].rankingId;

        this.rankingRank2=this.rankingRank[1].bookList;
        this.rankingRank2Name=this.rankingRank[1].rankingName;
        this.rankingRank2Id=this.rankingRank[1].rankingId;

        this.rankingRank3=this.rankingRank[2].bookList;
        this.rankingRank3Name=this.rankingRank[2].rankingName;
        this.rankingRank3Id=this.rankingRank[2].rankingId;

        this.rankingRank4=this.rankingRank[3].bookList;
        this.rankingRank4Name=this.rankingRank[3].rankingName;
        this.rankingRank4Id=this.rankingRank[3].rankingId;

        this.rankingRank5=this.rankingRank[4].bookList;
        this.rankingRank5Name=this.rankingRank[4].rankingName;
        this.rankingRank5Id=this.rankingRank[4].rankingId;

        this.rankingRank6=this.rankingRank[5].bookList;
        this.rankingRank6Name=this.rankingRank[5].rankingName;
        this.rankingRank6Id=this.rankingRank[5].rankingId;

        this.rankingRank7=this.rankingRank[6].bookList;
        this.rankingRank7Name=this.rankingRank[6].rankingName;
        this.rankingRank7Id=this.rankingRank[6].rankingId;

        this.rankingRank8=this.rankingRank[7].bookList;
        this.rankingRank8Name=this.rankingRank[7].rankingName;
        this.rankingRank8Id=this.rankingRank[7].rankingId;
    })

    this.dataRecent.subscribe(
       (data)=>{
        this.homeRecntlyList=data.data.bookList;
    })


  }
  sanLogin(){
    var longUrl=decodeURIComponent(window.location.href).split("?userData=")[0];
    var tempUrl=decodeURIComponent(window.location.href).split("?userData=")[1];
    var flage;
    if(tempUrl!=undefined){
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
    }
  }


}
