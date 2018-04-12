import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { Headers, Http } from '@angular/http';
import {Md5} from "ts-md5/dist/md5";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
private registerForm: FormGroup;
private tipLayerBoolean:boolean;
private tipMessage:string;
private authCodeText:String='';
private registered:number=0;
private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});
recevicetip(msg:boolean):void{
    this.tipLayerBoolean=msg;
  }
  constructor(private fb: FormBuilder,private router:Router,
  	private http:Http) { 
  	this.createForm();
  }

  ngOnInit() {
    $(window).unbind("scroll");
      /****
    *
    *滑块验证
    ***/
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
        this.registerForm = this.fb.group({
            phone:['', [Validators.required,mobileValidator]],
            authCode:['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
            password: this.fb.group({
	            newPwd: ['',[Validators.required]],
	            confirmPwd: ['',[Validators.required]]
	        },{validator: passGroupValidator})
        });
    }
    phoneBlur():void{

  		if(this.registerForm.get("phone").valid){
  			let body='phone='+this.registerForm.get("phone").value;
  			this.http.post(environment.apiBase+'/pc/api/phone/validation',body,{headers:this.header})
  			.map(res=>res.json())
  			.subscribe(data=>{
  			  if(data.httpCode==400){

	          }else if(data.httpCode==200){
	          	this.tipLayerBoolean=true;
	            this.tipMessage="当前手机号没有注册成为用户！";
              setTimeout(()=>{
                this.tipLayerBoolean=false;
              },2500);
	          }else{
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
      if(this.registerForm.get("phone").value){
        if(this.registerForm.get("phone").valid){
          if($("#slideFun").val()=='验证成功'){
            let body='phone='+this.registerForm.get("phone").value;
            this.http.post(environment.apiBase+'/pc/api/phone/validation',body,{headers:this.header})
            .map(res=>res.json())
            .subscribe(data0=>{
            if(data0.httpCode==200){
                this.tipLayerBoolean=true;
              this.tipMessage="当前手机号没有注册成为用户！";
              }else if(data0.httpCode==400){
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
                let body1='phone='+this.registerForm.get("phone").value;
                this.http.post(environment.apiBase+'/pc/api/send/authcode',body1,{headers:this.header})
                .map(res=>res.json())
                .subscribe(data1=>{
                  if(data1.httpCode==200){
                      
                  }else{
                    this.tipLayerBoolean=true;
                    this.tipMessage=data1.msg;
                    setTimeout(()=>{
                      this.tipLayerBoolean=false;
                    },2500);
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
         setTimeout(()=>{
            this.tipLayerBoolean=false;
          },2500)
      }
    }
    read():void{
  		if($("#read").hasClass("on")){
  			$("#read").removeClass("on");
  			$("#readInput").val(false);
  		}else{
  			$("#read").addClass("on");
  			$("#readInput").val(true);
  		}
  	}
    registerSubmit():void{
    	if(this.registerForm.valid){
			var phone=this.registerForm.get("phone").value;
			var authCode=this.registerForm.get("authCode").value;
			var newPwd=Md5.hashStr(this.registerForm.value.password.newPwd).toString();
			var confirmPwd=Md5.hashStr(this.registerForm.value.password.confirmPwd).toString();
			var  body="phone="+phone+"&authCode="+authCode+"&newPwd="+newPwd+"&confirmPwd="+confirmPwd;
			this.http.post(environment.apiBase+"/pc/api/pwd/forget",body,{headers:this.header})
			.map(res=>res.json())
			.subscribe(data=>{
				if(data.httpCode==200){
					this.router.navigate(["forgetpasswordOk",phone]);
				}else{
					this.tipLayerBoolean=true;
	  				this.tipMessage=data.msg;
            setTimeout(()=>{
              this.tipLayerBoolean=false;
            },2500);
				}
			})
		}
    	
	}
}



// 定义一个密码组的验证方法
export function passGroupValidator(controlGroup: FormGroup): any {
    // 获取密码输入框的值
    const newPwd = controlGroup.get('newPwd').value //as FormControl;
    const confirmPwd = controlGroup.get('confirmPwd').value //as FormControl;
    //const regExp=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/;
    const regExp=/^[\w]{6,20}$/;
    const result = regExp.test(newPwd);
    /*return result ? null : { passGroupValidator: { info: '密码是6-21位字母和数字组成' } };*/
    if(!result&&newPwd){
    	//const isEqule: boolean = (pwd === pwd2);
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
    const mobieReg =/^[1][0-9]{10}$/;
    const result = mobieReg.test(val);
    return result ? null : { mobile: { info: '手机号码格式不正确' } };
}