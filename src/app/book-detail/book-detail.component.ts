import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params,Router,NavigationEnd,NavigationStart} from '@angular/router';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/forkJoin';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
	private bookId:number;
  private bookDetailContent:any;
  private likeList:Array<any>;
  public currindex=0;
  private loginBoolean:boolean=false;
  public oneWorkInteraction:boolean=true;
  private tipLayerBoolean:boolean=false;
  private tipMessage: string;
  private bookIdNumber:string='';
  private bookMark:Array<string>;
  private authorCodeString:string='';
  private bookCover:string;private bookName:string;private author:string;private wordNum:number;
  private concernNum:number;private introduction:string;private concernFlag:string;private chapterName:string;
  private updateTime:string;private readFlag:string;private bookCategory:string;private bookClass:string;
  private chapterContent:Array<string>;
  private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});
  public mouseenterON(index:number){
      this.currindex=index;
  }
  recevicetip(msg:boolean):void{
    this.tipLayerBoolean=msg;
  }
  reviceLogin(msg:boolean){
    this.loginBoolean=msg;
  }
  constructor(private activatedRoute:ActivatedRoute,private http:Http,private router:Router,
    private cookieService: CookieService) {

  }

  ngOnInit() {//queryParams
    //this.sanLogin();
    $(window).scrollTop(0);
    $(window).unbind("scroll");
    //配合实现修改的显示跟隐藏；
    let arr1=location.href;
    let arr=arr1.split("#")[1].split("/");
    for(var i=0;i<arr.length;i++){
      if((arr[i]!=='workDirectory'||arr[i]!=='workInteraction')&&arr.length<4){
        this.oneWorkInteraction=true;
        $("#workDetailNav a").eq(0).addClass("on");
      }else if(arr.length>4){
        this.oneWorkInteraction=false;
      }
    } 
    this.router.events
    .filter((event) => event instanceof NavigationEnd)
    .subscribe((event:NavigationEnd) => {
      this.oneWorkInteraction=false;
      $("#workDetailNav a").eq(0).removeClass("on");
    });

    this.activatedRoute.params.subscribe((Params) => {  
        this.bookId = Params.bookId;  
        this.bookIdNumber=String(Params.bookId);
        let userId=this.getCookie("userId")?this.getCookie("userId"):-1;
    let body="bookId="+this.bookId+"&userId="+userId;
    this.http.post(environment.apiBase+'/pc/api/book/detail',body,{headers:this.header})
    //this.http.get("http://localhost:4200/assets/data/bookdetail.json")
    .map(res=>res.json())
    .subscribe(data=>{
        if(data.httpCode==200){
           $(window).scrollTop(0);
          this.bookDetailContent=data.data;
          this.authorCodeString=data.data.authorCode;
          this.chapterContent=data.data.chapter.chapterContent;
          this.bookCover=data.data.bookCover;
          this.author=data.data.author;
          this.bookName=data.data.bookName;
          this.wordNum=data.data.wordNum;
          this.concernNum=data.data.concernNum;
          this.introduction=data.data.introduction;
          this.concernFlag=data.data.concernFlag;
          this.chapterName=data.data.chapter.chapterName;
          this.updateTime=data.data.chapter.updateTime;
          this.readFlag=data.data.readFlag;
          this.bookCategory=data.data.bookCategory;
          this.bookClass=data.data.bookClass;
          this.bookMark=data.data.bookMark.split(",");

          //相似作品
          let body1="bookMark="+data.data.bookMark+"&bookId="+this.bookId;
          //let body1="bookMark=不限";
          this.http.post(environment.apiBase+'/pc/api/similar/list',body1,{headers:this.header})
          //this.http.get("http://localhost:4200/assets/data/likeList.json")
          .map(res=>res.json())
          .subscribe(
            (data)=>{
                if(data.httpCode==200){
                  this.likeList=data.data.bookList;
                }else{
                  this.tipLayerBoolean=true;
                  this.tipMessage=data.msg;
                }
            });
        }else{
          this.tipLayerBoolean=true;
          this.tipMessage=data.msg;
          setTimeout(()=>{
            this.tipLayerBoolean=false;
          },2500)
        }
      });
    })
   
  }
  detailRouter(bookId:number){
    //$(window).scrollTop(0);
    this.router.navigate(['bookDetail/'+bookId+'/workInteraction/'+bookId])
    //$(window).scrollTop(0);
  }
  getCookie(key:string){
    return this.cookieService.get(key);
  }
  collectFunction(concernFlag:string):void{
    if(concernFlag!="1"){
      let userId=this.getCookie("userId");
      let body="userId="+userId+"&bookId="+this.bookId;
      this.http.post(environment.apiBase+"/pc/api/bookshelf/add",body,{headers:this.header})
      .map(res=>res.json())
      .subscribe(data=>{
        if(data.httpCode==100){
          this.loginBoolean=true;
        }else if(data.httpCode==200){
          this.concernFlag="1";
          this.tipLayerBoolean=true;
          this.tipMessage="收藏成功！";
          setTimeout(()=>{
            this.tipLayerBoolean=false;
          },2500)
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
    }
  }*/

}


