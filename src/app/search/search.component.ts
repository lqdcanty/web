import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {ActivatedRoute,Router} from "@angular/router";
import { environment } from '../../environments/environment';
import { Headers, Http } from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
private searchList:Array<any>;
private keyword:string;
  private totalNum=0; // 总数据条数
  private pageSize = 10;// 每页数据条数
  private totalPage=0 ;// 总页数
  private curPage = 1;// 当前页码
  private tipLayerBoolean:boolean=false;
  private tipMessage: string
  private loginBoolean:boolean=false;
private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});
  constructor(private cookieService:CookieService,private activatedRoute:ActivatedRoute,
    private http:Http) { }

  ngOnInit() {
  	//this.sanLogin();
    /***
    ** lqd:2018/3/26
    **搜素作品
    ****/
    this.activatedRoute.params.subscribe(params => {  
      this.keyword=params.keyword;
      let userId=this.getCookie("userId")?this.getCookie("userId"):-1;
      let body="userId="+userId+"&keyword="+this.keyword+"&pageNum="+this.curPage+"&pageSize="+this.pageSize;
      this.http.post(environment.apiBase+"/pc/api/search",body,{headers:this.header})
      .map(res=>res.json()).subscribe(data=>{
        if(data.httpCode==200){
          this.searchList=data.data.list;
          this.totalPage=Math.ceil(data.data.total/data.data.pageSize);
          this.totalNum=data.data.total;
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
  getPageData(pageNo) {
  //vm.curPage = pageNo;
  this.curPage=pageNo;
  console.log('触发', pageNo);
  let userId=this.getCookie("userId")?this.getCookie("userId"):-1;
  let body="userId="+userId+"&keyword="+this.keyword+"&pageNum="+this.curPage+"&pageSize="+this.pageSize;
   this.http.post(environment.apiBase+"/pc/api/search",body,{headers:this.header})
    .map(res=>res.json()).subscribe(data=>{
        if(data.httpCode==200){
          this.searchList=data.data.list; 
        }else{
          this.tipLayerBoolean=true;
          this.tipMessage=data.msg;
          setTimeout(()=>{
            this.tipLayerBoolean=false;
          },2500)
        }
    });
 }
 addbookLibray(rank:any){
     if(rank.shelfFlag!="1"){
      let userId=this.getCookie("userId")?this.getCookie("userId"):-1;
      let body="userId="+userId+"&bookId="+rank.bookId;
      this.http.post(environment.apiBase+"/pc/api/bookshelf/add",body,{headers:this.header})
      .map(res=>res.json())
      .subscribe(data=>{
        if(data.httpCode==100){
          this.loginBoolean=true;
        }else if(data.httpCode==200){
          rank.shelfFlag="1";
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
  recevicetip(msg:boolean):void{
    this.tipLayerBoolean=msg;
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
  }
*/
}
