import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
private balance1:number=0;
private balance2:number=0;
private tipLayerBoolean=false;
private loginBoolean=false;
private tipMessage:string;
 private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});
recevicetip(msg:boolean):void{
  this.tipLayerBoolean=msg;
}
reviceLogin(msg:boolean){
  this.loginBoolean=msg;
}
  constructor(private cookieService: CookieService,private http:Http,
    private router:Router) { }

  ngOnInit() {
    //this.sanLogin();
    $(window).unbind("scroll");
  	let userId=this.getCookie("userId");
    let body="userId="+userId;
    this.http.post(environment.apiBase+"/pc/api/my/yuanqi",body,{headers:this.header})
    //this.http.get("http://localhost:4200/assets/data/myoq.json")
    .map(res=>res.json())
    .subscribe(data=>{
      if(data.httpCode==200){
        console.log(data.data);
        this.balance1=parseInt(data.data.balance1);
        this.balance2=parseInt(data.data.balance2);
        console.log(this.balance1,this.balance2);
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
  rechange(){
    this.router.navigate(['/topUp',window.location.href])
  }

}
