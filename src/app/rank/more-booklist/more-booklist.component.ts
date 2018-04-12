import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {ActivatedRoute,Router} from "@angular/router";
import { environment } from '../../../environments/environment';
import 'rxjs/Rx';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-more-booklist',
  templateUrl: './more-booklist.component.html',
  styleUrls: ['./more-booklist.component.css']
})
export class MoreBooklistComponent implements OnInit {
  private moreRank:Array<any>
  private rankingId:Number;
  private rankingName:String;
  private params;
  private totalNum=0; // 总数据条数
  private pageSize = 10;// 每页数据条数
  private totalPage=0 ;// 总页数
  private curPage = 1;// 当前页码
  private tipLayerBoolean:boolean=false;
  private tipMessage: string
  private loginBoolean:boolean=false;
  private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});
  recevicetip(msg:boolean):void{
    this.tipLayerBoolean=msg;
  }
  reviceLogin(msg:boolean){
    this.loginBoolean=msg;
  }
  changeCurPage(msg:number){
    this.curPage=msg;
    console.log(this.curPage,"this.curPage");
  }
  constructor(private http:Http, private activatedRoute:ActivatedRoute,
   private cookieService:CookieService,private location:Location) { 
  }



  ngOnInit() {  
    //this.sanLogin();
    $(window).unbind("scroll");
    this.activatedRoute.queryParams.subscribe(queryParams => {  
        this.rankingId = queryParams.rankingId;  
        this.rankingName = queryParams.rankingName; 
        this.curPage=1;
        console.log(queryParams);
        var userId=this.getCookie("userId")?this.getCookie("userId"):-1;
        let body="userId="+userId+"&rankingId="+this.rankingId+"&pageNum="+this.curPage+"&pageSize="+this.pageSize;
         console.log(body);
        this.http.post(environment.apiBase+"/pc/api/ranking/list",body,{headers:this.header})
        .map(res=>res.json())
        .subscribe((data)=>{
              if(data.httpCode==200){
                this.moreRank=data.data.list;
                this.totalPage=Math.ceil(data.data.total/data.data.pageSize);
                this.totalNum=data.data.total;
                console.log(this.totalPage,this.totalNum);
              }else{
                this.tipLayerBoolean=true;
                this.tipMessage=data.msg;
                setTimeout(()=>{
                  this.tipLayerBoolean=false;
                },2500);
              }
          });
    })
  }

  getPageData(pageNo) {
  let vm = this;
  //vm.curPage = pageNo;
  console.log('触发', pageNo);
  var userId=this.getCookie("userId")?this.getCookie("userId"):-1;
  let body="userId="+userId+"&rankingId="+this.rankingId+"&pageNum="+pageNo+"&pageSize="+this.pageSize;
     console.log(body);
    this.http.post(environment.apiBase+"/pc/api/ranking/list",body,{headers:this.header})
    .map(res=>res.json())
    .subscribe(
      (data)=>{
          if(data.httpCode==200){
            this.moreRank=data.data.list; 
          }else{
            this.tipLayerBoolean=true;
            this.tipMessage=data.msg;
            setTimeout(()=>{
              this.tipLayerBoolean=false;
            },2500)
          }
      });
 }
 getCookie(key:string){
    return this.cookieService.get(key);
  }
  addbookLibray(rank:any){
     if(rank.concernFlag!="1"){
      let userId=this.getCookie("userId");
      let body="userId="+userId+"&bookId="+rank.bookId;
      this.http.post(environment.apiBase+"/pc/api/bookshelf/add",body,{headers:this.header})
      .map(res=>res.json())
      .subscribe(data=>{
        if(data.httpCode==100){
          this.loginBoolean=true;
        }else if(data.httpCode==200){
          rank.concernFlag="1";
          this.tipLayerBoolean=true;
          this.tipMessage="收藏成功！";
          setTimeout(()=>{
            this.tipLayerBoolean=false;
          },2500)
        }else{
          this.tipLayerBoolean=true;
          this.tipMessage=data.msg;
          setTimeout(()=>{
            this.tipLayerBoolean=false;
          },2500)
        }
      })
    }
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
