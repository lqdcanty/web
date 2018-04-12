import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/forkJoin';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-workmanagement-list',
  templateUrl: './workmanagement-list.component.html',
  styleUrls: ['./workmanagement-list.component.css']
})
export class WorkmanagementListComponent implements OnInit {
  private authorWorkList:Array<any>;
  private workNumber:number;
  private pageNum:number=1;
  private tipLayerBoolean:boolean=false;
  private tipMessage: string
  private loginLayer=false;
  private loginBoolean:boolean=false;
  public params; // 保存页面url参数
 public totalNum = 0; // 总数据条数
 public pageSize = 10;// 每页数据条数
 public totalPage = 0;// 总页数
 public curPage = 1;// 当前页码
 private penName:string;
 private noLoginDays:number;
 private imgCover:string;
 /*changeCurPage(msg:number){
    this.curPage=msg;
    console.log(this.curPage,"this.curPage");
  }*/
  recevicetip(msg:boolean):void{
    this.tipLayerBoolean=msg;
  }
  reviceLogin(msg:boolean){
    this.loginBoolean=msg;
  }
  private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});
  constructor(private http:Http,private router:Router,
    private cookieService:CookieService) { }
  ngOnInit() {
    //this.sanLogin();
    this.imgCover=this.getCookie("imgUrl")?this.getCookie("imgUrl"):'../../../assets/images/200.png';
    let userId=this.getCookie("userId");
    let authorDay="userId="+userId;
    this.http.post(environment.apiBase+"/pc/api/author/logininfo",authorDay,{headers:this.header})
    .map(res=>res.json())
    .subscribe(data=>{
      if(data.httpCode==200){
        this.penName=data.data.penName;
        this.noLoginDays=data.data.noLoginDays;
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
    
    var body="userId="+userId+"&pageNum="+this.curPage+"&pageSize="+this.pageSize;
    console.log(body);
    this.http.post(environment.apiBase+"/pc/api/author/book/list",body,{headers:this.header})
    //this.http.get("http://localhost:4200/assets/data/authorWorkList.json")
    .map(res=>res.json())
    .subscribe((data)=>{
      if(data.httpCode==200){
        this.workNumber=data.data.total;
        this.authorWorkList=data.data.list;
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

  }//结束；
  getPageData(pageNo) {
  this.curPage = pageNo;
  console.log('触发页面', pageNo);
  var userId=this.getCookie("userId");
  var body="userId="+userId+"&pageNum="+this.curPage+"&pageSize="+this.pageSize;
   this.http.post(environment.apiBase+"/pc/api/author/book/list",body,{headers:this.header})
    //this.http.get("http://localhost:4200/assets/data/authorWorkList.json")
    .map(res=>res.json())
    .subscribe((data)=>{
      if(data.httpCode==200){
        this.workNumber=data.data.total;
        this.authorWorkList=data.data.list;
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
