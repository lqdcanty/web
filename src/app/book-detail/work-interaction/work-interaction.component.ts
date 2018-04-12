import { Component, OnInit,Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute,Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import 'rxjs/Rx';
import 'rxjs/add/observable/forkJoin';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-work-interaction',
  templateUrl: './work-interaction.component.html',
  styleUrls: ['./work-interaction.component.css']
})
export class WorkInteractionComponent implements OnInit {
	commentBoolean:boolean=false;
	exceptionalBoolean:boolean=false;
	private Swiper1;
  private bookIdParam;
	private comments:any;
	private bookId:number;
	private exceptDetails:any;
	private bookIdChildValue:number;
  private loginBoolean:boolean;
  private tipLayerBoolean:boolean;
  private tipMessage:string;
  private top1;
  private top2;
  private top3;
  private listslength:number;
  private urlParams:string=environment.apiBase+"/pc/api/comment/add";
 public totalNum = 0; // 总数据条数
 public pageSize = 6;// 每页数据条数
 public totalPage = 0;// 总页数
 public curPage = 1;// 当前页码
 private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});

private currentIndex:number=0;
private flage:number=0
private listsNew:Array<any>;


	receive(msg:boolean){
		this.commentBoolean=msg;
	}
  recevicetip(msg:boolean){
    this.tipLayerBoolean=msg;
  }
	comment():void{
		if(this.getCookie("userId")){
      this.commentBoolean=true;
      this.bookIdParam={bookId:this.bookId}
    }else{
      this.loginBoolean=true;
    }
	}
	exceptional():void{
		if(this.getCookie("userId")){
      this.exceptionalBoolean=true;
      this.bookIdChildValue=this.bookId;
    }else{
      this.loginBoolean=true;
    }
	}
  reviceLogin(msg:boolean){
    this.loginBoolean=msg;
  }
	receiveExcept(msg:boolean){
		
    if(msg==false){
      this.exceptionalBoolean=msg;
    }else{
       //this.except();
       setTimeout(()=>{
         this.tipLayerBoolean=false;
         this.exceptionalBoolean=false;
         window.location.reload();
       },500)
       
    }
	}
   /*receivecomment(msg:any){
    console.log(msg,"评论成功")
    if(msg.httpCode==200){
      this.tipLayerBoolean=true;
      this.tipMessage="发表成功";
      this.commentBoolean=false;
      setTimeout(()=>{
          //window.location.reload();
      },10)
    }else if(msg.httpCode==100){
      this.loginBoolean=true;
    }else{
      this.tipLayerBoolean=true;
      this.tipMessage=msg.msg;
      setTimeout(()=>{
        this.tipLayerBoolean=false;
      },2500)
    }
  }*/
  constructor(private activatedRoute:ActivatedRoute,
  			private router:Router,private cookieService:CookieService,
  			private http:Http) {}

  ngOnInit() {
      //this.sanLogin();
     this.activatedRoute.params.subscribe((params)=>{
     	this.bookId=params.bookId;
     })
     //this.http.get('http://localhost:4200/assets/data/comment.json?bookId='+this.bookId+'&pageNum=1&pageSize=10')
     let body="bookId="+this.bookId+"&pageNum="+this.curPage+"&pageSize="+this.pageSize
     this.http.post(environment.apiBase+"/pc/api/book/comment/list",body,{headers:this.header})
     .map(res=>res.json())
     .subscribe((data)=>{
     	if(data.httpCode){
         this.comments=data.data.list;
         this.totalPage=Math.ceil(data.data.total/data.data.pageSize);
         this.totalNum=data.data.total;
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
     this.except();
    

  }//结束
  /*打赏榜*/
  except(){
      let userId=this.getCookie("userId");
     let body1="bookId="+this.bookId+"&userId="+userId;
     this.http.post(environment.apiBase+"/pc/api/author/tip/info",body1,{headers:this.header})
     .map(res=>res.json())
     .subscribe((data)=>{
       if(data.httpCode==200){
         this.tipLayerBoolean=false;
         this.exceptionalBoolean=false;
         this.exceptDetails=data.data.list;
         this.exceptDetails.length=data.data.list.length;
         this.listsNew=this.exceptDetails;
         var listIcon=data.data.top3;
         for(var i=0;i<listIcon.length;i++){
           if(i==0){
             this.top1=listIcon[i].icon?listIcon[i].icon:'../../../assets/images/200.png';
           }else if(i==1){
             this.top2=listIcon[i].icon?listIcon[i].icon:'../../../assets/images/200.png';
           }else if(i==2){
             this.top3=listIcon[i].icon?listIcon[i].icon:'../../../assets/images/200.png';
           }
         }
         setInterval(() => {
            var newArr=[];
            let id = (this.currentIndex+1) % this.exceptDetails.length;
            this.currentIndex=id;
            if(this.exceptDetails.length<=4){
              this.listsNew=this.exceptDetails;
            }else if(this.exceptDetails.length>4&&this.currentIndex<this.exceptDetails.length-3){
              this.flage=(this.currentIndex+3)%this.exceptDetails.length;
              for(var i=this.currentIndex;i<=this.flage;i++){
                newArr.push(this.exceptDetails[i]);
                this.listsNew=newArr;
              }
            }else if(this.exceptDetails.length>4&&this.currentIndex>this.exceptDetails.length-4){
              //this.currentIndex=this.exceptDetails.length-3;
              this.flage=(this.currentIndex+4); 
              for(var i=this.currentIndex;i<this.exceptDetails.length;i++){
                newArr.push(this.exceptDetails[i]);
              }
              if(newArr.length<=4){
                for(var j=0;j<6-newArr.length;j++){
                  newArr.push(this.exceptDetails[j])
                }
                this.listsNew=newArr;
              }
              
            }
        },3500)
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
  commentZanReader(comment:any):void{
    if(this.getCookie("userId")){
      if(comment.likeFlag){
      }else{
        let commentId=comment.commentId;
        let userId=this.getCookie("userId");
        let body="userId="+userId+"&commentId="+commentId+"&bookId="+this.bookId;
        this.http.post(environment.apiBase+"/pc/api/like",body,{headers:this.header})
        .map(res=>res.json())
        .subscribe(data=>{
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
    }else{
      this.loginBoolean=true;
    }
    
  }
  commentZanAuthor(author:any):void{
    if(author.likeFlag){

    }else{
      let commentId=author.commentId;
      let userId=this.getCookie("userId");
      let body="userId="+userId+"&commentId="+commentId+"&bookId="+this.bookId;
      this.http.post(environment.apiBase+"/pc/api/like",body,{headers:this.header})
      .map(res=>res.json())
      .subscribe(data=>{
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
  getPageData(pageNo) {
    this.curPage = pageNo;
    var userId=this.getCookie("userId");
    var body="bookId="+this.bookId+"&pageNum="+pageNo+"&pageSize="+this.pageSize;
     this.http.post(environment.apiBase+"/pc/api/book/comment/list",body,{headers:this.header})
     .map(res=>res.json())
     .subscribe((data)=>{
       if(data.httpCode==200){
         this.comments=data.data.list;
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
      //window.location.reload();
    }
  }*/
  
}
