import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import { Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { Headers, Http } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-comment-layer',
  templateUrl: './comment-layer.component.html',
  styleUrls: ['./comment-layer.component.css']
})
export class CommentLayerComponent implements OnInit {
private commentForm: FormGroup;
private tipLayerBoolean:boolean=false;
private tipMessage:string;
private loginBoolean:boolean;
private imgYz:string;
private userId;
private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});
	@Input() paramsId;
  @Input() paramsUrl;
  @Output() outer = new EventEmitter<boolean>();
/*  @Output() outercomment = new EventEmitter<boolean>();*/
  //@Output() outercommentSuccess = new EventEmitter<boolean>();
	sendToParent(){
		this.outer.emit(false);
	}
  recevicetip(msg:boolean){
    this.tipLayerBoolean=msg;
  }
  reviceLogin(msg:boolean){
    this.loginBoolean=msg;
  }
  constructor(private fb: FormBuilder,private cookieService: CookieService,
    private http:Http) { 
    this.createForm();
  }

  ngOnInit() {
    let userId=this.getCookie("userId");
    this.imgYz=environment.apiBase+"/pc/api/verifycode/pic?userId="+userId;
  }
 
  createForm() {
    this.commentForm = this.fb.group({
        content:['', [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
        verifyCode:['',[Validators.required,Validators.minLength(4)]]
    });
  }
  postData(){
    console.log("发表评论");
    let userId=this.getCookie("userId");
    console.log(userId,"userId")
    let keyName;
    let keyValue;
    for(var key in this.paramsId){
        keyName=key;
        keyValue=this.paramsId[key];
    }
    if(this.commentForm.valid&&userId&&this.paramsId){
      let content=this.commentForm.value.content;
      let verifyCode=this.commentForm.value.verifyCode;
      let body="userId="+userId+"&"+keyName+"="+keyValue+"&content="+content+"&verifyCode="+verifyCode;
      console.log(body,"body")
      //this.http.get("http://localhost:4200/assets/data/sendComment.json")
      this.http.post(this.paramsUrl,body,{headers:this.header})
      .map(res=>res.json())
      .subscribe(data=>{
        //this.outercomment.emit(data);
        if(data.httpCode==200){
          this.tipLayerBoolean=true;
          this.tipMessage="评论成功！";
          setTimeout(()=>{
              this.outer.emit(false);
              window.location.reload();
          },100)
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

}
