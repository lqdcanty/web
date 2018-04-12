import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {ActivatedRoute,Router} from "@angular/router";
import 'rxjs/Rx';
import 'rxjs/add/observable/forkJoin';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-book-library',
  templateUrl: './book-library.component.html',
  styleUrls: ['./book-library.component.css']
})
export class BookLibraryComponent implements OnInit {
  // private girlClass:BoyAndGirl;
  private boyClass:Array<BoyAndGirl>;
  private girlClass:Array<BoyAndGirl>;
  private classIndex:Number=0;
  private classLabel:number=-1;
  private girlClassNumber:Array<BoyAndGirl>;
  private bookCategory:string="F";
  private bookStatus:Number=-1;
  private bookClass:String="-1";
  private bookMark:String="-1";
  private wordNum:String="-1";
  private sortBy:Number=-1;
  private flage:string="F";
  private tipLayerBoolean:boolean;
  private tipMessage:string;
  private labelList:Array<string>;
  public totalNum = 0; // 总数据条数
 public pageSize = 10;// 每页数据条数
 public totalPage = 0;// 总页数
 public curPage = 1;// 当前页码
 private body:string;
 private currindex:number=0;
 private likeList:Array<any>;
 private loginBoolean:boolean=false;
 private labelMoreFlage:boolean=false;private wordNumOn:string='-1';
 private labelListLength:number;private bookStatusOn:string='-1';private sortByOn:string='-1';
  private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});
  bookLists:Array<any>=[];
  dataContent:Observable<any>;
 /* changeCurPage(msg:number){
    this.curPage=msg;
    console.log(this.curPage,"this.curPage");
  }*/
  mouseenterON(index:number){
    this.currindex=index;
  }
  recevicetip(msg:boolean):void{
    this.tipLayerBoolean=msg;
  }
  reviceLogin(msg:boolean){
    this.loginBoolean=msg;
  }
  labelMore(){
    this.labelMoreFlage=!this.labelMoreFlage;
    //$(".labelHide").attr("style","height:auto;overflow-y:visible")
  }
  constructor(private http:Http,private cookieService:CookieService,
    private activatedRoute:ActivatedRoute) {

  }

  ngOnInit() {
    //this.sanLogin();
    //this.girlClassNumber=this.girlClass;
    $(window).unbind("scroll");
    this.girlClass=[
      new BoyAndGirl("-1","全部"),
      new BoyAndGirl("DSYQ","都市言情"),
      new BoyAndGirl("CYJK","穿越架空"),
      new BoyAndGirl("GDYQ","古代言情"),
      new BoyAndGirl("LMQC","浪漫青春"),
      new BoyAndGirl("XYLYF","悬疑灵异"),
      new BoyAndGirl("QTFLF","其他分类"),
    ];
    this.boyClass=[
      new BoyAndGirl("-1","全部"),
      new BoyAndGirl("DSXS","都市现实"),
      new BoyAndGirl("YSCN","异术超能"),
      new BoyAndGirl("XHXZ","玄幻修真"),
      new BoyAndGirl("LSJK","历史架空"),
      new BoyAndGirl("XYLYM","悬疑灵异"),
      new BoyAndGirl("QTFLM","其他分类"),
    ];
    this.girlClassNumber=this.girlClass;

    let bodyLabel=""
    this.http.post(environment.apiBase+"/pc/api/bookmark/load",bodyLabel,{headers:this.header})
    .map(res=>res.json())
    .subscribe(data=>{
      if(data.httpCode==200){
        this.labelList=data.data.list;
        this.labelListLength=data.data.list.length;
      }else{
        this.tipLayerBoolean=true;
         this.tipMessage=data.msg;
         setTimeout(()=>{
            this.tipLayerBoolean=false;
          },2500)
      }
    })

//榜单
    this.http.post(environment.apiBase+"/pc/api/book/ranking",'',{headers:this.header})
    .map(res=>res.json())
    .subscribe(data=>{
      if(data.httpCode==200){
        this.likeList=data.data;
      }else{
        this.tipLayerBoolean=true;
        this.tipMessage=data.msg;
        setTimeout(()=>{
          this.tipLayerBoolean=false;
        },2500)
      }
    })

    //this.http.get('http://localhost:4200/assets/data/bookList.json')
    this.activatedRoute.queryParams.subscribe(queryParams => {  
        this.bookCategory = queryParams.bookCategory?queryParams.bookCategory:'F';  
        this.bookClass = queryParams.bookClass?queryParams.bookClass:'-1'; 
        this.flage=queryParams.bookCategory?queryParams.bookCategory:'F';
        this.curPage=1;
        if(this.bookCategory=='F'){
           this.girlClassNumber=this.girlClass;
          var arr=['-1','DSYQ','CYJK','GDYQ','LMQC','XYLYF','QTFLF'];
          for(var i=0;i<arr.length;i++){
            if(arr[i]==this.bookClass){
              this.classIndex=i;
            }
          }
        }else{
          this.girlClassNumber=this.boyClass;
          var arr=['-1','DSXS','YSCN','XHXZ','LSJK','XYLYM','QTFLM'];
          for(var i=0;i<arr.length;i++){
            if(arr[i]==this.bookClass){
              this.classIndex=i;
            }
          }
        }
        this.body="bookCategory="+this.bookCategory+"&bookStatus=-1&bookClass="+this.bookClass+"&bookMark=-1&wordNum=-1&sortBy=-1&pageNum="+this.curPage+"&pageSize="+this.pageSize;
        this.http.post(environment.apiBase+"/pc/api/book/list",this.body,{headers:this.header})
        .map(res=>res.json()) 
        .subscribe((data)=>{
          if(data.httpCode==200){
            this.bookLists=data.data.list;
            this.totalPage=Math.ceil(data.data.total/data.data.pageSize);
            this.totalNum=data.data.total;
          }else{
            this.tipLayerBoolean=true;
            this.tipMessage=data.msg;
            setTimeout(()=>{
              this.tipLayerBoolean=false;
            },2500)
          }
        })
    })
    

  }
  classClick(clitem:BoyAndGirl,i:Number){//注意这个函数放的位置；
      this.classIndex=i;
      this.bookClass=clitem.bookClass;
      this.curPage=1;
      this.commonFunction();
  }
  labelClick(label:any,i:number){
    this.classLabel=i;
    this.bookMark=label;
    this.curPage=1;
    this.commonFunction();
  }
  bookStatusClick(dataType:any,i){
    this.bookStatus=dataType.toElement.dataset.type;
    this.curPage=1;
    this.bookStatusOn=i;
    this.commonFunction();
  }
  wordNumClick(dataType:any,i){
    this.wordNum=dataType.toElement.dataset.type;
    this.curPage=1;
    this.wordNumOn=i;
    this.commonFunction();
  }
  sortByClick(dataType:any,i){
    this.sortBy=dataType.toElement.dataset.type;
    this.curPage=1;
    this.sortByOn=i;
    this.commonFunction();
  }
  girlboyFunvtion(dataType:any){
    this.bookCategory=dataType.toElement.dataset.type;
    if(this.bookCategory=='F'){
      this.flage="F";
      this.girlClassNumber=this.girlClass;
      this.classIndex=0;
      this.bookClass='-1';
      this.curPage=1;
      this.commonFunction();
    }else if(this.bookCategory=='M'){
      this.flage="M";
      this.classIndex=0;
      this.bookClass='-1';
      this.girlClassNumber=this.boyClass;
      this.curPage=1;
      this.commonFunction();
    }
  }
  commonFunction(){
    this.body="bookCategory="+this.bookCategory+"&bookStatus="+this.bookStatus+"&bookClass="+this.bookClass+"&bookMark="+this.bookMark+"&wordNum="+this.wordNum+"&sortBy="+this.sortBy+"&pageNum="+this.curPage+"&pageSize="+this.pageSize;
     this.http.post(environment.apiBase+"/pc/api/book/list",this.body,{headers:this.header})
     .map(res=>res.json())
     .subscribe(data=>{
       if(data.httpCode==200){
         this.bookLists=data.data.list;
          this.totalPage=Math.ceil(data.data.total/data.data.pageSize);
          this.totalNum=data.data.total;
       }else{
         this.tipLayerBoolean=true;
         this.tipMessage=data.msg;
         setTimeout(()=>{
            this.tipLayerBoolean=false;
          },2500)
       }
     })
  }
  getPageData(pageNo) {
  //let vm = this;
  this.curPage = pageNo;
  console.log('触发', pageNo);
  var userId=this.getCookie("userId");
  this.commonFunction();
  //var body="userId="+userId+"&pageNum="+vm.curPage+"&pageSize="+this.pageSize;
   /*this.http.post(environment.apiBase+"/pc/api/author/book/list",body,{headers:this.header})
    //this.http.get("http://localhost:4200/assets/data/authorWorkList.json")
    .map(res=>res.json())
    .subscribe((data)=>{
      if(data.httpCode==200){
        this.bookLists=data.data.list;
      }else{
        this.tipLayerBoolean=true;
        this.tipMessage=data.msg;
      }
    })*/
 }
  getCookie(key:string){
    return this.cookieService.get(key);
  }
/*  sanLogin(){
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

export class BoyAndGirl {
    //构建函数可以申明nav所拥有的属性
    
    constructor(
      public bookClass:String,
      public bookClassName:String
    ) {}

   
}
