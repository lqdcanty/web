import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-my-subscription',
  templateUrl: './my-subscription.component.html',
  styleUrls: ['./my-subscription.component.css']
})
export class MySubscriptionComponent implements OnInit {
private subscribeList:Array<any>;
private tipLayerBoolean=false;
private tipMessage:string;
private loginBoolean=false;
 public totalNum = 0; // 总数据条数
 public pageSize = 10;// 每页数据条数
 public totalPage = 0;// 总页数
 public curPage = 1;// 当前页码
 private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});
reviceLogin(msg:boolean){
  this.loginBoolean=msg;
}
recevicetip(msg:boolean):void{
  this.tipLayerBoolean=msg;
}
  constructor(private cookieService: CookieService,private http:Http) { }

  ngOnInit() {
    $(window).unbind("scroll");
    this.subscribeFunction();
    //this.sanLogin();
  }
  subscribeFunction(){
    let userId=this.getCookie("userId");
    let body="userId="+userId+"&pageNum="+this.curPage+"&pageSize="+this.pageSize;
    this.http.post(environment.apiBase+"/pc/api/my/purchased",body,{headers:this.header})
    //this.http.get("http://localhost:4200/assets/data/dypurchased.json")
    .map(res=>res.json())
    .subscribe(data=>{
      if(data.httpCode==200){
        console.log(data.data.list);
        this.subscribeList=data.data.list;
        this.totalPage=Math.ceil(data.data.total/data.data.pageSize);
        this.totalNum=data.data.total;
      }else if(data.httpCode==100){
        this.loginBoolean=true;
      }else{
        this.tipLayerBoolean=true;
        this.tipMessage=data.msg;
        setTimeout(()=>{
          this.tipLayerBoolean=false;
        },2500)
      }
    })
  }
  toTop(bookId:number):void{
    let userId=this.getCookie("userId");
    let body="userId="+userId+"&bookId="+bookId+"&type=3";
    this.http.post(environment.apiBase+"/pc/api/stick",body,{headers:this.header})
    //this.http.get("http://localhost:4200/data/stick.json")
    .map(res=>res.json())
    .subscribe(data=>{
      if(data.httpCode==200){
        this.tipLayerBoolean=true;
        this.tipMessage=data.msg;
        setTimeout(()=>{
          //this.curPage=1;
          this.subscribeFunction();
          this.tipLayerBoolean=false;
        },800)
      }else if(data.httpCode==100){
        this.loginBoolean=true;
      }else{
        this.tipLayerBoolean=true;
        this.tipMessage=data.msg;
        setTimeout(()=>{
          this.tipLayerBoolean=false;
        },2500)
      }
    })
  }
  getPageData(pageNo) {
    this.curPage = pageNo;
    //console.log('触发', pageNo);
    this.subscribeFunction();
   }
  getCookie(key:string){
    return this.cookieService.get(key);
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
