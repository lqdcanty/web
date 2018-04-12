import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.css']
})
export class RecentComponent implements OnInit {
private recentlyList:Array<any>;
private tipLayerBoolean=false;
private tipMessage:string;
private loginBoolean=false;
private bookDeleteArr:Array<number>=[];
 public params; // 保存页面url参数
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
  constructor(private cookieService: CookieService,private http:Http) { 

  }

  ngOnInit() {
    this.recentList();
   //this.sanLogin();
  	
  }//onint结束；
  recentList(){
    let userId=this.getCookie("userId");
    let body="userId="+userId+"&pageNum="+this.curPage+"&pageSize="+this.pageSize;
    this.http.post(environment.apiBase+"/pc/api/read/logs",body,{headers:this.header})
    //this.http.get("http://localhost:4200/assets/data/userRecently.json")
    .map(res=>res.json())
    .subscribe(data=>{
      if(data.httpCode==200){
        this.tipLayerBoolean=false
        console.log(data.data);
        this.recentlyList=data.data.list;
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
  selectBook(bookId:number):void{
    console.log(this.bookDeleteArr,"要删除的数组里面的id");
    if(this.bookDeleteArr.length>0){
      console.log("要删除的数组里面有值")
      var u=this.bookDeleteArr.indexOf(bookId);
      if(u==-1){
        console.log("没有找到相关的id")
        this.bookDeleteArr.push(bookId);
        console.log(this.bookDeleteArr);
        $(".selectBook").each(function(){
          if($(this).children("input").val()==bookId){
            $(this).children("b").addClass("on");
          }
        })
      }else{
        console.log("找到相关的id")
        this.bookDeleteArr.splice(u,1);
        console.log(this.bookDeleteArr);
        $(".selectBook").each(function(){
          if($(this).children("input").val()==bookId){
            $(this).children("b").removeClass("on");
          }
        })
      }
    }else{
      this.bookDeleteArr.push(bookId);
      console.log(this.bookDeleteArr);
      $(".selectBook").each(function(){
        if($(this).children("input").val()==bookId){
          $(this).children("b").addClass("on");
        }
      })
    }
  }
  //删除所选择的；
  allDelete():void{
    console.log(this.bookDeleteArr);
    let delectArrString=this.bookDeleteArr.toString();
    console.log(delectArrString);
    let userId=this.getCookie("userId");
    let body="userId="+userId+"&bookId="+delectArrString+"&type=2";
    this.http.post(environment.apiBase+"/pc/api/remove",body,{headers:this.header})
    //this.http.get("http://localhost:4200/data/stick.json")
    .map(res=>res.json())
    .subscribe(data=>{
      if(data.httpCode==200){
        this.tipLayerBoolean=true;
        this.tipMessage=data.msg;
        setTimeout(()=>{
          this.recentList();
        },500);
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
  //全部删除的选择按钮；
  allSelect():void{
    let allSelect=[];
    //this.allSelectArray=[];
    if($("#allSelectOn").hasClass("on")){
      $("#allSelectOn").removeClass("on");
      $(".selectBook").each(function(index,element){
        if($(this).children('b').hasClass("on")){
          $(this).children('b').removeClass("on");
          allSelect=[];
        }
      })
      this.bookDeleteArr=allSelect;
      console.log(this.bookDeleteArr);
    }else{
      $("#allSelectOn").addClass("on");
      $(".selectBook").each(function(index,element){
        if(!$(this).children('b').hasClass("on")){
          $(this).children('b').addClass("on");
          var id=parseInt($(this).children('input').val());
          allSelect.push(id);
        }else{
          var id=parseInt($(this).children('input').val());
          allSelect.push(id);
        }
      })
      this.bookDeleteArr=allSelect;
      console.log(this.bookDeleteArr);
    }
  }
  delete(bookId:number):void{
    let userId=this.getCookie("userId");
    let body="userId="+userId+"&bookId="+bookId+"&type=2";
    this.http.post(environment.apiBase+"/pc/api/remove",body,{headers:this.header})
    //this.http.get("http://localhost:4200/data/stick.json")
    .map(res=>res.json())
    .subscribe(data=>{
      if(data.httpCode==200){
        this.tipLayerBoolean=true;
        this.tipMessage=data.msg;
        setTimeout(()=>{
          this.recentList();
        },500);
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
    this.recentList();
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
