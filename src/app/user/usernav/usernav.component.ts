import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { Headers, Http } from '@angular/http';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {
private tipLayerBoolean:boolean;
private tipMessage:string;
private loginLayer=false;
private loginBoolean:boolean=false;
private authorzoneBoolean:boolean=false;
private authorzoneLayerBoolean:boolean=false;
private contentAuthorT:string;
private userCode:string;
private imgUrl:string;


 private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});
recevicetip(msg:boolean):void{
  this.tipLayerBoolean=msg;
}	
reviceLogin(msg:boolean){
  this.loginBoolean=msg;
}
	
  constructor(private router: Router,private cookieService: CookieService,
    private http:Http) { }

  reviceunauthor(msg:boolean){
    this.authorzoneLayerBoolean=msg;
  }
 

  ngOnInit() {
    this.userCode=this.getCookie("userCode");
    this.imgUrl=this.getCookie("imgUrl")&&this.getCookie("imgUrl")!=undefined?this.getCookie("imgUrl"):"../../../assets/images/200.png"
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
  getCookie(key:string){
    return this.cookieService.get(key);
  }

}
