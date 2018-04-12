import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { Headers, Http } from '@angular/http';
import { SettimeService } from '../../serve/settime.service'

@Component({
  selector: 'app-authornav',
  templateUrl: './authornav.component.html',
  styleUrls: ['./authornav.component.css']
})
export class AuthornavComponent implements OnInit {
 private loginBoolean:boolean=false;
	private userInfo;
  private loginSuccess=false;
  private tipLayerBoolean=false;
  private tipMessage:String;
  private cancelBoolean:boolean=false;
  private meassageCount:number=0;
  private time;private i:number=0;
  private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});

  recevicetip(msg:boolean):void{
    this.tipLayerBoolean=msg;
  }
  login():void{
    this.loginBoolean=true;
  }
  reviceLogin(msg:boolean){
    this.loginBoolean=msg;
  }
  constructor(private cookieService: CookieService,private http:Http,
    private settimeService:SettimeService) { }

  ngOnInit() {
    if(this.getCookie('token')){
      this.userInfo=this.cookieService.getAll();
      if(!this.userInfo.imgUrl){
        this.userInfo.imgUrl="../../../assets/images/200.png";
      }
      this.loginSuccess=true;
    }
    if(this.getCookie("userId")){
      if(this.i==0){
          this.meassageNumber();
        }
        setInterval(()=>{
          var nowTime=new Date();
          this.time=this.settimeService.getTimeFun();
          if(this.time==nowTime.toLocaleString()){
            this.i++;
            this.meassageNumber();
          }
        },1000)
    }
  }
  backFunction():void{
    this.deleteCookie( 'userId');
    this.deleteCookie( 'userName');
    this.deleteCookie( 'imgUrl');
    this.deleteCookie( 'token');
    this.deleteCookie( 'phone');
    window.location.href=window.location.href.split("#")[0]+'#/home';
  }
  meassageNumber(){
    let userId=this.getCookie("userId");
    let body="userId="+userId;
    this.http.post(environment.apiBase+"/pc/api/my/msg/count",body,{headers:this.header})
    .map(res=>res.json()).subscribe(data=>{
      if(data.httpCode==200){
        this.meassageCount=data.data.msgCount;
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
  imgMouser(){
    this.cancelBoolean=true;
  }
  imgMouserOut(){
    this.cancelBoolean=false;
  }
  getCookie(key:string){
    return this.cookieService.get(key);
  }
  deleteCookie(key: string){
    return this.cookieService.delete(key);
  }
  clickLogin():void {
  	this.loginBoolean=true;
  }

}
