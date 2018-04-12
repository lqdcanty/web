import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {Md5} from "ts-md5/dist/md5";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-phonebind',
  templateUrl: './phonebind.component.html',
  styleUrls: ['./phonebind.component.css']
})
export class PhonebindComponent implements OnInit {
private bindPhoneForm: FormGroup;
private authCodeText:String='';
private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});
private tipLayerBoolean:boolean;
private tipMessage:string;
recevicetip(msg:boolean):void{
	this.tipLayerBoolean=msg;
}
  constructor(private fb: FormBuilder,private http:Http,
  	private cookieService: CookieService,private router :Router) { 
  	this.createForm();
  }

  ngOnInit() {
    $(window).unbind("scroll");
  	///pc/api/binding/phone
    var flage=true;
    $('#mpanel4').slideVerify({
        type : 2,    //类型
        vOffset : 5,  //误差量，根据需求自行调整
        vSpace : 5,  //间隔
        imgName : ['5.png', '6.png','7.png', '8.png','9.png', '10.png','11.png', '12.png','13.png', '14.png'],
        imgSize : {
          width: '400px',
          height: '200px',
        },
        blockSize : {
          width: '40px',
          height: '40px',
        },
        barSize : {
          width : '400px',
          height : '40px',
        },
        ready : function() {
      },
        success : function() {
           $(".slide").hide();
           $("#slideFun").val("验证成功").siblings("img").hide();
           flage=false;
          //......后续操作
        },
        error : function() {

        }
    });

    $("#slideFun").click(function(){
      if(flage){
        $(".slide").show();
      }
    })

  }
  createForm() {
    this.bindPhoneForm = this.fb.group({
        phone:['', [Validators.required,mobileValidator]],
        authCode:['', [Validators.required]],
        password: this.fb.group({
            newPwd: ['',[Validators.required]],
            confirmPwd: ['',[Validators.required]]
        },{validator: passGroupValidator})
    });
  }
  phoneBlur():void{
  		if(this.bindPhoneForm.get("phone").valid){
  			let body='phone='+this.bindPhoneForm.get("phone").value;
  			this.http.post(environment.apiBase+'/pc/api/phone/validation',body,{headers:this.header})
  			.map(res=>res.json())
  			.subscribe(data=>{
  				if(data.httpCode!=200){
  					this.tipLayerBoolean=true;
          	this.tipMessage=data.msg;
            setTimeout(()=>{
              this.tipLayerBoolean=false;
            },2500);
  				}
  			})
  		}
  	}
  	authCodeClick():void{
      var count=60;
      if(this.bindPhoneForm.get("phone").value){
        if(this.bindPhoneForm.get("phone").valid){
          if($("#slideFun").val()=='验证成功'){
              let body='phone='+this.bindPhoneForm.get("phone").value;
            this.http.post(environment.apiBase+'/pc/api/phone/validation',body,{headers:this.header})
            .map(res=>res.json())
            .subscribe(data=>{
            if(data.httpCode==400){
                this.tipLayerBoolean=true;
                this.tipMessage="手机号没有被注册!";
              }else if(data.httpCode==200){
                this.authCodeText='60s';
                $("#getCode").text(this.authCodeText);
                var interval=setInterval(function(){
                  if(count<=0){
                    clearInterval(interval);
                    this.authCodeText='';
                    $("#getCode").text("获取验证码");
                  }else{
                    count--;
                    this.authCodeText=count+'s';
                    $("#getCode").text(this.authCodeText);
                  }
                },1000);
                let body1='phone='+this.bindPhoneForm.get("phone").value;
                this.http.post(environment.apiBase+'/pc/api/send/authcode',body1,{headers:this.header})
                .map(res=>res.json())
                .subscribe(data1=>{
                  if(data1.httpCode==200){
                    
                  }else{
                    this.tipLayerBoolean=true;
                    this.tipMessage=data1.msg;
                    clearInterval(interval);
                    this.authCodeText='';
                    $("#getCode").text("获取验证码");
                  }
                })
              }
            })
          }else{
             this.tipLayerBoolean=true;
            this.tipMessage="请点击验证！";
             setTimeout(function(){
                this.tipLayerBoolean=false;
              },2500);
          }
        }
      }else{
        this.tipLayerBoolean=true;
         this.tipMessage="请输入手机号！";
         setTimeout(function(){
            this.tipLayerBoolean=false;
          },2500);
        }
    }
  postDate(){
   		let userId=this.getCookie("userId");
   		let result=this.bindPhoneForm.value;
      let newPwd=Md5.hashStr(result.newPwd).toString();
      let confirmPwd=Md5.hashStr(result.confirmPwd).toString();
   		let body="userId="+userId+"&phone="+result.phone+"&newPwd="+newPwd+"&confirmPwd="+confirmPwd;
   		//this.http.post("/pc/api/pwd/update",body,{headers:this.header})
        if(this.bindPhoneForm.valid&&userId){
            this.router.navigate(["/registerOk",result.phone]);
        }else{
          this.tipLayerBoolean=true;
          this.tipMessage="请填写完整内容";
          setTimeout(()=>{
            this.tipLayerBoolean=false;
          },2500);
        }
    }
    getCookie(key:string){
    	return this.cookieService.get(key);
  	} 

}
// 定义一个密码组的验证方法
export function passGroupValidator(controlGroup: FormGroup): any {
    // 获取密码输入框的值
    const newPwd = controlGroup.get('newPwd').value //as FormControl;
    const confirmPwd = controlGroup.get('confirmPwd').value //as FormControl;
    //const regExp=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    const regExp=/^[\w]{6,20}$/;
    const result = regExp.test(newPwd);
    /*return result ? null : { passGroupValidator: { info: '密码是6-21位字母和数字组成' } };*/
    if(!result&&newPwd){
    	//const isEqule: boolean = (pwd === confirmPwd);
    	return result ? null : { passGroupValidator: { info: '密码是6-21位字母和数字组成' } };
    }else if(confirmPwd&&result){
    	const isEqule: boolean = (newPwd === confirmPwd);
    	return isEqule ? null : { passGroupValidator: { info: '两次密码不一致' } };
    }
}
export function mobileValidator(control: FormControl): any {
    //console.dir(control);
    // 获取到输入框的值
    const val = control.value;
    // 手机号码正则
    const mobieReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    const result = mobieReg.test(val);
    return result ? null : { mobile: { info: '手机号码格式不正确' } };
}
