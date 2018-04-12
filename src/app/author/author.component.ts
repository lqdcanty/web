import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {ActivatedRoute,Router} from "@angular/router";
import 'rxjs/Rx';
import 'rxjs/add/observable/forkJoin';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  private authorCode:String;
  private authorInfo:any;
  private works:Array<any>;
  private tipLayerBoolean:boolean;
  private tipMessage:string;
  private pageNum:number=1;
  private total:number;

  public params; // 保存页面url参数
 public totalNum = 0; // 总数据条数
 public pageSize = 10;// 每页数据条数
 public totalPage = 0;// 总页数
 public curPage = 1;// 当前页码

  private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});
  recevicetip(msg:boolean){
    this.tipLayerBoolean=msg;
  }
  changeCurPage(msg:number){
    this.curPage=msg;
  }
  constructor(private http:Http, private activatedRoute:ActivatedRoute,
    private cookieService: CookieService) { 
  }

  ngOnInit() {
    //this.sanLogin();
    let total,authorCode;
    $(window).unbind("scroll");
    this.activatedRoute.params.subscribe(Params => {  
        this.authorCode = Params.authorCode;  
    })
    //this.http.get('http://localhost:4200/assets/data/authorinfo.json')
    //function contentFunction(pageNum) {
      let pageNum=1;
      //pageNumF.pageNum
      let body="authorCode="+this.authorCode+"&pageNum="+pageNum+"&pageSize="+this.pageSize;
      this.http.post(environment.apiBase+"/pc/api/author/page",body,{headers:this.header})
      .map(res=>res.json())
      .subscribe((data)=>{
        if(data.httpCode==200){
          this.authorInfo=data.data;
          this.works=data.data.bookList;
          //total=Math.ceil(this.authorInfo.reading.total/this.authorInfo.reading.pageSize);
          this.totalNum =this.authorInfo.reading.total; // 总数据条数
           this.pageSize =10;// 每页数据条数
           this.totalPage = Math.ceil(this.authorInfo.reading.total/this.authorInfo.reading.pageSize);// 总页数
           this.curPage = 1;// 当前页码
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
  let body="authorCode="+this.authorCode+"&pageNum="+pageNo+"&pageSize="+this.pageSize;
   this.http.post(environment.apiBase+"/pc/api/author/page",body,{headers:this.header})
      .map(res=>res.json())
      .subscribe((data)=>{
        if(data.httpCode==200){
          this.authorInfo=data.data;
          this.works=data.data.bookList;
          //total=Math.ceil(this.authorInfo.reading.total/this.authorInfo.reading.pageSize);
          this.totalNum =this.authorInfo.reading.total; // 总数据条数
           this.pageSize =10;// 每页数据条数
           this.totalPage = Math.ceil(this.authorInfo.reading.total/this.authorInfo.reading.pageSize);// 总页数
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

