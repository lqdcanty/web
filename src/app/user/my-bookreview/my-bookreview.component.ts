import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-my-bookreview',
  templateUrl: './my-bookreview.component.html',
  styleUrls: ['./my-bookreview.component.css']
})
export class MyBookreviewComponent implements OnInit {
private commentList:Array<any>;
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
    //this.sanLogin();
    $(window).unbind("scroll");
    let userId=this.getCookie("userId");
    let body="userId="+userId+"&pageNum="+this.curPage+"&pageSize="+this.pageSize;
    this.http.post(environment.apiBase+"/pc/api/my/comment",body,{headers:this.header})
    //this.http.get("http://localhost:4200/assets/data/myComment.json")
    .map(res=>res.json())
    .subscribe(data=>{
      if(data.httpCode==200){
        console.log(data.data.list);
        this.commentList=data.data.list;
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
  getPageData(pageNo) {
    let vm = this;
    vm.curPage = pageNo;
    //console.log('触发', pageNo);
    let userId=this.getCookie("userId");
    let body="userId="+userId+"&pageNum="+this.curPage+"&pageSize="+this.pageSize;
    this.http.post(environment.apiBase+"/pc/api/my/comment",body,{headers:this.header})
    //this.http.get("http://localhost:4200/assets/data/myComment.json")
    .map(res=>res.json())
    .subscribe(data=>{
      if(data.httpCode==200){
        console.log(data.data.list);
        this.commentList=data.data.list;
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
