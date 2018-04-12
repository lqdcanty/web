import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.css']
})
export class PersonInfoComponent implements OnInit {
private userId:string;
private personInfo: FormGroup;
private userName:string;private userCode:string;private imgUrl:string;private sex:string;
private signature:string;private sexOn:string;
private tipLayerBoolean=false;
private tipMessage:string;
private loginBoolean=false;
private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});
  constructor(private cookieService:CookieService,private http:Http,
  	private fb: FormBuilder) { 
  	this.createForm();
  }
reviceLogin(msg:boolean){
  this.loginBoolean=msg;
}
recevicetip(msg:boolean):void{
  this.tipLayerBoolean=msg;
}
  ngOnInit() {
  	//this.sanLogin();
  	this.userId=this.getCookie("userId");
  	this.getInfo();

  }
  createForm(){
    this.personInfo = this.fb.group({
          userName:[''],
          imgUrl:[''],
          sex:['', [Validators.required]],
          signature:['']
      });
  }

  getCookie(key:string){
    return this.cookieService.get(key);
  }

  /*
  ***Lqd 获取个人信息；2018/3/23 15:15
  ***/

  getInfo():void{
  	let body="userId="+this.userId;
  	this.http.post(environment.apiBase+'/pc/api/userinfo',body,{headers:this.header})
  	.map(res=>res.json()).subscribe(data=>{
  		if(data.httpCode==200){
  			this.userName=data.data.userName;
	  		this.userCode=data.data.userCode;
	  		this.imgUrl=data.data.imgUrl;
	  		this.sex=data.data.sex?data.data.sex:'男';
	  		this.sexOn=data.data.sex=='男'?'1':'2';
	  		this.signature=data.data.signature;
	  		this.tipLayerBoolean=false;
  		}else if(data.httpCode==100){
  			this.loginBoolean=true;
  		}else{
  			this.tipLayerBoolean=true;
  			this.tipMessage=data.msg;
  		}
  	})
  }
  /*
  ***Lqd 选择性别；2018/3/23 
  ***/
  sexFun(item){
  	this.sexOn=item;
  	this.sex=item=='1'?'男':'女';
  	console.log(this.sex)
  }
  /*
  ***Lqd 头像上传；2018/3/23 
  ***/
  uploadFile(event) {
    var xhr,ot,oloaded;
      if(!event.target.files[0]) {
        return;
      }
       if(event.target.files[0].size<1024*1024*1){
          var userId=this.getCookie("userId");
          var fileObj = event.target.files[0]; // js 获取文件对象
          var url =environment.apiBase+"/pc/api/upload/img"; // 接收上传文件的后台地址
          var form = new FormData(); // FormData 对象
          form.append("fileName", fileObj); // 文件对象
           form.append("userId", userId);
          xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
          xhr.open("post", url, false); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
          xhr.onload = uploadComplete; //请求完成
          xhr.onerror =  uploadFailed; //请求失败
          xhr.upload.onloadstart = function(){//上传开始执行方法
              ot = new Date().getTime();   //设置上传开始时间
              oloaded = 0;//设置上传开始时，以上传的文件大小为0
          };
          xhr.send(form);
        }else{
          this.tipLayerBoolean=true;
          this.tipMessage="图片大小在1M内！";
          setTimeout(function(){
            this.tipLayerBoolean=false;
          },2500)
        }
        function uploadComplete(evt) {
          //服务断接收完文件返回的结果
          var data = JSON.parse(evt.target.responseText);
          console.log(data);
          if(data.httpCode==200) {
            this.tipLayerBoolean=true;
            this.tipMessage=data.msg;
            this.bookCover=data.data.imgUrl;
            console.log(this.bookCover);
            $("#imgUrl").attr("src",data.data.imgUrl);
            this.imgUrl=data.data.imgUrl;
            setTimeout(function(){
              this.tipLayerBoolean=false;
            },2500);
          }else if(data.httpCode==100){
            this.loginBoolean=true;
          }else{
            this.tipLayerBoolean=true;
            this.tipMessage=data.msg;
            setTimeout(function(){
              this.tipLayerBoolean=false;
            },2500);
          }
      }
      //上传失败
      function uploadFailed(evt) {
          alert("上传失败！");
      }
      //取消上传
      function cancleUploadFile(){
          xhr.abort();
      }
    }
    /*
  ***Lqd 修改个人信息；2018/3/23 
  ***/
    postSend(){
    	if(this.personInfo.valid){
    		let personInfoValue=this.personInfo.value;
    		let sex=personInfoValue.sex=='男'?'1':'2';
    		let imgUrl=$("#imgUrl").attr("src");
    		let body="userId="+this.userId+"&userName="+personInfoValue.userName+"&imgUrl="+imgUrl+"&sex="+sex+"&signature="+personInfoValue.signature;
    		this.http.post(environment.apiBase+'/pc/api/userinfo/update',body,{headers:this.header})
    		.map(res=>res.json()).subscribe(data=>{
    			if(data.httpCode==200){
    				this.tipLayerBoolean=true;
    				this.tipMessage="修改成功！";
            var expireDate = new Date();  
            expireDate.setDate(expireDate.getDate() + 7); 
            this.cookieService.set( 'imgUrl', imgUrl ,expireDate);
            this.cookieService.set( 'userName', personInfoValue.userName ,expireDate);
    				setTimeout(()=>{
    					//this.getInfo();
              this.tipLayerBoolean=false;
              window.location.reload();
    				},800)
    			}
    		})

    	}
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
