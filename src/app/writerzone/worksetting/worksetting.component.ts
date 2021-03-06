import { Component, OnInit,Injectable } from '@angular/core';
import {Location}from '@angular/common';
import { Headers, Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { ActivatedRoute,Params,Router,NavigationEnd,NavigationStart} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-worksetting',
  templateUrl: './worksetting.component.html',
  styleUrls: ['./worksetting.component.css']
})
export class WorksettingComponent implements OnInit {
	private bookId:number;
  private changeafter;
  private workModifyBoolean:boolean;
  private modifiedBoolenone:boolean;
  private bookDetail;
  private labelList:Array<String>;
  private modifyWorkForm: FormGroup;
  private bookName:string;private bookCategory:string;private bookClass:string;
  private bookMark:string;private bookDes:string;private subheading:string;
  private bookClassChinese:string;
  private bookCover:string;
  private girlClass:Array<BoyAndGirl>;
  private boyClass:Array<BoyAndGirl>;
  private classes:Array<BoyAndGirl>;
  private tipLayerBoolean:boolean=false;
  private tipMessage:string;
  private loginBoolean:boolean=false;
  //private getrName:any;
  private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});

 constructor(private activatedRoute:ActivatedRoute,
   private router:Router,private location:Location,
   private http:Http,private cookieService: CookieService,private fb: FormBuilder) { 
   this.createForm();

 }
  modify():void{
      this.modifiedBoolenone=false;
  }
  reviceLogin(msg:boolean){
    this.loginBoolean=msg;
  }
  recevicetip(msg:boolean){
    this.tipLayerBoolean=msg;
  }
  ngOnInit() { 
    //this.sanLogin();
      let bodyLabel=""
      this.http.post(environment.apiBase+"/pc/api/bookmark/load",bodyLabel,{headers:this.header})
      //this.http.get("http://localhost:4200/assets/data/label.json")
      .map(res=>res.json())
      .subscribe(data=>{
        this.labelList=data.data.list;
        console.log(this.labelList,"标签");
      })
      this.girlClass=[
      new BoyAndGirl("DSYQ","都市言情"),
      new BoyAndGirl("CYJK","穿越架空"),
      new BoyAndGirl("GDYQ","古代言情"),
      new BoyAndGirl("LMQC","浪漫青春"),
      new BoyAndGirl("XYLYF","悬疑灵异"),
      new BoyAndGirl("QTFLF","其他分类")
    ];
    this.boyClass=[
      new BoyAndGirl("DSXS","都市现实"),
      new BoyAndGirl("YSCN","异术超能"),
      new BoyAndGirl("XHXZ","玄幻修真"),
      new BoyAndGirl("LSJK","历史架空"),
      new BoyAndGirl("XYLYM","悬疑灵异"),
      new BoyAndGirl("QTFLM","其他分类")
    ];
    //配合实现修改的显示跟隐藏；
    let arr1=location.href;
    let arr=arr1.split("#")[1].split("/");
    for(var i=0;i<arr.length;i++){
      if(arr[i]!=='workmodify'&&arr.length<5){
        this.workModifyBoolean=true;
        this.modifiedBoolenone=true;
        $("#worksettingNav a").eq(0).addClass("on");
      }else if(arr.length>5){
        this.workModifyBoolean=false;
      }
    } 
    this.router.events
    .filter((event) => event instanceof NavigationEnd)
    .subscribe((event:NavigationEnd) => {
      this.workModifyBoolean=false;
      $("#worksettingNav a").eq(0).removeClass("on");
    });
    //获取参数
  	this.activatedRoute.params.subscribe(params=>{
  		this.bookId=params.bookId;
      console.log("worksetting",this.bookId);
  	})
    //获取信息
    let userId=this.getCookie("userId");
    let body="userId="+userId+"&bookId="+this.bookId
    this.http.post(environment.apiBase+"/pc/api/author/book/info",body,{headers:this.header})
    //this.http.get("http://localhost:4200/assets/data/authorzoneDetail.json?"+body)
    .map(res=>res.json())
    .subscribe(data=>{
      if(data.httpCode==100){
        this.loginBoolean=true;
      }else if(data.httpCode==200){
        this.bookCover=data.data.bookCover;
        this.bookDetail=data.data;
        this.bookName=data.data.bookName;
        this.bookCategory=data.data.bookCategory;
        //为了给男频过渡；
        this.changeafter=this.bookCategory=="男频"?"M":"F";
        
        if(this.changeafter=="M"){
          this.classes=this.boyClass;
          console.log(this.classes)
        }else if(this.changeafter=="F"){
          this.classes=this.girlClass;
          console.log(this.classes)
        }
        this.bookClass=data.data.bookClass;
        //this.bookClassChinese=data.data.bookClass;
        this.bookMark=data.data.bookMark;
        //this.getrName=data.data.bookMark;
        this.bookDes=data.data.bookDes;
        this.subheading=data.data.subheading;
        console.log(this.bookDetail,"内容");
      }else{
        this.tipLayerBoolean=true;
        this.tipMessage=data.msg;
        setTimeout(()=>{
          this.tipLayerBoolean=false;
        },2500)
      }
    })
  }//ngOnInit结束
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
      } //开始上传，发送form数据
      function uploadComplete(evt) {
          //服务断接收完文件返回的结果
          var data = JSON.parse(evt.target.responseText);
          console.log(data);
          if(data.httpCode==200) {
            this.tipLayerBoolean=true;
            this.tipMessage=data.msg;
            this.bookCover=data.data.imgUrl;
            console.log(this.bookCover);
            $("#bookCover").attr("src",data.data.imgUrl);
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
            },2500)
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
   //修改标签
  mouseoutF(){
    $("#labelId").hide();
  }
  mouseoverF(){
    $("#labelId").show();
  }
  labelClick(){
    var getrName;
      console.log("点击了");
      console.log(this.bookMark,"this.bookMark点击了");
      var name = '';
      getrName=$("#labelMore").val()
      //getrName=this.modifyWorkForm.get("bookMark").value
      $("#labelId").show();
      var nameArr=[];
      nameArr=getrName.split(',');
      console.log(nameArr,"sdfskd ");
      if(nameArr[0]){
        for(var y=0;y<nameArr.length;y++){
          name+=nameArr[y]+',';
          console.log(name,"name");
          $("#labelId input").each(function(){
            if(nameArr[y]==$(this).val()){
              console.log("加on")
              $(this).attr("checked",'true').parent("b").addClass("on");
            }
          })
        }
      }
      $("#labelId input").unbind();
      $("#labelId input").click(function(){
        if($(this).is(":checked")){
          name+=$(this).val()+',';
          $(this).parent().addClass("on");
          $("#labelMore").val(name.slice(0,-1));
          this.bookMark=name.slice(0,-1);
          console.log(this.bookMark,"this.bookMark");
        }else{
          $(this).parent().removeClass("on");
          nameArr=name.split(',');
          console.log(nameArr,"删除前");
          nameArr.pop();
          console.log(nameArr,"拭擦钱");
          for(var i=0;i<nameArr.length;i++){
            if($(this).val()===nameArr[i]){
              nameArr.splice(i,1);
              break;
            }
          }
          name="";
          for(var i=0;i<nameArr.length;i++){
            name+=nameArr[i]+',';
          }
          console.log(name,"删除之后");
          $("#labelMore").val(name.slice(0,-1));
          this.bookMark=name.slice(0,-1);
          console.log(this.bookMark,"this.bookMark");
        }
      })
    }
  bookCategoryChange():void{
    var bookCategory=this.modifyWorkForm.get("bookCategory").value;
    console.log(bookCategory,"bookCategory的之",bookCategory)
      if(bookCategory=="M"){
        console.log("bookCategory=='M'")
        this.classes=this.boyClass;
        console.log(this.classes)
      }else if(bookCategory=="F"){
        console.log("bookCategory=='F'")
        this.classes=this.girlClass;
        console.log(this.classes)
      }
  }
  createForm(){
    this.modifyWorkForm = this.fb.group({
          bookName:['', [Validators.required]],
          bookCategory:['', [Validators.required]],
          bookClass:['', [Validators.required]],
          bookMark:[''],
          bookDes:['',[Validators.required,Validators.minLength(15), Validators.maxLength(300)]],
          subheading:['', [Validators.required,Validators.minLength(4), Validators.maxLength(50)]],
          bookCover:['', [Validators.required]]
      });
  }
  submitModify():void{
    console.log("提交");
    if(this.modifyWorkForm.valid){
      let modifyWorkValue=this.modifyWorkForm.value;
      console.log(this.modifyWorkForm.value);
      let bookMark=$("#labelMore").val();
      let userId=this.getCookie("userId");
      let bookCover=$("#bookCover").attr("src");
      this.bookCover=$("#bookCover").attr("src");
      let bookClass=$("#bookClassName option:checked").attr("id");
     /// this.bookClassChinese=$("#bookClassName option:checked").attr("id");

      let body="userId="+userId+"&bookName="+modifyWorkValue.bookName+"&bookCategory="+modifyWorkValue.bookCategory+"&bookClass="+bookClass+"&bookMark="+bookMark+"&bookDes="+modifyWorkValue.bookDes+"&subheading="+modifyWorkValue.subheading+"&bookCover="+bookCover+"&bookId="+this.bookId;
      console.log(body);
      this.http.post(environment.apiBase+"/pc/api/author/book/update",body,{headers:this.header})
      .map(res=>res.json())
      .subscribe(data=>{
        if(data.httpCode==200){
          this.tipLayerBoolean=true;
          this.tipMessage="修改成功！";
          setTimeout(() => {
            this.tipLayerBoolean=false;
            this.modifiedBoolenone=!this.modifiedBoolenone;
            this.router.navigate(['/writerzone/worksetting',this.bookId]);
          }, 1000);
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
  cancel():void{
    this.modifiedBoolenone=!this.modifiedBoolenone;
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
export class BoyAndGirl {
    //构建函数可以申明nav所拥有的属性
    constructor(
      public bookClass:String,
      public bookClassName:String
    ) {}
}
