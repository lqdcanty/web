import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from "@angular/router";
import { environment } from '../../../environments/environment';
import { Headers, Http } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-type-nav',
  templateUrl: './type-nav.component.html',
  styleUrls: ['./type-nav.component.css']
})
export class TypeNavComponent implements OnInit {
	private typeNavs:Array<TypeNav>;
  //一定要放在当前的这个类里面。放在export class TypeNav就会报错
  private currNav=10;
  private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});
  ranksLists:Array<any>=[];
  private tipLayerBoolean:boolean;
  private tipMessage:string;
  recevicetip(msg:boolean):void{
      this.tipLayerBoolean=msg;
    }
  
  	constructor(private router: Router,private http:Http,private cookieService:CookieService) { 

  	}

	ngOnInit() {
		/*this.typeNavs=[
			//new TypeNav(10,"全部榜单","../../assets/images/all.png","../../assets/images/allA.png"),
			new TypeNav(11,"新书榜","../../assets/images/newBook.png","../../assets/images/newBookA.png"),
			new TypeNav(12,"热销榜","../../assets/images/hot.png","../../assets/images/hotA.png"),
			new TypeNav(13,"推荐榜","../../assets/images/recommend.png","../../assets/images/recommendA.png"),
			new TypeNav(14,"更新榜","../../assets/images/updata.png","../../assets/images/updataA.png"),
			new TypeNav(15,"点击榜","../../assets/images/click.png","../../assets/images/clickA.png"),
			new TypeNav(16,"畅销榜","../../assets/images/Sellwell.png","../../assets/images/SellwellA.png"),
			new TypeNav(17,"收藏榜","../../assets/images/collect.png","../../assets/images/collectA.png")
		];*/
    let body="";
     this.http.post(environment.apiBase+"/pc/api/ranking",body,{headers:this.header})
    .map(res=>res.json())
    .subscribe((data)=>{
      if(data.httpCode){
        this.ranksLists=data.data;
        console.log(typeof this.ranksLists);
      }else{
          this.tipLayerBoolean=true;
          this.tipMessage=data.msg;
          setTimeout(function(){
            this.tipLayerBoolean=false;
          },1500)
      }
    })
	}
  bookType(typeNav : TypeNav) {
    console.log(typeNav);
    console.log(11)
    this.currNav = typeNav.rankingId;
  }
}
  //首先要有一个对象来封装我的nav信息
export class TypeNav {
  	//构建函数可以申明nav所拥有的属性
    
  	constructor(
  		public rankingId:number,
  		public rankingName:string,
  		public img:string,
  		public imgOn:string
  	) {
  		
  	}

   
}


