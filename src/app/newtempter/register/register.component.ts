import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { Headers, Http } from '@angular/http';
import {Md5} from "ts-md5/dist/md5";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
private registerForm: FormGroup;
private tipLayerBoolean:boolean;
private tipMessage:string;
private authCodeText:String='';
private registered:number=0;
private slideBoolean:boolean=false;
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
          /*this.tipLayerBoolean=true;
          this.tipMessage="验证失败！";
          setTimeout(()=>{
             this.tipLayerBoolean=false;
          },1000);*/
        }
    });

    $("#slideFun").click(function(){
      if(flage){
        $(".slide").show();
      }
    })
  }
	slideFun(){
    this.slideBoolean=true;
  }
  createForm() {
        this.registerForm = this.fb.group({
            phone:['', [Validators.required,mobileValidator]],
            authCode:['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
            password: this.fb.group({
	            pwd: ['',[Validators.required]],
	            pwd2: ['',[Validators.required]]
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
            this.tipLayerBoolean=true;
            this.tipMessage=data.msg;
          }else if(data.httpCode==200){

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
     authCodeClick():void{
      var count=60;
      if(this.registerForm.get("phone").value){
        if(this.registerForm.get("phone").valid){
          if($("#slideFun").val()=='验证成功'){
            let body='phone='+this.registerForm.get("phone").value;
            this.http.post(environment.apiBase+'/pc/api/phone/validation',body,{headers:this.header})
            .map(res=>res.json())
            .subscribe(data=>{
            if(data.httpCode==400){
                this.tipLayerBoolean=true;
                this.tipMessage=data.msg;
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
                let body1='phone='+this.registerForm.get("phone").value;
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
    		if($("#readInput").val()=='true'){
    			var phone=this.registerForm.get("phone").value;
    			var authCode=this.registerForm.get("authCode").value;
    			var pwd=Md5.hashStr(this.registerForm.value.password.pwd).toString();
    			var pwd2=Md5.hashStr(this.registerForm.value.password.pwd2).toString();
    			var  body="phone="+phone+"&authCode="+authCode+"&pwd="+pwd+"&pwd2="+pwd2+"&channelId=-1";
    			console.log(body,"body")
    			this.http.post(environment.apiBase+"/pc/api/register",body,{headers:this.header})
    			.map(res=>res.json())
    			.subscribe(data=>{
    				if(data.httpCode==200){
    					this.router.navigate(["/registerOk",phone]);
    				}else{
    					this.tipLayerBoolean=true;
          		this.tipMessage=data.msg;
    				}
    			})
    		}else{
    			this.tipLayerBoolean=true;
          		this.tipMessage="请阅读并同意《用户服务协议》";
    		}
    	}else{
    		this.tipLayerBoolean=true;
        this.tipMessage="请按要求正确填写信息";
    	}
	}
}



// 定义一个密码组的验证方法
export function passGroupValidator(controlGroup: FormGroup): any {
    // 获取密码输入框的值
    const pwd = controlGroup.get('pwd').value //as FormControl;
    const pwd2 = controlGroup.get('pwd2').value //as FormControl;
    console.log('你输入的值:', pwd, pwd2);
    //const regExp=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    const regExp=/^[\w]{6,20}$/;
    const result = regExp.test(pwd);
    /*return result ? null : { passGroupValidator: { info: '密码是6-21位字母和数字组成' } };*/
    if(!result&&pwd){
    	//const isEqule: boolean = (pwd === pwd2);
    	return result ? null : { passGroupValidator: { info: '密码是6-20位字母和数字组成' } };
    }else if(pwd2&&result){
    	const isEqule: boolean = (pwd === pwd2);
    	return isEqule ? null : { passGroupValidator: { info: '两次密码不一致' } };
    }
}
export function mobileValidator(control: FormControl): any {
    console.dir(control);
    // 获取到输入框的值
    const val = control.value;
    // 手机号码正则
    const mobieReg =/^[1][0-9]{10}$/;
    const result = mobieReg.test(val);
    return result ? null : { mobile: { info: '手机号码格式不正确' } };
}