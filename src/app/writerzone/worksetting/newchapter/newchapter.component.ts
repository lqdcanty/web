import { Component, OnInit,Input,ViewChild,Output,EventEmitter} from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/forkJoin';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';
//import { Ng2Ueditor } from 'ng2-ueditor';

@Component({
  selector: 'app-newchapter',
  templateUrl: './newchapter.component.html',
  styleUrls: ['./newchapter.component.css']
})
export class NewchapterComponent implements OnInit {
@Input() chapterParam;
@Input() btnShow;
@Output() outerChapter =new EventEmitter<boolean>();
//@ViewChild('ueditor') ueditor: Ng2Ueditor;
private chapterName:string;
private content:any;
private remark:string='';
private chapter: FormGroup;
private tipLayerBoolean=false;
private tipMessage:string='';
private bookId:number;
private userId;
private loginBoolean=false;
public timeValue;

private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});
recevicetip(msg:boolean):void{
    this.tipLayerBoolean=msg;
  }
reviceLogin(msg:boolean):void{
  this.loginBoolean=msg;
}  
  constructor(private http:Http,private fb: FormBuilder,
    private activatedRoute:ActivatedRoute,private cookieService: CookieService,
    private router:Router) { 
   this.createForm();
}

  ngOnInit() {
    //this.sanLogin();
  	if(this.chapterParam){
      let userId=this.getCookie("userId");
      let body="chapterId="+this.chapterParam+"&userId="+userId;
  		this.http.post(environment.apiBase+"/pc/api/chapter/edit",body,{headers:this.header})
      //this.http.get("http://localhost:4200/assets/data/editchapter.json")
  		.map(res=>res.json())
  		.subscribe(data=>{
        if(data.httpCode==100){
          this.loginBoolean=true;
        }else if(data.httpCode==200){
          this.chapterName=data.data.chapterName;
          this.content=data.data.content;
          this.remark=data.data.remark;
          console.log(data.data);
        }else{
          this.tipLayerBoolean=true;
          this.tipMessage=data.msg;
          setTimeout(()=>{
            this.tipLayerBoolean=false;
          },2500)
        }
  		})
  	}
    this.activatedRoute.params.subscribe(params=>{
      this.bookId=params.bookId;
      console.log(this.bookId)
    })

  }
 setTime() {
     laydate({
        format: 'YYYY/MM/DD hh:mm:ss',
        min: laydate.now(), //设定最小日期为当前日期
        max: '2099-06-16 23:59:59', //最大日期
        istime: true,
        istoday: false,
        elem: '#test5',
        choose: function(date){
          $("#timeTrue").text('定时发布：'+date);
          $("#time").val(date);
            this.timeValue=date;
            console.log(this.timeValue,"时间");
        }
      });
   }
  setTimeSend(){
    if($("#time").val()){
      let chapter=this.chapter.value;
      let userId=this.getCookie("userId");
      let chapterId=this.chapterParam?this.chapterParam:-1;
      let time= $("#time").val().replace(/\//g, '-');
      if(userId){
          if(chapter.chapterName&&this.bookId){
          if(this.chapter.get('content').value.length>1000){
            console.log(this.chapter.value);
            console.log($("#time").val(),"dshada ");
            let body="userId="+userId+"&bookId="+this.bookId+"&chapterName="+chapter.chapterName+"&content="+chapter.content+"&time="+time+"&remark="+chapter.remark+"&chapterId="+chapterId+"&draftId=-1";
            this.http.post(environment.apiBase+"/pc/api/author/tmp/save",body,{headers:this.header})
              .map(res=>res.json())
              .subscribe(data=>{
                if(data.httpCode==100){
                  this.loginBoolean=true;
                }else if(data.httpCode==200){
                  this.tipLayerBoolean=true;
                  this.tipMessage="已经保存到草稿箱！会按照设置时间发布";
                  console.log(this.bookId);
                  setTimeout(() => {
                    console.log(this.bookId)
                    this.tipLayerBoolean=false;
                    this.outerChapter.emit(true);
                    this.router.navigate(['writerzone/worksetting/'+this.bookId+'/saveDraft',this.bookId])
                  }, 1000);
                }else if(data.httpCode==400){
                  this.tipLayerBoolean=true;
                  this.tipMessage=data.msg;
                  setTimeout(()=>{
                    this.router.navigate(['writerzone/worksetting/'+this.bookId+'/newvolume',this.bookId])
                  },1500)
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
              this.tipMessage="发布正文内容要大于1000字哦";
              setTimeout(()=>{
                this.tipLayerBoolean=false;
              },2500)
            } 
          }else{
            this.tipLayerBoolean=true;
            this.tipMessage="请填写完整带*号内容";
            setTimeout(()=>{
              this.tipLayerBoolean=false;
            },2500)
          }
        }else{
          this.loginBoolean=true;
        }
    }else{
        this.tipLayerBoolean=true;
        this.tipMessage="请设置时间！";
        setTimeout(()=>{
          this.tipLayerBoolean=false;
        },2500)
     }
  }
   

    createForm(){
      this.chapter = this.fb.group({
          chapterName:['', [Validators.required,Validators.maxLength(50)]],
          content:['', [Validators.required]],
          time:[''],
          remark:['']
          //chapterId:['']
      });
    }
  immediateClick():void{
      console.log(this.bookId,this.chapter.valid);
      let userId=this.getCookie("userId");
      if(userId){
        if(this.chapter.valid&&this.bookId){
          console.log(this.chapter.value);
          if(this.chapter.get('content').value.length>1000){
            let chapter=this.chapter.value;
            let chapterId=this.chapterParam?this.chapterParam:-1;
            let time=-1;
            let draftId=-1;
            let userId=this.getCookie("userId");
            let body="userId="+userId+"&bookId="+this.bookId+"&chapterName="+chapter.chapterName+"&content="+chapter.content+"&time="+time+"&remark="+chapter.remark+"&chapterId="+chapterId+"&draftId="+draftId;
            console.log(body,"body");
            this.http.post(environment.apiBase+"/pc/api/author/publish",body,{headers:this.header})
            .map(res=>res.json())
            .subscribe(data=>{
              if(data.httpCode==100){
                this.loginBoolean=true;
              }else if(data.httpCode==200){
                if(this.chapterParam){
                  this.tipLayerBoolean=true;
                  this.tipMessage="发布成功,等待审核";
                  console.log(this.bookId);
                  setTimeout(() => {
                    this.tipLayerBoolean=false;
                    this.outerChapter.emit(true);
                  }, 1000);
                }else{
                  this.tipLayerBoolean=true;
                  this.tipMessage="发布成功,等待审核";
                  setTimeout(() => {
                    this.router.navigate(['writerzone/worksetting/'+this.bookId+'/publishedChapter',this.bookId])
                  }, 1000);
                }
              }else if(data.httpCode==400){
                this.tipLayerBoolean=true;
                this.tipMessage=data.msg;
                setTimeout(()=>{
                  this.router.navigate(['writerzone/worksetting/'+this.bookId+'/newvolume',this.bookId])
                },1500)
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
            this.tipMessage="发布正文内容要大于1000字哦";
            setTimeout(()=>{
              this.tipLayerBoolean=false;
            },2500)
          }
        }else{
          this.tipLayerBoolean=true;
          this.tipMessage="请填写完整带*号内容";
          setTimeout(()=>{
            this.tipLayerBoolean=false;
          },2500)
        }
      }else{
        this.loginBoolean=true;
      }
  }
  saveChapterFunction():void{
    let time=$("#time").val()?$("#time").val():-1;
    let userId=this.getCookie("userId");
    if(userId){
        if(this.bookId&&this.chapter.get('chapterName').value){
        let chapter=this.chapter.value;
        let body="userId="+userId+"&bookId="+this.bookId+"&chapterName="+chapter.chapterName+"&content="+chapter.content+"&remark="+chapter.remark+"&chapterId=-1&draftId=-1";
        this.http.post(environment.apiBase+"/pc/api/author/tmp/save",body,{headers:this.header})
        .map(res=>res.json())
        .subscribe(data=>{
          if(data.httpCode==200){
            this.tipLayerBoolean=true;
            this.tipMessage="已经保存到草稿箱了！";
            console.log(this.bookId);
            setTimeout(()=>{
                this.router.navigate(['writerzone/worksetting/'+this.bookId+'/saveDraft',this.bookId])
            },1000);
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
  //删除，重置
  reset():void{
    $("#timeTrue").text("");
    this.chapter.reset();
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


