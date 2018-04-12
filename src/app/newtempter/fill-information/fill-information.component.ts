import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Headers, Http } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
//import { Validator } from './validator/validator';

@Component({
  selector: 'app-fill-information',
  templateUrl: './fill-information.component.html',
  styleUrls: ['./fill-information.component.css']
})
export class FillInformationComponent implements OnInit {
	private fillinformationForm: FormGroup;
  private tipLayerBoolean:boolean=false;
  private tipMessage:string;
  private authCodeText:String='';
  private defaultPhone:string;
  private authCodeShow:boolean=false;
  private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});
  recevicetip(msg:boolean):void{
    this.tipLayerBoolean=msg;
  }
  constructor(private fb: FormBuilder,private router:Router,
    private http:Http,private cookieService: CookieService,
    private activatedRoute:ActivatedRoute) {
	  this.createForm();
	}

  ngOnInit() {
    $(window).unbind("scroll");
    if(this.getCookie("userId")){
        this.defaultPhone=this.getCookie("phone");
        $("#phone").val(this.defaultPhone);
    }

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
  // 创建表单元素
   createForm() {
        this.fillinformationForm = this.fb.group({
            penName:['', [Validators.required, Validators.minLength(1), Validators.maxLength(16)]],
            realName:['', [Validators.required, Validators.minLength(1), Validators.maxLength(16)]],
            idCard:['', [Validators.required,careIdValidator]],
            qq:[''],
            email:[''],
            phone:['', [Validators.required,mobileValidator]],
            authCode:['',[Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
            bookInfo:['',[Validators.required, Validators.minLength(2000)]]
        });
    }
    authCodeClick():void{
      let count=60;
      if($("#getCode").text()=='获取验证码'&&this.fillinformationForm.get("phone").valid){
        if($("#slideFun").val()=='验证成功'){
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
          let body='phone='+this.fillinformationForm.get("phone").value;
          this.http.post(environment.apiBase+'/pc/api/send/authcode',body,{headers:this.header})
          .map(res=>res.json())
          .subscribe(data=>{
            if(data.httpCode!=200){
              this.tipLayerBoolean=true;
              this.tipMessage=data.msg;
              clearInterval(interval);
              this.authCodeText='';
              $("#getCode").text("获取验证码");
              setTimeout(()=>{
                this.tipLayerBoolean=false;
              },2500);
            }else if(data.httpCode==200){
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
    }
     //获取cookies 
  getCookie(key:string){
    return this.cookieService.get(key);
  }

    // 提交表单函数
    postDate(){
        if(this.fillinformationForm.valid){
            var postData=this.fillinformationForm.value;
            var userId= this.getCookie("userId")?this.getCookie("userId"):-1;
            var penName=postData.penName;
            var realName=postData.realName;
            var idCard=postData.idCard;
            var qq=postData.qq;
            var email=postData.email;
            var phone=postData.phone;
            var authCode=postData.authCode;
            var bookInfo=postData.bookInfo;
            var body="userId="+userId+"&penName="+penName+"&realName="+realName+"&idCard="+idCard+"&qq="+qq+"&email="+email+"&phone="+phone+"&authCode="+authCode+"&bookInfo="+bookInfo;
            this.http.post(environment.apiBase+"/pc/api/author/apply",body,{headers:this.header})
            .map(res=>res.json())
            .subscribe(data=>{
              if(data.httpCode==200){
                var expireDate = new Date();  
                expireDate.setDate(expireDate.getDate() + 7); 
                this.cookieService.set('isAuthor',"1",expireDate);
                this.router.navigate(['/fillOk']);
              }else{
                this.tipLayerBoolean=true;
                this.tipMessage=data.msg;
                setTimeout(()=>{
                  this.tipLayerBoolean=false;
                },2500)
              }
            })
            //this.router.navigate(['/fillOk']);
        }else{
          this.tipLayerBoolean=true;
          this.tipMessage="带*的内容未填完整";
          setTimeout(()=>{
            this.tipLayerBoolean=false;
          },2500)
        }
    }

}
export function mobileValidator(control: FormControl): any {
    // 获取到输入框的值
    const val = control.value;
    // 手机号码正则
    const mobieReg = /^[1][0-9]{10}$/;
    const result = mobieReg.test(val);
    return result ? null : { mobile: { info: '手机号码格式不正确' } };
}
export function careIdValidator(control: FormControl): any {
    // 获取密码输入框的值
    var careId = control.value;
    var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
    var tip = "";
    var pass= true;
    if(!careId || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(careId)){
        tip = "身份证号格式错误";
        pass = false;
    }

    else if(!city[careId.substr(0,2)]){
        tip = "地址编码错误";
        pass = false;
    }
    else{
        //18位身份证需要验证最后一位校验位
        if(careId.length == 18){
            careId = careId.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
            //校验位
            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++)
            {
                ai = careId[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if(parity[sum % 11] != careId[17]){
                tip = "校验位错误";
                pass =false;
            }
        }
    }
    return pass ? null : { passValidator: { info:tip } };
}