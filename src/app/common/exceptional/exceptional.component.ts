import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute,Router } from '@angular/router';
import 'rxjs/Rx';
import 'rxjs/add/observable/forkJoin';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-exceptional',
  templateUrl: './exceptional.component.html',
  styleUrls: ['./exceptional.component.css']
})
export class ExceptionalComponent implements OnInit {
  @Output() outerExcept=new EventEmitter();
  @Input() bookIdChild:number;
  private productId:number;
  private yq:number=0;
  private loginBoolean:boolean=false;
  private tipLayerBoolean=false;
  private tipMessage:string;
  private bookId:number;
  private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});
  sendToParent(){
	 this.outerExcept.emit(false);
  }
  reviceLogin(msg:boolean){
    this.loginBoolean=msg;
  }
  recevicetip(msg:boolean):void{
    this.tipLayerBoolean=msg;
  }
  constructor(private http:Http,private cookieService: CookieService,
    private activatedRoute:ActivatedRoute,private router:Router) {

  }

  ngOnInit() {


  }
  vlaueFunction(id,value){
    this.productId=id;
    this.yq=value;
    $("#dsyq").text(this.yq);
    console.log(id,value);
  }
  exceptionalBtn():void{
    let userId=this.getCookie("userId");
    let body="userId="+userId+"&productId="+this.productId+"&bookId="+this.bookIdChild;
    console.log(body)
    this.http.post(environment.apiBase+"/pc/api/author/tip",body,{headers:this.header})
    .map(res=>res.json())
    .subscribe(data=>{
      if(data.httpCode==200){
        this.tipLayerBoolean=true;
        this.tipMessage="打赏成功！";
        setTimeout(()=>{  
          this.outerExcept.emit(true);
        },1000)
      }else if(data.httpCode==100){
        this.loginBoolean=true;
      }else if(data.httpCode==103){
        this.tipLayerBoolean=true;
        this.tipMessage="余额不足,请充值!";
        this.outerExcept.emit(false);
        setTimeout(()=>{  
          var tempUrl=window.location.href;
          this.router.navigate(['/topUp',tempUrl]);
        },1500)
      }else{
        this.tipLayerBoolean=true;
        this.tipMessage=data.msg;
      }
    })
  	//this.http.get("")
  	//成功之后弹提示；
  	//this.outerExcept.emit(false);
  }
  getCookie(key:string){
    return this.cookieService.get(key);
  }

}
