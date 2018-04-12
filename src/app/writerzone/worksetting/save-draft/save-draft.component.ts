import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/forkJoin';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-save-draft',
  templateUrl: './save-draft.component.html',
  styleUrls: ['./save-draft.component.css']
})
export class SaveDraftComponent implements OnInit {
  private setTimeBoolean:boolean=false;
  private modifyChapter:boolean=false;
  private bookId:number;
  private drafList:Array<any>;
  private chapterParam:number;
  private btnShowBoolean:boolean;
  private loginBoolean:boolean;
  private tipLayerBoolean:boolean;
  private tipMessage:string;
private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});
  closeBoolean():void{
    this.setTimeBoolean=false;
  }
  recevicetip(msg:boolean):void{
    this.tipLayerBoolean=msg;
  }
  reviceLogin(msg:boolean):void{
    this.loginBoolean=msg;
  } 
  reviceDraftChapter(msg:boolean){
    
    let userId=this.getCookie("userId");
    let body="bookId="+this.bookId+"&userId="+userId;
    console.log(body);
    this.http.post(environment.apiBase+"/pc/api/author/draftbox",body,{headers:this.header})
    //this.http.get("http://localhost:4200/assets/data/draftbox.json")
    .map(res=>res.json())
    .subscribe(data=>{
      //this.drafList=data.data.list;
      if(data.httpCode==100){
        this.loginBoolean=true;
      }else if(data.httpCode==200){
        this.modifyChapter=!msg;
        this.drafList=data.data;
      }else{
        this.tipLayerBoolean=true;
        this.tipMessage=data.msg;
        setTimeout(()=>{
          this.tipLayerBoolean=false;
        },2500)
      }
    })

  }
  editorFunction(draf):void{
    console.log(draf);
    this.chapterParam=draf.chapterId;
    this.btnShowBoolean=true;
    console.log(this.chapterParam);
    if(draf.time){
      this.setTimeBoolean=true;
    }else{
      this.modifyChapter=true;
    }
  }
  //定时失效的提示弹层关闭
  modufyFunction():void{
    this.modifyChapter=!this.modifyChapter;
    this.setTimeBoolean=false;
  }
  constructor(private activatedRoute:ActivatedRoute,private http:Http,
    private cookieService: CookieService) { }

  ngOnInit() {
    //this.sanLogin();
    this.activatedRoute.params.subscribe(params=>{
      this.bookId=params.bookId;
    })
    let userId=this.getCookie("userId");
    let body="bookId="+this.bookId+"&userId="+userId;
    this.http.post(environment.apiBase+"/pc/api/author/draftbox",body,{headers:this.header})
    //this.http.get("http://localhost:4200/assets/data/draftbox.json")
    .map(res=>res.json())
    .subscribe(data=>{
      //this.drafList=data.data.list;
      if(data.httpCode==100){
        this.loginBoolean=true;
      }else if(data.httpCode==200){
        this.drafList=data.data;
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
