import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-book-content',
  templateUrl: './book-content.component.html',
  styleUrls: ['./book-content.component.css']
})
export class BookContentComponent implements OnInit {
 private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});
private bookContent:any;
private bookId:number;
private bookIdParam;
private urlParams:string=environment.apiBase+"/pc/api/comment/add";
private chapterId:number;
private userId:string;
private chapterList;
private volumeListEs:Array<any>;
private bookIdChildValue:number;
private colorList:Array<any>;
private colorListInner:Array<any>;
private colorIndex:number=0;
private dirctoryBoolean:boolean=false;
private setingBoolean:boolean=false;
private addStoreBoolean:boolean=false;
private phoneBoolean:boolean=false;
private	exceptionalBoolean:boolean=false;
private tipLayerBoolean:boolean=false;
private tipMessage: string
private loginLayer=false;
private loginBoolean:boolean=false;
private commentBoolean:boolean=false;
private exceptDetailsLength:number=0;
private listIcon:Array<any>;
private nextChapterId:number;
private preChapterId:number;
private AutoCircle:boolean=true;
private autoPurchase:number=1;
private fontSize:number=18;
private bookClass:string;
private hasNext:boolean;
private bookCategory:string;private shelfFlag:string;
private colorBg:string="../../assets/w.png";
private authorCode:string;private author:string;private chapterName:string;private wordNum:number;
private updateTime:string;private contents:Array<string>;private readPermission:string;private purchased:string;private bookName:string;
private fee:number;private remark;
private innerBg:string;private yueeLayer:boolean=false;
private divscroll:any;private scrollTop:number;private contentAuthorWord:string;
private btnString:string;private tempUrlString:string;
recevicetip(msg:boolean):void{
 this.tipLayerBoolean=msg;
}
reviceLogin(msg:boolean){
 this.loginBoolean=msg;
}
receivecomment(msg:any){
    console.log(msg,"评论成功")
    if(msg.httpCode==200){
      this.tipLayerBoolean=true;
      this.tipMessage="发表成功";
      this.commentBoolean=false;
      setTimeout(()=>{
          this.tipLayerBoolean=false;
          this.commentBoolean=false;
      },1500)
    }else{
      this.tipLayerBoolean=true;
      this.tipMessage=msg.msg;
      setTimeout(()=>{
        this.tipLayerBoolean=false;
      },2500)
    }
  }
