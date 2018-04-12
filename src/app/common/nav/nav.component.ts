import { Component, OnInit,Input } from '@angular/core';
import { Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Headers, Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SettimeService } from '../../serve/settime.service'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
//export 是declarations 的子集，可用于其它模块的组件模板
export class NavComponent implements OnInit {
  authorzoneLayerBoolean:boolean=false;
  loginBoolean:boolean=false;
  private meassageCount:number=0;
  @Input() paramskeyword;
  private userInfo;
  private loginSuccess=false;
  private tipLayerBoolean=false;
  private tipMessage:String;
  private contentAuthorT:String;
  private cancelBoolean:boolean=false;
  private search: FormGroup;
  private btnString:string;
  private tempUrlString:String;
  private time;
  private i:number=0;
  private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});

  recevicetip(msg:boolean):void{
    this.tipLayerBoolean=msg;
  }
  login():void{
    this.loginBoolean=true;
  }
  reviceLogin(msg:boolean){
    this.loginBoolean=msg;
  }
  reviceunauthor(msg:boolean){
    this.authorzoneLayerBoolean=msg;
  }

  constructor( private router: Router,private http:Http,private fb: FormBuilder,
    private cookieService: CookieService,private settimeService:SettimeService){
    this.createForm();
    
  }

  ngOnInit() {
    this.btnString="去申请"
    this.tempUrlString="/acceptAgreement";
    if(!this.paramskeyword){
      this.paramskeyword="非常神话";
    }
    if(this.getCookie("userId")){
        if(this.i==0){
          this.meassageNumber();
        }
        setInterval(()=>{
          var nowTime=new Date();
          this.time=this.settimeService.getTimeFun();
          if(this.time==nowTime.toLocaleString()){
            this.i++;
            this.meassageNumber();
          }
        },1000)
    }
    if(this.getCookie('token')){
      this.userInfo=this.cookieService.getAll();
      if(this.userInfo.imgUrl==null){
        this.userInfo.imgUrl="../../../assets/images/200.png";
      }
      this.loginSuccess=true; 
    }
    //控制男频女频的显示隐藏；
    $(".navHomeLayerBox").hover(function(){
       $(this).show();
    },function(){
      $(this).hide();
    })
    $("#homeEnter").hover(function(){
       $(".navHomeLayerBox").show();
    },function(){
      $(".navHomeLayerBox").hide();
    })

  }


  createForm(){
    this.search = this.fb.group({
        keyword:['']
    });
  }
  postCreat(){
    if(this.search.valid&&this.search.get('keyword').value){
      console.log(this.search.get('keyword').value,"form")
      this.router.navigate(["/search",this.search.get('keyword').value]);
    }
  }

  //delete cookie
  //Syntax - delete( name: string, path?: string, domain?: string ): void;
  clickLogin():void {
  	this.loginBoolean=true;
  }
  authorzoneJudge():void{
    let userId=this.getCookie("userId");
    if(userId){
      let body="userId="+userId;
      this.http.post(environment.apiBase+"/pc/api/author/status",body,{headers:this.header})
      .map(res=>res.json())
      .subscribe(data=>{
        if(data.httpCode==200){
          this.router.navigate(['/writerzone']);
        }else if(data.httpCode==100){
          this.loginBoolean=true;
        }else if(data.httpCode==102){
          this.authorzoneLayerBoolean=true;
          this.contentAuthorT="亲,你还没有申请成为作家哦！";
        }else if(data.httpCode==101){
          this.authorzoneLayerBoolean=true;
          this.contentAuthorT="亲,你的申请未通过,可以重新申请！";
        }else{
          this.tipLayerBoolean=true;
          this.tipMessage=data.msg;
          setTimeout(()=>{
            this.tipLayerBoolean=false;
          },2500)
        }
      })
    }else{
      this.loginBoolean=true;
    }

  }
  backFunction():void{
    this.deleteCookie( 'userId');
    this.deleteCookie( 'userName');
    this.deleteCookie( 'imgUrl');
    this.deleteCookie( 'token');
    this.deleteCookie( 'phone');
    this.deleteCookie( 'userCode');
    //window.location.reload();
    if(window.location.href.split("#/")[1]=='home'||window.location.href.split("#/")[1]==''){
      window.location.reload();
    }else{
      window.location.href=window.location.href.split("#")[0]+'#/home';
    }
  }
  meassageNumber(){
    let userId=this.getCookie("userId");
    let body="userId="+userId;
    this.http.post(environment.apiBase+"/pc/api/my/msg/count",body,{headers:this.header})
    .map(res=>res.json()).subscribe(data=>{
      if(data.httpCode==200){
        this.meassageCount=data.data.msgCount;
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
  imgMouser(){
    this.cancelBoolean=true;
  }
  imgMouserOut(){
    this.cancelBoolean=false;
  }
  deleteCookie(key: string){
    return this.cookieService.delete(key);
  }
  getCookie(key:string){
    return this.cookieService.get(key);
  }
}
