import { Component, OnInit,Output,EventEmitter} from '@angular/core';
import { Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Headers, Http } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import {Md5} from "ts-md5/dist/md5";
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private tipLayerBoolean:boolean;
  private tipMessage:string;
  private accountLayer:boolean=true;
  private qqLayer:boolean=false;
  private weixinLayer:boolean=false;
  private indexI:number=2;
  private rememberPasswordBoolean:boolean=false;
  private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});
  @Output() outerLoginSuceess =new EventEmitter<boolean>();
	@Output() outerLogin =new EventEmitter<boolean>();
	loginClose(){
		this.outerLogin.emit(false);
	}
  recevicetip(msg:boolean){
    this.tipLayerBoolean=msg;
  }
  constructor(private fb: FormBuilder,private router:Router,
    private http:Http,private cookieService: CookieService) { 
    this.createForm();
  }
  rememberPassword(){
    if(!this.rememberPasswordBoolean){
      this.rememberPasswordBoolean=true;
    }else{
      this.rememberPasswordBoolean=false;
    }
  }

  ngOnInit() {

  }
  weixin():void{
    this.weixinLayer=true;
    this.qqLayer=false;
    this.accountLayer=false;
    this.indexI=0;
    var tempUrl=window.location.href;
    var tempUrlpre=window.location.href.split("/#")[0];
    //var tempUrlnext=window.location.href.split("/#")[1];
    var tempUrlnext='/home'
    window.location.href=environment.apiBase+"/oauth/wechat/login?url="+tempUrlpre+"&uri="+tempUrlnext;
    //http://web.yqread.net/web/oauth/wechat/login?url=http://web.yqread.net&uri=/rank/ranktypeList
  }
  QQ(item):void{
    var tempUrl=window.location.href;
    var tempUrlpre=window.location.href.split("/#")[0];
    //var tempUrlnext=window.location.href.split("/#")[1];
    var tempUrlnext='/home'
    this.weixinLayer=false;
    this.qqLayer=true;
    this.accountLayer=false;
    this.indexI=1;
    window.location.href=environment.apiBase+"/oauth/qq/login?url="+tempUrlpre+"&uri="+tempUrlnext;
  }
  createForm() {
        this.loginForm = this.fb.group({
            phone:['', [Validators.required,mobileValidator]],
            pwd: ['',[Validators.required,passValidator]]
        });
    }

  postDate(){
    if(this.loginForm.get("phone").valid){
      let body='phone='+this.loginForm.get("phone").value;
      this.http.post(environment.apiBase+'/pc/api/phone/validation',body,{headers:this.header})
      .map(res=>res.json())
      .subscribe(data=>{
        if(data.httpCode==400){
          if(this.loginForm.valid){
          let phoneValue=this.loginForm.get('phone').value;
          let pwd=Md5.hashStr(this.loginForm.get('pwd').value).toString();
          let body="phone="+phoneValue+"&pwd="+pwd;
          this.http.post(environment.apiBase+'/pc/api/login',body,{headers: this.header})
          //this.http.get("http://localhost:4200/assets/data/login.json")
          .map(res=>res.json())
          .subscribe(data=>{
            if(data.httpCode==200){
              if(this.rememberPasswordBoolean){
                this.cookieService.set( 'userId', data.data.userId );
                this.cookieService.set( 'userName', data.data.userName);
                this.cookieService.set( 'imgUrl', data.data.imgUrl);
                this.cookieService.set( 'token', data.data.token);
                this.cookieService.set( 'phone', data.data.phone);
                this.cookieService.set( 'userCode', data.data.userCode);
                this.outerLogin.emit(false);
                this.router.navigate(['/home']);
                window.location.reload();
              }else{
                var expireDate = new Date();  
                expireDate.setDate(expireDate.getDate() + 7); 
                this.cookieService.set( 'userId', data.data.userId ,expireDate);
                this.cookieService.set( 'userName', data.data.userName,expireDate);
                this.cookieService.set( 'imgUrl', data.data.imgUrl,expireDate);
                this.cookieService.set( 'token', data.data.token,expireDate);
                this.cookieService.set( 'phone', data.data.phone,expireDate);
                this.cookieService.set( 'userCode', data.data.userCode,expireDate);
                this.outerLogin.emit(false);
                this.router.navigate(['/home']);
                window.location.reload();
              }
              
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
            this.tipMessage="请填写完整内容";
            setTimeout(()=>{
              this.tipLayerBoolean=false;
            },2500)
          }
        }else if(data.httpCode==200){
          this.tipLayerBoolean=true;
          this.tipMessage="该账号没有注册用户";
        }else{
          this.tipLayerBoolean=true;
          this.tipMessage=data.msg;
          setTimeout(function(){
            this.tipLayerBoolean=false;
          },2500);
        }
      })
    }
  }
  phoneBlur():void{
    if(this.loginForm.get("phone").valid){
      let body='phone='+this.loginForm.get("phone").value;
      this.http.post(environment.apiBase+'/pc/api/phone/validation',body,{headers:this.header})
      .map(res=>res.json())
      .subscribe(data=>{
        if(data.httpCode==400){
          
        }else if(data.httpCode==200){
          this.tipLayerBoolean=true;
          this.tipMessage="该账号没有注册用户";
        }else{
          this.tipLayerBoolean=true;
          this.tipMessage=data.msg;
          setTimeout(function(){
            this.tipLayerBoolean=false;
          },2500);
        }
      })
    }
  }

   //获取cookies 
  getCookie(key:string){
    return this.cookieService.get(key);
  }
  //delete cookie
  //Syntax - delete( name: string, path?: string, domain?: string ): void;
  deleteCookie(key: string){
    return this.cookieService.delete(key);
  }



}

// 定义一个密码组的验证方法
export function passValidator(control: FormControl): any {
    // 获取密码输入框的值
    const pwd = control.value;
    //const regExp=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    const regExp=/^[\w]{6,20}$/;
    const result = pwd.length>5&&pwd.length<21;
    return result ? null : { passValidator: { info: '手机号码格式不正确' } };
}
export function mobileValidator(control: FormControl): any {
    //console.dir(control);
    // 获取到输入框的值
    const val = control.value;
    // 手机号码正则
    const mobieReg =/^[1][0-9]{10}$/;
    const result = mobieReg.test(val);
    return result ? null : { mobile: { info: '手机号码格式不正确' } };
}