dirctory():void{
	$(window).scroll();
	let body="userId="+this.userId+"&bookId="+this.bookId;
	this.http.post(environment.apiBase+"/pc/api/book/contents",body,{headers:this.header})
	.map(res=>res.json())
	.subscribe(data=>{
		if(data.httpCode==200){
			var volumeList=[];
	        this.chapterList=data.data;
	        for(var i=0;i<this.chapterList.length;i++){
	          var lastVolume=volumeList==null?'':volumeList[volumeList.length-1];
	          var chapter=this.chapterList[i];
	          if(lastVolume==null){
	            var volume=Object();
	            volume.volumeName=chapter.volumeName;
	            volume.chapterList=[];
	            volume.chapterList.push(chapter);
	            volumeList.push(volume);
	          }else if(lastVolume!=null){
	            if(lastVolume.volumeName==chapter.volumeName){
	              lastVolume.chapterList.push(chapter);
	             volumeList[volumeList.length-1]=lastVolume;
	            }else{
	              var volume=Object();
	              volume.volumeName=chapter.volumeName;
	              volume.chapterList=[];
	              volume.chapterList.push(chapter);
	              volumeList.push(volume);
	            }
	        }
	      }
	      this.volumeListEs=volumeList;
	      this.dirctoryBoolean=true;
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
seting():void{
	this.colorList=[
		new Color("../../assets/images/w.png"),
		new Color("../../assets/images/grayBg.png"),
		new Color("../../assets/images/a.png"),
		new Color("../../assets/images/greenBgtu.png"),
		new Color("../../assets/images/heiBg.png")
	];
	this.colorListInner=[
		new Color("../../assets/images/w.png"),
		new Color("../../assets/images/grayBg1.png"),
		new Color("../../assets/images/b.png"),
		new Color("../../assets/images/greenBgtu1.png"),
		new Color("../../assets/images/heiBg1.png")
	];
	this.setingBoolean=true;
	$(window).scroll();
}
addStore(shelfFlag:string):void{
    if(shelfFlag!="1"){
      let userId=this.getCookie("userId");
      let body="userId="+userId+"&bookId="+this.bookId;
      this.http.post(environment.apiBase+"/pc/api/bookshelf/add",body,{headers:this.header})
      .map(res=>res.json())
      .subscribe(data=>{
        if(data.httpCode==100){
          this.loginBoolean=true;
        }else if(data.httpCode==200){
          this.shelfFlag="1";
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
phone():void{
	this.phoneBoolean=true;
	$(window).scroll();		
}
exceptional():void{
	this.exceptionalBoolean=true;
	this.bookIdChildValue=this.bookId;
	console.log(this.bookIdChildValue);
}
commentt():void{
	this.commentBoolean=true;
	this.bookIdParam={bookId:this.bookId}
    console.log(this.bookId)
}
closeLayer():void{
	this.dirctoryBoolean=false;
	this.setingBoolean=false;
	this.phoneBoolean=false;
	this.commentBoolean=false;
}
receive(msg:boolean){
	this.commentBoolean=msg;
}
receiveExcept(msg:boolean){	
    if(msg==false){
      this.exceptionalBoolean=msg;
    }else{
    	var chaptert=$(".content:last-child").attr("data-type")?$(".content:last-child").attr("data-type"):this.chapterId;
    	console.log(chaptert,"chaptert");
     	var tempUrl=window.location.href.split("#")[0];
		var tempUrl=window.location.href.split("#")[0];
		window.location.href=tempUrl+"#/bookContent/"+this.bookId+'_'+chaptert;
     	window.location.reload();
    }
}
directoryPage(item:any):void{
	this.router.navigate(['./bookContent/'+this.bookId+'_'+item.chapterId]);
	window.location.reload();
}
litterFun():void{
	this.fontSize-=2;
	if(this.fontSize>12||this.fontSize==12){
		$(".chapterContent").attr("style","font-size:"+this.fontSize+"px");
	}else{
		this.tipLayerBoolean=true;
        this.tipMessage="已经是最小号字体了！";
        setTimeout(()=>function(){
        	this.tipLayerBoolean=false;
        },2500)
	}
	
}
moreFun():void{
	this.fontSize+=2;
	if(this.fontSize<30||this.fontSize==30){
		$(".chapterContent").attr("style","font-size:"+this.fontSize+"px");
	}else{
		this.tipLayerBoolean=true;
        this.tipMessage="已经是最大号字体了！";
        setTimeout(()=>function(){
        	this.tipLayerBoolean=false;
        },2500)
	}
}
setSave():void{
	$(".chapterContent").attr("style","font-size:18px");
	$(".bookContentColor").attr("style","background:#f6f6f6");
	$(".contentBox").attr("style","background:transparent");
	$(".chapterContent").attr("style","color:rgb(68,68,68)");
	$(".contentAddBox").attr("style","background:transparent");
	$(".content").attr("style","border-color:#e5e5e5");
	$(".contentNav").attr("style","background:#fff;border-color:#444;");
	$(".rightNav").attr("style","background:#fff;border-color:#444;");
	this.colorBg='../../assets/images/w.png';
}

  constructor(private cookieService: CookieService,private http:Http,
  	private activatedRoute:ActivatedRoute,private router:Router) { 
  	
  }

  ngOnInit() {
  	//this.sanLogin();
  	$(window).scrollTop(0);
  	this.userId=this.getCookie("userId")?this.getCookie("userId"):'-1';
  	this.activatedRoute.params.subscribe(params => {  
  		var bookAndChapter=params.bookAndChapter;
  		console.log(bookAndChapter);
  		this.bookId=parseInt(bookAndChapter.split("_")[0]);
  		this.chapterId=parseInt(bookAndChapter.split("_")[1]);
        this.content();
        this.except();
    })
     
  }//结束
  except(){
     let body1="bookId="+this.bookId+"&userId="+this.userId;
     this.http.post(environment.apiBase+"/pc/api/author/tip/info",body1,{headers:this.header})
     .map(res=>res.json())
     .subscribe((data)=>{
       if(data.httpCode==200){
         let arr1=location.href;
		 let arr=arr1.split("?")[1];
	      if(arr=='exceptionalBoolean='+this.chapterId){
	        this.exceptionalBoolean=true;
	        this.bookIdChildValue=this.bookId;
	      }else{
	      	this.tipLayerBoolean=false;
	      }
         this.exceptDetailsLength=data.data.list.length;
         this.listIcon=data.data.top3;
         $("#exceptLength").text(this.exceptDetailsLength);
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
  content(){
  	let body="userId="+this.userId+"&bookId="+this.bookId+"&chapterId="+this.chapterId;
    this.http.post(environment.apiBase+"/pc/api/book/content",body,{headers:this.header})
    //this.http.get("http://localhost:4200/assets/data/bookContent.json")
  	.map(res=>res.json())
  	.subscribe(data=>{
  		if(data.httpCode==200){
  			this.yueeLayer=false;
  			$(window).scrollTop(0);
  			this.dirctoryBoolean=false;
			this.setingBoolean=false;
			this.phoneBoolean=false;
			this.commentBoolean=false;
  			this.bookContent=data.data;
  			this.nextChapterId=data.data.nextChapterId;
  			this.chapterId=data.data.chapterId;
  			this.preChapterId=data.data.preChapterId;
  			this.authorCode=data.data.authorCode;
			this.author=data.data.author;this.chapterName=data.data.chapterName;
			this.wordNum=data.data.wordNum;this.updateTime=data.data.updateTime;
			this.contents=data.data.contents;this.readPermission=data.data.readPermission;
			this.purchased=data.data.purchased;this.fee=data.data.fee;
			this.remark=data.data.remark;
			this.bookCategory=data.data.bookCategory;
			this.bookName=data.data.bookName;
			this.shelfFlag=data.data.shelfFlag;
			this.bookClass=data.data.bookClass;
			this.hasNext=data.data.hasNext;
  			console.log(this.nextChapterId,"this.nextChapterId");
  			var bookIdT=this.bookId;
		  	var userIdT=this.userId;
		  	var icons=this.listIcon;
		  	var chapterIdben=this.chapterId;
		  	var flage=true;
		  	var enviUrl=environment.apiBase;
		  	var chapterIdT=this.nextChapterId;
		  	var hasNext=this.hasNext;
		  	var exceptDetails=this.exceptDetailsLength;
		  	var login=this.loginBoolean;
		  	var tipLayer=this.tipLayerBoolean;
		  	var tipText=this.tipMessage;
		  	var autoPurchaseValue=1;
		  	var bg=this.colorBg;

		  	console.log(bg,'aaa',this.colorBg,"this.colorBg");
		  	$(window).scroll(function() {
		  		var scrollTop = $(this).scrollTop();
		  		var contentHeight=$(".content").height();
		  		var scrollHeight = $(document).height();
				var windowHeight = $(this).height();
				if(scrollTop > scrollHeight - windowHeight-200){
					//chapterIdT!=-1&&
					if(flage&&chapterIdT!=-1){
						flage=false;
						var bodyJson={
							userId:userIdT,
							bookId:bookIdT,
							chapterId:chapterIdT
						}
						console.log(bodyJson);
						$.ajax({
							type:"post",
			                url:enviUrl+"/pc/api/book/content",
			                dataType:'json',
			                data:bodyJson,
			                contentType: "application/x-www-form-urlencoded;charset=utf-8",
			                success:function(ret){
				                 if(ret.httpCode==200){
				                 	flage=true;
				                 	$("#tipLayerBoolean").hide();
				                 	console.log(ret.data);
					                 var bookContent=ret.data;
					                 chapterIdT=ret.data.nextChapterId;
					                 chapterIdben=ret.data.chapterId;
					                 console.log(this.chapterId,chapterIdben,"zhangh1")
					                 //bookContent.hasNext
					                 if(bookContent.purchased=='true'||bookContent.purchased=='all'){
					                 	 console.log(chapterIdT,"chapterIdT")
						                 var html='<div class="content pd40" data-type="'+bookContent.chapterId+'" id="content"><h1 class="title">'+bookContent.chapterName+'</h1><div class="author"><span>作者：'+bookContent.author+'</span><span class="ml20">字数：'+bookContent.wordNum+'字</span><span class="ml20">时间：'+bookContent.updateTime+'</span></div><div class="chapterContent mt32">';
						                 var htmlp="";
						                for(var i=0;i<bookContent.contents.length;i++){
						                	htmlp+='<p>'+bookContent.contents[i]+'</p>';
						                }
						                html=html+htmlp+' </div><div class="authorSay mt40"><div class="border"><span>作者有话说:</span><p class="authorSayContent">'+bookContent.remark+'</p></div></div><div class="exceptional"><div class="exceptionalBtn" data-type='+bookContent.chapterId+'><span>赞赏</span><b id="exceptLength">'+exceptDetails+'</b></div><div class="exceptionalPerson mt32 mb20">';
						                var iconHtml='';
						                if(icons){
						                	for(var y=0;y<icons.length;y++){
						                		iconHtml+='<span style="background-image:url(' + icons[y].icon+ ')"></span>'
						                	}
							            }
							             html+=iconHtml+'</div></div></div>';
							            $(".contentAddBox").append(html); 
							            //$(".content").attr("style","background:url("+bg+") repeat;border-color:#444;");
							            console.log($(".contentAddBox").css("background-image"),'11');
							            if($(".contentAddBox").css("background-image").indexOf("heiBg1")>0){
							            	$(".content").attr("style","border-color:#444;");
							            }else{
							            	$(".content").attr("style","border-color:#e5e5e5;");
							            }
							            console.log(bg,'bbb',this.colorBg,"this.colorBg");
							            $("#close").click(function(){
							            	$("#tipLayerBoolean").hide();
							            })
							            $("#sendToParent").click(function(){
							            	$("#tipLayerBoolean").hide();
							            })
							            //新加的章节中的点赞
							            
					                 }else if(bookContent.readPermission=='vip'&&bookContent.purchased=='false'&&(!bookContent.hasNext)){
					                 	$(".content").each(function(index,element){
					                 		var i=index;
					                 		if(i!=0){
					                 			$(this).remove();
					                 		}
					                 	})
					                 	var tempUrl=window.location.href.split("#")[0];
					                 	window.location.href=tempUrl+"#/bookContent/"+bookIdT+'_'+bookContent.chapterId;
					                }else{
					                	this.tipLayerBoolean=true;
							            this.tipMessage="已经是最后一章！";
							            setTimeout(()=>{
								            this.tipLayerBoolean=false;
								        },2500)
					                }
									$(".exceptionalBtn").click(function(){
								    	console.log($(this).attr("dat-type"),"data")
								    	if($(this).attr("data-type")){
								    		$(".content").each(function(index,element){
						                 		var i=index;
						                 		if(i!=0){
						                 			$(this).remove();
						                 		}
						                 	})
								    	   var tempUrl=window.location.href.split("#")[0];
					                 	   window.location.href=tempUrl+'#/bookContent/'+bookIdT+'_'+$(this).attr("data-type")+'?exceptionalBoolean='+$(this).attr("data-type");
								    	}
								    })

				                 }else if(ret.httpCode==100){
				                 	if(ret.msg.split("=")[1]){
				                 		console.log(ret.msg.split("=")[1],"hsuz");
				                 		$(".content").each(function(index,element){
					                 		var i=index;
					                 		if(i!=0){
					                 			console.log("contet")
					                 			$(this).remove();
					                 		}
					                 	})
				                 		var chapterId=ret.msg.split("=")[1];
				                 		var tempUrl=window.location.href.split("#")[0];
					                    window.location.href=tempUrl+"#/bookContent/"+bookIdT+'_'+chapterId;
					                 }
				                 }else if(ret.httpCode==103){
				                 	/*console.log("余额不足"+chapterIdT);
									$("#yueeLayer").show();
									var abcd=window.location.href.split("#")[0]
									var abc=encodeURIComponent(abcd+'#/'+bookIdT+'_'+chapterIdT); 
  	                                $("#urlA").attr("href",abcd+"#/topUp/"+abc,"_blank") */ 
  	                                console.log("余额不足"+chapterIdT);
  	                                var size=$(".content").length;
  	                                console.log(size,"geshu ")
  	                                $(".content").each(function(index,element){
				                 		var i=index;
				                 		if(i!=(size-1)){
				                 			console.log("contet")
				                 			$(this).remove();
				                 		}
				                 	})
				                 	var chapterId=ret.msg.split("=")[1];
			                 		var tempUrl=window.location.href.split("#")[0];
				                    window.location.href=tempUrl+"#/bookContent/"+bookIdT+'_'+chapterIdT;
				                    //var chapterId=ret.msg.split("=")[1];
			                 		//var tempUrl=window.location.href.split("#")[0];
  	                               // $("#yueeLayer").show();
  	                                /*this.contentAuthorWord="余额不足，请充值";
									this.btnString="去充值";
									this.tempUrlString="/topUp/"+encodeURIComponent(tempUrl+"#/bookContent/"+bookIdT+'_'+chapterIdT);
									console.log(this.tempUrlString,"neirong");*/
				                 }
				            }
						}) 
					}
				}else if(scrollTop>182){
					$(".contentNav").attr("style","position:fixed;top:0px");
					$(".rightNav").attr("style","bottom:0px");
					$(".phoneReadLayer").attr("style","position:fixed;top:123px");
					$(".directoryLayer").attr("style","position:fixed;top:0px");
					$(".settingLayer ").attr("style","position:fixed;top:0px");
				}else if(scrollTop<182){
					$(".contentNav").attr("style","position:absolute;top:182px");
					$(".rightNav").attr("style","bottom:60px");
					$(".phoneReadLayer").attr("style","position:absolute;top:305px");
					$(".directoryLayer").attr("style","position:absolute;top:182px");
					$(".settingLayer ").attr("style","position:absolute;top:182px");
				}
		  	})
		  	this.nextChapterId=chapterIdT;
		  	
		  	this.loginBoolean=login;
		  	this.tipLayerBoolean=tipLayer;
		  	bg=this.colorBg; 	
  		}else if(data.httpCode==100){
  			this.loginBoolean=true;
  		}else if(data.httpCode==103){
            /*console.log("yueebuzu")
            $("#yueeLayer").show();
            var abcd=window.location.href.split("#")[0]
			var abc=abcd+"#/topUp/"+encodeURIComponent(window.location.href);
			this.tempUrlString=abc;*/
			this.yueeLayer=true;
			//$("#yueeLayer").show();
			this.contentAuthorWord="余额不足，请充值";
			this.btnString="去充值";
			this.tempUrlString="/topUp/"+encodeURIComponent(window.location.href);
			console.log(this.tempUrlString,"angular");
  		}else{
  			this.tipLayerBoolean=true;
            this.tipMessage=data.msg;
            setTimeout(()=>{
	            this.tipLayerBoolean=false;
	        },2500)
  		}
  	})
  }
 // http:%2F%2Flocalhost:8000%2F%23%2FbookContent%2F187_43115
 //http%253A%252F%252Flocalhost%253A8000%252F%2523%252FbookContent%252F187_43115
  /*sendToParent(){
  	$("#yueeLayer").hide();
  }*/
  reviceunauthor(msg:boolean){
  	this.yueeLayer=msg;
  }
  
  palyFunction(chapterId:number):void{
  	if(this.autoPurchase){
  		//let userId=this.getCookie("userId");//autoPurchase=1
		let body="userId="+this.userId+"&chapterId="+chapterId+"&autoPurchase="+this.autoPurchase;
		this.http.post(environment.apiBase+"/pc/api/book/purchase",body,{headers:this.header})
		.map(res=>res.json())
		.subscribe(data=>{
			if(data.httpCode==200){
				this.tipLayerBoolean=true;
				this.tipMessage="购买成功！";
				setTimeout(()=>{
					if(this.bookId+'_'+this.chapterId==this.bookId+'_'+chapterId){
						window.location.reload();
					}else{
					}
				},400)
			}else if(data.httpCode==100){
				this.loginBoolean=true;
			}else if(data.httpCode==103){
				this.tipLayerBoolean=true;
		        this.tipMessage="余额不足,请充值!";
		        setTimeout(()=>{  
		          var tempUrl=window.location.href;
		          this.router.navigate(['/topUp',tempUrl]);
		        },1500)
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
  AutoCircleFun():void{
  	if($("#bb").hasClass("on")){
  		this.AutoCircle=false;
  		this.autoPurchase=-1;
  	}else{
  		this.autoPurchase=1;
  		this.AutoCircle=true;
  	}
  	
  }
  setingColor(color:string,i:number):void{
  	this.colorIndex=i;
  	this.innerBg=color;
  	this.colorBg=this.colorListInner[i].colorString;
  	if(i==4){
  		$(".bookContentColor").attr("style","background:url("+this.innerBg+") repeat");
		$(".contentBox").attr("style","background:url("+this.innerBg+") repeat");
		$(".chapterContent").attr("style","color:#666");
		$(".contentAddBox").attr("style","background:url("+this.colorBg+") repeat;");
		$(".content").attr("style","border-color:#444");
		$(".contentNav").attr("style","background:url("+this.colorBg+") repeat;border-color:#444;");
		$(".rightNav").attr("style","background:url("+this.colorBg+") repeat;border-color:#444;");
  	}else{
  		$(".bookContentColor").attr("style","background:url("+this.innerBg+") repeat");
		$(".contentBox").attr("style","background:url("+this.innerBg+") repeat");
		$(".chapterContent").attr("style","color:rgb(68,68,68)");
		$(".content").attr("style","border-color:#e5e5e5");
		//$(".content").attr("style","background:url("+this.colorBg+") repeat;border-color:#e5e5e5;");
		$(".contentAddBox").attr("style","background:url("+this.colorBg+") repeat;");
		$(".contentNav").attr("style","background:url("+this.colorBg+") repeat;border-color:#e5e5e5;");
		$(".rightNav").attr("style","background:url("+this.colorBg+") repeat;border-color:#e5e5e5;");
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
      window.location.reload();
    }
  }*/

}
export class Color{
	constructor(
  		public colorString:string
  	) {
  		
  	}
}
