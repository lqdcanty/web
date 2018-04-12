import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/forkJoin';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-author-data',
  templateUrl: './author-data.component.html',
  styleUrls: ['./author-data.component.css']
})
export class AuthorDataComponent implements OnInit {
	private qqLayer:boolean=false;
	private phoneLayer:boolean=false;
	private emailLayer:boolean=false;
	private accountLayer:boolean=false;
	private signLayer:boolean=false;
	private authorMessage:any;
	private authorForm: FormGroup;
	private tipLayerBoolean:boolean;
	private tipMessage:string;
  private loginBoolean:boolean;
  private userId:string;
  private qq:string;private email:string;private bank:string;private bankName:string;
  private bankCard:string;private signature:string; 
  private pendNameN:string;private realNameN:string;private idCardN:string;
  private qqN:string;private emailN:string;private phoneN:string;
  private bankN:string;private bankNameN:string;private bankCardN:string;private signatureN:string;
  private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});

	qqModify():void{
		this.qqLayer=true;
    this.qq=$("#qq").text()=='未填写'?'':$("#qq").text();
	}
	phoneModify():void{
		this.phoneLayer=true;
	}
	emailModify():void{
		this.emailLayer=true;
    this.email=$("#email").text()=='未填写'?'':$("#email").text();
	}
	accountModify():void{
		this.accountLayer=true;
    this.bank=$("#bank").text()=='未填写'?'':$("#bank").text();
    this.bankName=$("#bankName").text()=='未填写'?'':$("#bankName").text();
    this.bankCard=$("#bankCard").text()=='未填写'?'':$("#bankCard").text();
	}
	signModify():void{
		this.signLayer=true;
    this.signature=$("#signature").text()=='未填写'?'':$("#signature").text();
	}
  closeLayerQq():void{
    $("#qq").text(this.qq==''?'未填写':this.qq);
    this.qqN=this.qq=='未填写'?'':this.qq;
    this.qqLayer=false;
    this.phoneLayer=false;
    this.emailLayer=false;
    this.accountLayer=false;
    this.signLayer=false;
    
  }
  closeLayerEmail():void{
    $("#email").text(this.email==''?'未填写':this.email);
    this.emailN=this.email=='未填写'?'':this.email;
    this.qqLayer=false;
    this.phoneLayer=false;
    this.emailLayer=false;
    this.accountLayer=false;
    this.signLayer=false;
    
  }
  closeLayerBank():void{
    $("#bank").text(this.bank==''?'未填写':this.bank);
    $("#bankName").text(this.bankName==''?'未填写':this.bankName);
    $("#bankCard").text(this.bankCard==''?'未填写':this.bankCard);
    this.bankNameN=this.bankName=='未填写'?'':this.bank;
    this.bankCardN=this.bankCard=='未填写'?'':this.bankName;
    this.signatureN=this.signature=='未填写'?'':this.bankCard;
    this.qqLayer=false;
    this.phoneLayer=false;
    this.emailLayer=false;
    this.accountLayer=false;
    this.signLayer=false;
    
  }
  closeLayerSignature():void{
    $("#signature").text(this.signature==''?'未填写':this.signature);
    this.signatureN=this.signature=='未填写'?'':this.signature;
    this.qqLayer=false;
    this.phoneLayer=false;
    this.emailLayer=false;
    this.accountLayer=false;
    this.signLayer=false;
    
  }
	recevicetip(msg:boolean){
		this.tipLayerBoolean=msg;
	}
  /*replyFunction():void{
    
  }*/
  constructor(private http:Http,private fb: FormBuilder,private router:Router,
    private cookieService: CookieService) { 
  	this.createForm();
  }
  ngOnInit() {
    //this.sanLogin();
    this.userId=this.getCookie("userId");
    let body="userId="+this.userId;
    this.http.post(environment.apiBase+"/pc/api/author/info",body,{headers:this.header})
    //this.http.get("http://localhost:4200/assets/data/authorMes.json?userId=-1")
    .map(res=>res.json())
    .subscribe(data=>{
      if(data.httpCode==200){
        this.pendNameN=data.data.penName;
        this.realNameN=data.data.realName;
        this.idCardN=data.data.idCard;
        this.qqN=data.data.qq;
        this.emailN=data.data.email;
        this.phoneN=data.data.phone;
        this.bankN=data.data.bank;
        this.bankNameN=data.data.bankName;
        this.bankCardN=data.data.bankCard;
        this.signatureN=data.data.signature;
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
  createForm() {
        this.authorForm = this.fb.group({
            qq:[''],
            email:['',[email]],
            phone:['', [Validators.required,mobileValidator]],
            authCode:['', [Validators.required]],
            bankName:['', [Validators.required]],
            bank:['', [Validators.required]],
            bankCard:['', [Validators.required,bank]],
            signature:['']
        });
    }

     bankSave(){
     	if(this.authorForm.get('bankName').valid&&this.authorForm.get('bank').valid&&this.authorForm.get('bankCard').valid){
       	//console.log(this.authorForm.value);
         let body="userId="+this.userId+"&bank="+this.authorForm.get('bank').value+"&bankName="+this.authorForm.get('bankName').value+"&bankCard="+this.authorForm.get('bankCard').value;
         this.http.post(environment.apiBase+"/pc/api/author/info/update",body,{headers:this.header})
         .map(res=>res.json())
         .subscribe(data=>{
           if(data.httpCode==200){
              this.tipLayerBoolean=true;
              this.tipMessage=data.msg;
              this.qqLayer=false;
              this.phoneLayer=false;
              this.emailLayer=false;
              this.accountLayer=false;
              this.signLayer=false;
              $("#bank").text(this.authorForm.get('bank').value);
              $("#bankName").text(this.authorForm.get('bankName').value);
              $("#bankCard").text(this.authorForm.get('bankCard').value);
              this.bankN=this.authorForm.get('bank').value;
              this.bankNameN=this.authorForm.get('bankName').value;
              this.bankCardN=this.authorForm.get('bankCard').value;
              setTimeout(function(){
                this.tipLayerBoolean=false;
              },2500);
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
    		this.tipMessage="请正确填写完整输入框内容";
       }
     }
     qqSave(){
     	if(this.authorForm.get('qq').valid){
       	console.log(this.authorForm.value);
         let body="userId="+this.userId+"&qq="+this.authorForm.get('qq').value;
         this.http.post(environment.apiBase+"/pc/api/author/info/update",body,{headers:this.header})
         .map(res=>res.json())
         .subscribe(data=>{
           if(data.httpCode==200){
              this.tipLayerBoolean=true;
              this.tipMessage=data.msg;
              this.qqLayer=false;
              this.phoneLayer=false;
              this.emailLayer=false;
              this.accountLayer=false;
              this.signLayer=false;
              $("#qq").text(this.authorForm.get('qq').value);
              this.qqN=this.authorForm.get('qq').value;
              setTimeout(function(){
                this.tipLayerBoolean=false;
              },2500);
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
     emailSave(){
     	if(this.authorForm.get('email').value){
       	let body="userId="+this.userId+"&email="+this.authorForm.get('email').value;
         this.http.post(environment.apiBase+"/pc/api/author/info/update",body,{headers:this.header})
         .map(res=>res.json())
         .subscribe(data=>{
           if(data.httpCode==200){
              this.tipLayerBoolean=true;
              this.tipMessage=data.msg;
              this.qqLayer=false;
              this.phoneLayer=false;
              this.emailLayer=false;
              this.accountLayer=false;
              this.signLayer=false;
              $("#email").text(this.authorForm.get('email').value);
              this.emailN=this.authorForm.get('email').value;
              setTimeout(function(){
                this.tipLayerBoolean=false;
                this.qqLayer=false;
              },2500);
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
     signSave(){
     	if(this.authorForm.get('signature').valid){
       	console.log(this.authorForm.value);
         let body="userId="+this.userId+"&signature="+this.authorForm.get('signature').value;
         this.http.post(environment.apiBase+"/pc/api/author/info/update",body,{headers:this.header})
         .map(res=>res.json())
         .subscribe(data=>{
           if(data.httpCode==200){
              this.tipLayerBoolean=true;
              this.tipMessage=data.msg;
              this.qqLayer=false;
              this.phoneLayer=false;
              this.emailLayer=false;
              this.accountLayer=false;
              this.signLayer=false;
              $("#signature").text(this.authorForm.get('signature').value);
              this.signatureN=this.authorForm.get('signature').value;
              setTimeout(function(){
                this.tipLayerBoolean=false;
                this.qqLayer=false;
              },2500);
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
  }
  */

}
export function mobileValidator(control: FormControl): any {
    console.dir(control);
    // 获取到输入框的值
    const val = control.value;
    // 手机号码正则
    const mobieReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    const result = mobieReg.test(val);
    return result ? null : { mobile: { info: '手机号码格式不正确' } };
}
export function bank(control: FormControl): any {
    console.dir(control);
    // 获取到输入框的值
    const val = control.value;
    // 手机号码正则
    const mobieReg = /^(\d{16}|\d{19})$/;;
    const result = mobieReg.test(val);
    return result ? null : { mobile: { info: '银行卡格式不对！' } };
}
export function email(control: FormControl): any {
    console.dir(control);
    // 获取到输入框的值
    const val = control.value;
    // 手机号码正则
    const mobieReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
    const result = mobieReg.test(val);
    return result ? null : { mobile: { info: '邮箱格式不对！' } };
}