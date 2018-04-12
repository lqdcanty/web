import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute,Router } from '@angular/router';
import 'rxjs/Rx';
import 'rxjs/add/observable/forkJoin';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-author-comment',
  templateUrl: './author-comment.component.html',
  styleUrls: ['./author-comment.component.css']
})
export class AuthorCommentComponent implements OnInit {
  private commentBoolean:boolean=false;
  private bookId:number;
  private commentId;
  private comments:Array<any>;
  private tipLayerBoolean;
  private tipMessage:string;
  private loginBoolean:boolean;
  private urlParams:string=environment.apiBase+"/pc/api/author/reply";
  public params; // 保存页面url参数
 public totalNum = 0; // 总数据条数
 public pageSize = 6;// 每页数据条数
 public totalPage = 0;// 总页数
 public curPage = 1;// 当前页码
  private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});
  replyFunction(commentId:number):void{
    this.commentBoolean=true;
    //this.commentId=commentId;
    this.commentId={commentId:commentId}
    console.log(this.commentId)
  }
  receive(msg:boolean){
    this.commentBoolean=msg;
  }
  recevicetip(msg:boolean){
    this.tipLayerBoolean=msg;
  }
  reviceLogin(msg:boolean){
    this.loginBoolean=msg;
  }
  /*receivecomment(msg:any){
    console.log(msg,"评论成功")
    if(msg.httpCode==200){
      this.tipLayerBoolean=true;
      this.tipMessage="发表成功";
      setTimeout(function(){
          window.location.reload();
      },1000)
    }else{
      this.tipLayerBoolean=true;
      this.tipMessage=msg.msg;
    }
  }*/
  constructor(private activatedRoute:ActivatedRoute,private http:Http,
    private cookieService:CookieService,private router:Router) { }

  ngOnInit() {
    //this.sanLogin();
    this.activatedRoute.params.subscribe(params=>{
      this.bookId=params.bookId;
    })
    let body="bookId="+this.bookId+"&pageNum="+this.curPage+"&pageSize="+this.pageSize;
    this.http.post(environment.apiBase+"/pc/api/book/comment/list",body,{headers:this.header})
    //this.http.get('http://localhost:4200/assets/data/comment.json?bookId='+this.bookId+'&pageNum=1&pageSize=10')
     .map(res=>res.json())
     .subscribe((data)=>{
       if(data.httpCode==200){
         this.comments=data.data.list;
         console.log(this.comments);
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
  	
  }//结束
  getPageData(pageNo) {
    let vm = this;
    vm.curPage = pageNo;
    //console.log('触发', pageNo);
    var userId=this.getCookie("userId");
    let body="bookId="+this.bookId+"&pageNum="+pageNo+"&pageSize="+this.pageSize;
     this.http.post(environment.apiBase+"/pc/api/book/comment/list",body,{headers:this.header})
      //this.http.get("http://localhost:4200/assets/data/authorWorkList.json")
      .map(res=>res.json())
      .subscribe((data)=>{
        if(data.httpCode==200){
          this.comments=data.data.list;
        }else{
          this.tipLayerBoolean=true;
          this.tipMessage=data.msg;
          setTimeout(()=>{
            this.tipLayerBoolean=false;
          },2500)
        }
      })
   }
  commentZanReader(comment:any):void{
    if(comment.likeFlag){
    }else{
      console.log(comment,"comment");
      let commentId=comment.commentId;
      let userId=this.getCookie("userId");
      let body="userId="+userId+"&commentId="+commentId+"&bookId="+this.bookId;
      this.http.post(environment.apiBase+'/pc/api/like',body,{headers:this.header})
      //this.http.get("http://localhost:4200/assets/data/zan.json")
      .map(res=>res.json())
      .subscribe(data=>{
        //console.log()
        if(data.httpCode==200){
          comment.likeNum++;
          comment.likeFlag=true;
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
    
  }
  commentZanAuthor(author:any):void{
    if(author.likeFlag){

    }else{
      console.log(author,"author");
      let commentId=author.commentId;
      let userId=this.getCookie("userId");
      //this.http.get("http://localhost:4200/assets/data/zan.json")
      let body="userId="+userId+"&commentId="+commentId+"&bookId="+this.bookId;
      this.http.post(environment.apiBase+'/pc/api/like',body,{headers:this.header})
      .map(res=>res.json())
      .subscribe(data=>{
        //console.log()
        if(data.httpCode==200){
          author.likeNum++;
          author.likeFlag=true;
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
