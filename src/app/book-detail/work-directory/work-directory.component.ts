import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/Rx';
import 'rxjs/add/observable/forkJoin';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-work-directory',
  templateUrl: './work-directory.component.html',
  styleUrls: ['./work-directory.component.css']
})
export class WorkDirectoryComponent implements OnInit {
	private directoryList:any;
	private bookId:Number;
  private chapterList;
  private tipLayerBoolean:boolean;
  private tipMessage:string;
  private volumeListEs:Array<any>;
  private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});
  constructor(private http:Http,private activatedRoute:ActivatedRoute,
    private cookieService:CookieService) { }
  recevicetip(msg:boolean){
    this.tipLayerBoolean=msg;
  }
  ngOnInit() {
    //this.sanLogin();
  	this.activatedRoute.params.subscribe((Params) => {  
        this.bookId = Params.bookId;  
    });
  	//this.directoryList=this.http.get('http://localhost:4200/assets/data/directory.json?bookId='+this.bookId+'')
    let userId=this.getCookie("userId")?this.getCookie("userId"):-1;
    let body="bookId="+this.bookId+"&userId="+userId;
    this.http.post(environment.apiBase+"/pc/api/book/contents",body,{headers:this.header})
    .map(res=>res.json())
    .subscribe((data)=>{
      if(data.httpCode==200){
        var volumeList=[];
        var chapterList=data.data;
        if(chapterList){
          for(var i=0;i<chapterList.length;i++){
              var lastVolume=volumeList==null?'':volumeList[volumeList.length-1];
              var chapter=chapterList[i];
              if(lastVolume==null){
                var volume=Object();
                volume.volumeName=chapter.volumeName;
                volume.chapterList=[];
                volume.chapterList.push(chapter);
                volumeList.push(volume);
              }else if(lastVolume!=null){
                if(lastVolume.volumeName==chapter.volumeName){
                  lastVolume.chapterList.push(chapter);
                  volumeList[volumeList.length-1]=lastVolume;
                }else{
                  var volume=Object();
                  volume.volumeName=chapter.volumeName;
                  volume.chapterList=[];
                  volume.chapterList.push(chapter);
                  volumeList.push(volume);
                }
            }
          }
        }
        this.volumeListEs=volumeList;
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
      //window.location.reload();
    }
  }*/

}
