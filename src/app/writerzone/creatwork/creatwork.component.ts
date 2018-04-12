import { Component, OnInit,EventEmitter, Input, Output} from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer } from '@angular/platform-browser'
import 'rxjs/Rx';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
//import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-creatwork',
  templateUrl: './creatwork.component.html',
  styleUrls: ['./creatwork.component.css']
})
export class CreatworkComponent implements OnInit {
	private createWork: FormGroup;
	private labelList:Array<String>
	private tipLayerBoolean:boolean;
	private tipMessage:string;
	private bookDetail:any;
  	private bookClassBoolean:boolean=false;
  	private girlClass:Array<BoyAndGirl>;
  	private boyClass:Array<BoyAndGirl>;
  	private classes:Array<BoyAndGirl>;
    private loginBoolean:boolean=false;
	private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});
 private previewImgFile;
	private previewImgSrcs;
  private previewImgFileChange;
	recevicetip(msg:boolean):void{
	    this.tipLayerBoolean=msg;
	  }
  reviceLogin(msg:boolean){
    this.loginBoolean=msg;
  }
  constructor(private fb: FormBuilder,private router:Router,private http:Http,
  	private cookieService: CookieService,private sanitizer: DomSanitizer
    ) {  //private uploader:FileUploader
  	this.createForm();
  }

  ngOnInit() {
    //this.sanLogin();
    let bodyLabel=""
    this.http.post(environment.apiBase+"/pc/api/bookmark/load",bodyLabel,{headers:this.header})
    .map(res=>res.json())
    .subscribe(data=>{
      this.labelList=data.data.list;
      console.log(this.labelList);
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
  	
  	var name = '';
  	$("#labelMore").click(function(){
  		$("#labelId").show();
  		var nameArr=[];
  		$("#labelId input").unbind();
  		$("#labelId input").click(function(){
  			if($(this).is(":checked")){
  				name+=$(this).val()+',';
  				$(this).parent().addClass("on");
  				$("#labelMore").val(name.slice(0,-1));
  			}else{
  				$(this).parent().removeClass("on");
  				nameArr=name.split(',');
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
  				$("#labelMore").val(name.slice(0,-1));
  			}
  		})

  	})
  	$("#labelId").hover(function() {
    	$("#labelId").show();//类hover在下面用来验证是否需要隐藏下拉，没有其他用途。
    },function(){
    	$("#labelId").hide();
    })

    

  }//init
  uploadFile(event) {
    var xhr,ot,oloaded;
      if(!event.target.files[0]) {
        return;
      }
      console.log(event);
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
      }
        //开始上传，发送form数据
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
            },1500);
          }else if(data.httpCode==100){
            this.loginBoolean=true;
          }else{
            this.tipLayerBoolean=true;
            this.tipMessage=data.msg;
            setTimeout(function(){
              this.tipLayerBoolean=false;
            },1500)
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

  getCookie(key:string){
    return this.cookieService.get(key);
  }
	bookClassClick(){
		var bookCategory=this.createWork.get("bookCategory").value;
		if(!bookCategory){
			console.log("abc")
		}
	}
	bookCategoryChange(){
		this.bookClassBoolean=true;
		//var bookCategory= $("#bookCategory").val();
		var bookCategory=this.createWork.get("bookCategory").value;
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
  //创建表单
  createForm(){
  	this.createWork = this.fb.group({
        bookName:['', [Validators.required]],
        bookCategory:['', [Validators.required]],
        bookClass:['', [Validators.required]],
        bookMark:[''],
        bookDes:['',[Validators.required,Validators.minLength(15), Validators.maxLength(300)]],
        subheading:['', [Validators.required,Validators.minLength(1), Validators.maxLength(15)]]
    });
  }
  postCreat(){
        if(this.createWork.valid){
          let bookCover=$("#bookCover").attr("src");
          console.log(bookCover);
          let bookMark=$("#labelMore").val();
          console.log(bookMark);
          if(bookCover){
            console.log(this.createWork.value);
            let userId=this.getCookie("userId");
            let work=this.createWork.value;
            let body="userId="+userId+"&bookName="+work.bookName+"&bookCategory="+work.bookCategory+"&bookClass="+work.bookClass+"&bookMark="+bookMark+"&bookDes="+work.bookDes+"&subheading="+work.subheading+"&bookCover="+bookCover+"&bookId=-1";
             console.log(body);
             this.http.post(environment.apiBase+"/pc/api/author/book/update",body,{headers:this.header})
             .map(res=>res.json())
             .subscribe(data=>{
              if(data.httpCode==200){
                this.tipLayerBoolean=true;
                this.tipMessage="创建作品成功";
                setTimeout(()=>{
                  this.router.navigate(['writerzone/workmanagementList']);
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
          }else{
            this.tipLayerBoolean=true;
            this.tipMessage="请上传图片";
          }
        }else{
          this.tipLayerBoolean=true;
          this.tipMessage="输入框内容未填写完整";
          setTimeout(()=>{
            this.tipLayerBoolean=false;
          },2500)
        }
    }
    cancel(){
      this.createWork.reset();
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