import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {Md5} from "ts-md5/dist/md5";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-rechange-password',
  templateUrl: './rechange-password.component.html',
  styleUrls: ['./rechange-password.component.css']
})
export class RechangePasswordComponent implements OnInit {
private changepwdForm: FormGroup;
private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});
private tipLayerBoolean:boolean;
private tipMessage:string;
private loginBoolean=false;
recevicetip(msg:boolean):void{
	this.tipLayerBoolean=msg;
}
reviceLogin(msg:boolean){
  this.loginBoolean=msg;
}
  constructor(private fb: FormBuilder,private http:Http,
  	private cookieService: CookieService,private router:Router) { 
  	this.createForm();
  }

  ngOnInit() {
    //this.sanLogin();
  }
  createForm() {
    this.changepwdForm = this.fb.group({
        pwd:['', [Validators.required,oldPass]],
        password: this.fb.group({
            newPwd: ['',[Validators.required]],
            confirmPwd: ['',[Validators.required]]
        },{validator: passGroupValidator})
    });
  }
   postDate(){
   		let userId=this.getCookie("userId");
   		let result=this.changepwdForm.value;
      let  pwd=Md5.hashStr(result.pwd).toString();
      let newPwd=Md5.hashStr(result.password.newPwd).toString();
      let confirmPwd=Md5.hashStr(result.password.confirmPwd).toString();
   		let body="userId="+userId+"&pwd="+pwd+"&newPwd="+newPwd+"&confirmPwd="+confirmPwd;
   		//
        if(this.changepwdForm.valid&&userId){
            console.log(this.changepwdForm.value);
            this.http.post(environment.apiBase+"/pc/api/pwd/update",body,{headers:this.header})
            .map(res=>res.json())
            .subscribe(data=>{
              if(data.httpCode==200){
                //user/security
                this.tipLayerBoolean=true;
                this.tipMessage="密码修改成功！"
                setTimeout(()=>{
                  this.router.navigate(['user/security']);
                },1000)
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
          this.tipMessage="请填写完整内容";
          setTimeout(()=>{
            this.tipLayerBoolean=false;
          },2500)
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

// 定义一个密码组的验证方法
export function passGroupValidator(controlGroup: FormGroup): any {
    // 获取密码输入框的值
    const newPwd = controlGroup.get('newPwd').value //as FormControl;
    const confirmPwd = controlGroup.get('confirmPwd').value //as FormControl;
    console.log('你输入的值:', newPwd, confirmPwd);
    const regExp=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/;
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
export function oldPass(control: FormControl): any {
    console.dir(control);
    // 获取到输入框的值
    const val = control.value;
    // 手机号码正则
    const regExp=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/;
    const result = regExp.test(val);
    return result ? null : { mobile: { info: '密码是6-21位字母和数字组成' } };
}
