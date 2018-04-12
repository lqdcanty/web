import { Component, OnInit,Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/forkJoin';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-published-chapter',
  templateUrl: './published-chapter.component.html',
  styleUrls: ['./published-chapter.component.css']
})
export class PublishedChapterComponent implements OnInit {
	private modifyChapter:boolean=false;
	private bookId:number;
	//private publishList:Array<any>;
	private publishNew:Array<any>;
  private chapterParam:number;
  private btnShowBoolean:boolean;
  private loginBoolean:boolean=false;
  private tipLayerBoolean=false;
  private tipMessage:string;
  private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});
	modufyFunction():void{
	    this.modifyChapter=!this.modifyChapter;
	}
	editorFunction(item:any):void{
    if(item.applyVip=='-1'&&item.readPermission=='vip'&&item.chapterStatus !='4'){
      this.tipLayerBoolean=true;
      this.tipMessage="本章节是VIP章节，请联系责编";
      setTimeout(() => {
        this.tipLayerBoolean=false;
      }, 2500);
    }else{
      this.chapterParam=item.chapterId;
      this.btnShowBoolean=false;
      this.modifyChapter=true;
    }
	}
   reviceLogin(msg:boolean){
    this.loginBoolean=msg;
  }
  recevicetip(msg:boolean):void{
    this.tipLayerBoolean=msg;
  }
  reviceChapter(msg:boolean){
    if(msg){
      this.modifyChapter=false;
    }
  }
  applyVipFunction(item:any):void{
    if(item.applyVip=='1'){
      let userId=this.getCookie("userId");
      let body="userId="+userId+"&bookId="+this.bookId+"&chapterId="+item.chapterId;
      this.http.post(environment.apiBase+"/pc/api/chapter/vip/apply",body,{headers:this.header})
      .map(res=>res.json())
      .subscribe(data=>{
        if(data.httpCode==200){
          //item.applyVip='3';
          this.tipLayerBoolean=true;
          this.tipMessage="提交审核成功，审核通过后发布的章节自动开VIP！";
          setTimeout(() => {
            //this.tipLayerBoolean=false;
            this.published();
          }, 1000);
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
  }
  constructor(private http:Http,private activatedRoute:ActivatedRoute,
    private cookieService: CookieService) { }

  ngOnInit() {
    //this.sanLogin();
  	this.activatedRoute.params.subscribe(params=>{
  		this.bookId=params.bookId;
  	});
    this.published();
    
  }
  published(){
    let userId=this.getCookie("userId");
    let body="bookId="+this.bookId+"&userId="+userId;
    this.http.post(environment.apiBase+"/pc/api/author/book/contents",body,{headers:this.header})
    //this.http.get("http://localhost:4200/assets/data/publishChapter.json")
    .map(res=>res.json())
    .subscribe(data=>{
      if(data.httpCode==100){
          this.loginBoolean=true;
      }else if(data.httpCode==200){
        let publishList=data.data;
        console.log(publishList);
        var volumeList=[];
        if(publishList){
          for(var i=0;i<publishList.length;i++){
            var lastVolume=volumeList==null?'':volumeList[volumeList.length-1];
            var chapter=publishList[i];
            if(lastVolume==null){
              var volume=Object();
              volume.volumeName=chapter.volumeName;
              volume.publishList=[];
              chapter.chapterName?volume.publishList.push(chapter):'';
              //volume.publishList.push(chapter);
              volumeList.push(volume);
            }else if(lastVolume!=null){
              if(lastVolume.volumeName==chapter.volumeName){
                lastVolume.publishList.push(chapter);
                volumeList[volumeList.length-1]=lastVolume;
              }else{
                var volume=Object();
                volume.volumeName=chapter.volumeName;
                volume.publishList=[];
                chapter.chapterName?volume.publishList.push(chapter):'';
                //volume.publishList.push(chapter);
                volumeList.push(volume);
              }
          }
        }
       }
        this.publishNew=volumeList;
        console.log(this.publishNew);
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

}
