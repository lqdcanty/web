import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Headers, Http} from '@angular/http';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-top-up',
  templateUrl: './top-up.component.html',
  styleUrls: ['./top-up.component.css']
})
export class TopUpComponent implements OnInit {

  private totalBalance: number;
  private productId:number;
  private payUrl: String;
  private money: String='20';
  private returnUrl: String;
  private userId: String;
  private indexCur:String='20';
  private loginBoolean:boolean=false;
  private tipLayerBoolean:boolean=false;
  private tipMessage:String;
  private giftFlag:String='1';
  private accoutType:number=0;
  private weixinerweimaUrl:string;private setTime:any;
  private zhifuTips:boolean=false;
  private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});

  /**
   * 接受信息弹层传递的数据；关闭弹层
   * @LQD 
   */
  recevicetip(msg:boolean):void{
    this.tipLayerBoolean=msg;
  }
  /**
   * 接受登录传递的数据；关闭弹层
   * @LQD 
   */
  reviceLogin(msg:boolean){
    this.loginBoolean=msg;
  }
  accoutTypeFun(num:number){
    this.accoutType=num;
    console.log(num)
  }
  constructor(private cookieService: CookieService, private http: Http, private activatedRoute: ActivatedRoute) {
  }
  /**
   * 初始化数据
   * @author shang
   */
  ngOnInit() {
    //this.sanLogin();
    // 获取用户accountCount
    this.userId = this.getCookie("userId");
    this.productId=11;
    this.getUserAccount();
    this.activatedRoute.params.subscribe((Params) => { 
      if(!Params.url){
        this.returnUrl=window.location.href;
        console.log(this.returnUrl,"returnUrl本页面");
      }else{
        this.returnUrl = Params.url; 
        console.log(this.returnUrl,"returnUrl跳页面");
      }
      
    })
    $(window).on('onpagehide', function(event) {
      alert("离开了")
    });
    
  }

  /**
   * 选择充值金额
   * @author shang
   */
  selectMoney(productId, $event, money,giftFlag): void {
    this.money = money;
    this.indexCur=money;
    this.productId = parseInt(productId);  // 商品code;
    if(this.accoutType==0){//支付宝支付
      this.giftFlag=giftFlag
      var params = 'productId=' + this.productId + '&userId=' + this.userId +'&giftFlag=' + giftFlag + '&returnUrl=' + this.returnUrl; // 拼接参数
      window.location.href = environment.apiBase + '/api/web/alipay/recharge?' + params;
    }else if(this.accoutType==1){//微信支付
      console.log(this.accoutType,'this.accoutType');
        this.wechatPay(this.productId);
    }else if(this.accoutType==2){//银联支付

    }
  }

  /**
   *点击支付
   * LQD 
   */
   pay(){
      if(this.accoutType==0){
      //支付宝支付
        var params = 'productId=' + this.productId + '&userId=' + this.userId +'&giftFlag=' + this.giftFlag + '&returnUrl=' + this.returnUrl; // 拼接参数
        window.location.href = environment.apiBase + '/api/web/alipay/recharge?' + params;
      }else if(this.accoutType==1){
      //微信支付
        this.wechatPay(this.productId);

      }else if(this.accoutType==2){
      //银联支付
        
      }
   }

  getCookie(key: string) {
    return this.cookieService.get(key);
  }
  //微信支付函数
  wechatPay(pId) {
    var isH5 = 'no'; // 写死
    var payFlag = 'native'; //写死
    // 拼接参数 ，获取微信支付二维码
    var body = 'productId=' + pId + '&isH5=' + isH5 + '&userId=' + this.userId + '&payFlag=' + payFlag + '&returnUrl=' + this.returnUrl;
    this.http.post(environment.apiBase + '/api/yuanqi/recharge', body, {headers: this.header})
      .map(res => res.json()).subscribe(data => {
      if (data.httpCode == 200) {
          this.weixinerweimaUrl=data.data.picPath;
          this.accoutType=-1;
          var outTradeNo=data.data.out_trade_no;
          var url=data.data.return_url;
          var weixinFlage=true;
          console.log(url,"返回地址")

          this.setTime=setInterval(()=>{
            this.weixinSuccess(outTradeNo,url);
          }, 3000); 
          setTimeout(()=>{
            this.zhifuTips=true;
            clearInterval(this.setTime);
          },9000);
      } else {
        this.tipLayerBoolean = true;
        this.tipMessage = data.msg;
        setTimeout(() => {
          this.tipLayerBoolean = false;
        }, 2500);
      }
    });
  }


  zhifuReload(){
    this.zhifuTips=false;
    this.wechatPay(this.productId)
  }
    /**
   *检测微信支付是否成功函数
   * LQD 
   */
  weixinSuccess(code:string,url:string):void{
    let body="outTradNo="+code;
    this.http.post(environment.apiBase + '/pc/api/pay/result',body,{headers:this.header})
    .map(res=>res.json()).subscribe(data=>{
      if(data.httpCode==200){
          if(data.data=='1'){
            this.tipLayerBoolean = true;
            this.tipMessage = data.msg;
            setTimeout(() => {
              //this.tipLayerBoolean = false;
               window.location.href=url;
                console.log(url,"返回地址")
            }, 1000);
            clearInterval(this.setTime);
          }else if(data.data=='-1'){
            this.tipLayerBoolean = true;
            this.tipMessage = "支付失败！";
            setTimeout(() => {
              //this.tipLayerBoolean = false;
               window.location.href=url;
            }, 2500);
          }else if(data.data=='0'){
            
          }
      }else{
        this.tipLayerBoolean = true;
        this.tipMessage = data.msg;
        setTimeout(() => {
          this.tipLayerBoolean = false;
        }, 2500);
      }
    })
  }
  /**
   * 获取 用户余额
   * @author shang
   */
  getUserAccount() {
    let body = 'userId=' + this.userId;
    this.http.post(environment.apiBase + '/pc/api/my/yuanqi', body, {headers: this.header})
      .map(res => res.json()).subscribe(data => {
      if (data.httpCode == 200) {
        var balance1 = data.data.balance1;
        var balance2 = data.data.balance2;
        this.totalBalance = parseInt(balance1) + parseInt(balance2);
      }else if(data.httpCode==100){
        this.loginBoolean=true;
      }else{
        this.tipLayerBoolean=true;
        this.tipMessage=data.msg;
        setTimeout(()=>{
          this.tipLayerBoolean=false;
        },2500)
      }
    });
  }

  ngOnDestroy(){
    clearInterval(this.setTime);
  }
}
