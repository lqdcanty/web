import { Component, OnInit,Injectable } from '@angular/core';
import {Location}from '@angular/common';
import { Headers, Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { ActivatedRoute,Params,Router,NavigationEnd,NavigationStart} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-newvolume',
  templateUrl: './newvolume.component.html',
  styleUrls: ['./newvolume.component.css']
})
export class NewvolumeComponent implements OnInit {
private bookId;
private tipLayerBoolean:boolean=false;
private tipMessage:string;
private loginBoolean:boolean=false;
private publishNew:any;
private volumeNumber:string;
private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});
  constructor(private activatedRoute:ActivatedRoute,
   private router:Router,private http:Http,private cookieService: CookieService) { 

  }
	reviceLogin(msg:boolean){
	this.loginBoolean=msg;
	}
	recevicetip(msg:boolean){
	this.tipLayerBoolean=msg;
	}
  ngOnInit() {
    //this.sanLogin();
  	//获取参数
  	this.activatedRoute.params.subscribe(params=>{
  		this.bookId=params.bookId;
      console.log("worksetting",this.bookId);
  	})
  	let userId=this.getCookie("userId");
    let body="userId="+userId+"&bookId="+this.bookId
    this.http.post(environment.apiBase+"/pc/api/author/book/contents",body,{headers:this.header})
    //this.http.get("http://localhost:4200/assets/data/publishChapter.json")
  	.map(res=>res.json())
  	.subscribe(data=>{
      if(data.httpCode==100){
          this.loginBoolean=true;
      }else{
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
              volume.publishList.push(chapter);
              volumeList.push(volume);
            }else if(lastVolume!=null){
              if(lastVolume.volumeName==chapter.volumeName){
                lastVolume.publishList.push(chapter);
               volumeList[volumeList.length-1]=lastVolume;
              }else{
                var volume=Object();
                volume.volumeName=chapter.volumeName;
                volume.publishList=[];
                volume.publishList.push(chapter);
                volumeList.push(volume);
              }
          }
        }
       }
        this.publishNew=volumeList;
        console.log(this.publishNew,"zhanshi ");
        this.volumeNumber = Arabia_To_SimplifiedChinese(this.publishNew.length+1);
      }
  	})

  }
  save():void{
  	if($("#volume").val()){
  		let userId=this.getCookie("userId");
  		let body="userId="+userId+"&bookId="+this.bookId+"&volumeName="+$("#volume").val()+"&volumeId=-1";
  		this.http.post(environment.apiBase+"/pc/api/author/volume/update",body,{headers:this.header})
	    .map(res=>res.json())
	    .subscribe(data=>{
	    	if(data.httpCode==200){
	          this.tipLayerBoolean=true;
	          this.tipMessage="新建分卷成功";
          	  setTimeout(() => {
          	  this.tipLayerBoolean=false;
              //$("#volume").val('');writerzone/worksetting/1093/publishedChapter/1093
	            this.router.navigate(['/writerzone/worksetting/'+this.bookId+'/publishedChapter/'+this.bookId]);
	          }, 1500);
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
  	}else{
      this.tipLayerBoolean=true;
      this.tipMessage="请填写分卷内容！";
    }
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

