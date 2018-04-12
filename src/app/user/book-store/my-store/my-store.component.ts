import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-my-store',
  templateUrl: './my-store.component.html',
  styleUrls: ['./my-store.component.css']
})
export class MyStoreComponent implements OnInit {
private myBookStore:Array<any>;
private recommendList:Array<any>;
private tipLayerBoolean=false;
private tipMessage:string;
private loginBoolean=false;
private bookDeleteArr:Array<number>=[];
public params; // 保存页面url参数
 public totalNum = 0; // 总数据条数
 public pageSize =10;// 每页数据条数
 public totalPage = 0;// 总页数
 public curPage = 1;// 当前页码
//private allSelectArray:Array<number>=[]
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
    let userId=this.getCookie("userId");

    //推荐
    this.collectFunction();
    this.myCollectFunction();

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
    let body="userId="+userId+"&bookId="+delectArrString+"&type=1";
    this.http.post(environment.apiBase+"/pc/api/remove",body,{headers:this.header})
    //this.http.get("http://localhost:4200/data/stick.json")
    .map(res=>res.json())
    .subscribe(data=>{
      if(data.httpCode==200){
        this.tipLayerBoolean=true;
        this.tipMessage=data.msg;
        setTimeout(()=>{
          //this.tipLayerBoolean=false;
          //this.curPage=1;
          this.myCollectFunction();
        },1000);
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
  //加入书架；
  addStore(bookId:number):void{
    let userId=this.getCookie("userId");
    let body="bookId="+bookId+"&userId="+userId;
    this.http.post(environment.apiBase+"/pc/api/bookshelf/add",body,{headers:this.header})
    .map(res=>res.json())
    .subscribe(data=>{
      if(data.httpCode==200){
        this.tipLayerBoolean=true;
        this.tipMessage=data.msg;
        setTimeout(()=>{
          this.tipLayerBoolean=false;
          this.collectFunction();
          this.curPage=1;
          this.myCollectFunction();
        },1000);
      }else if(data.httpCode==100){
        this.loginBoolean=true;
      }else{
        this.tipLayerBoolean=true;
        this.tipMessage=data.msg;
        setTimeout(function(){
          this.tipLayerBoolean=false;
        },2500);
      }
    })
  }
  myCollectFunction(){
    let userId=this.getCookie("userId");
    let body="userId="+userId+"&pageNum="+this.curPage+"&pageSize="+this.pageSize;
    this.http.post(environment.apiBase+"/pc/api/my/bookshelf",body,{headers:this.header})
    //this.http.get("http://localhost:4200/assets/data/mybookstore.json")
    .map(res=>res.json())
    .subscribe(data=>{
      if(data.httpCode==200){
        this.tipLayerBoolean=false;
        console.log(data.data.list);
        this.myBookStore=data.data.list;
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
  //一键搜藏；
  collect(recommendList:Array<any>):void{
    let bookIdArr=[];
    for(var i=0;i<recommendList.length;i++){
      bookIdArr.push(recommendList[i].bookId)
    }
    console.log(bookIdArr);
    let bookIdArrString=bookIdArr.toString();
    console.log(bookIdArrString);
    let userId=this.getCookie("userId");
    let body="bookId="+bookIdArrString+"&userId="+userId;
    this.http.post(environment.apiBase+"/pc/api/bookshelf/add",body,{headers:this.header})
    .map(res=>res.json())
    .subscribe(data=>{
      if(data.httpCode==200){
        this.tipLayerBoolean=true;
        this.tipMessage=data.msg;
        setTimeout(()=>{
          //this.tipLayerBoolean=false;
          this.collectFunction();
          this.curPage=1;
          this.myCollectFunction();
        },1000);
      }else if(data.httpCode==100){
        this.loginBoolean=true;
      }else{
        this.tipLayerBoolean=true;
        this.tipMessage=data.msg;
        setTimeout(function(){
          this.tipLayerBoolean=false;
        },2500);
      }
    })
  }
  toTop(bookId:number):void{
    let userId=this.getCookie("userId");
    let body="userId="+userId+"&bookId="+bookId+"&type=1";
    this.http.post(environment.apiBase+"/pc/api/stick",body,{headers:this.header})
    //this.http.get("http://localhost:4200/data/stick.json")
    .map(res=>res.json())
    .subscribe(data=>{
      if(data.httpCode==200){
        this.tipLayerBoolean=true;
        this.tipMessage=data.msg;
        setTimeout(()=>{
          //this.tipLayerBoolean=false;
          //this.curPage=1;
          this.myCollectFunction();
        },500);
      }else if(data.httpCode==100){
        this.loginBoolean=true;
      }else{
        this.tipLayerBoolean=true;
        this.tipMessage=data.msg;
      }
    })
  }
  delete(bookId:number):void{
    let userId=this.getCookie("userId");
    let body="userId="+userId+"&bookId="+bookId+"&type=1";
    this.http.post(environment.apiBase+"/pc/api/remove",body,{headers:this.header})
    //this.http.get("http://localhost:4200/data/stick.json")
    .map(res=>res.json())
    .subscribe(data=>{
      if(data.httpCode==200){
        this.tipLayerBoolean=true;
        this.tipMessage=data.msg;
        setTimeout(()=>{
          //this.tipLayerBoolean=false;
          //this.curPage=1;
          this.myCollectFunction();
        },500);
      }else if(data.httpCode==100){
        this.loginBoolean=true;
      }else{
        this.tipLayerBoolean=true;
        this.tipMessage=data.msg;
      }
    })
  }
  collectFunction(){
    let bodyRecommend="";
    this.http.post(environment.apiBase+"/pc/api/recommend/booklist",bodyRecommend,{headers:this.header})
    .map(res=>res.json())
    .subscribe(data=>{
      if(data.httpCode==200){
        this.tipLayerBoolean=false;
        console.log(data.data);
        this.recommendList=data.data;
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
    this.myCollectFunction();
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
