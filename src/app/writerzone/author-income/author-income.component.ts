import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/forkJoin';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-author-income',
  templateUrl: './author-income.component.html',
  styleUrls: ['./author-income.component.css']
})
export class AuthorIncomeComponent implements OnInit {

private userId:string;
public totalNum = 0; // 总数据条数
public pageSize = 10;// 每页数据条数
public totalPage = 0;// 总页数
public curPage = 1;// 当前页码
private tipLayerBoolean:boolean;
private tipMessage:string;
private loginBoolean:boolean;
private comeList:Array<any>;
private queryTypeBoolean:boolean=true;
private authorCome:FormGroup;
private month:string='';
private bookName:string='';
private queryType:string='month';
private monthNumber:string;
private remuneration:number;
private header = new Headers({'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'});

  constructor(private cookieService: CookieService,private router :Router,
    private http:Http,private fb: FormBuilder) { 
  	this.createForm();
  }
  recevicetip(msg:boolean){
    this.tipLayerBoolean=msg;
  }
  ngOnInit() {
    $(window).unbind("scroll");
    this.userId=this.getCookie("userId");
    var monthTime=new Date();
    console.log(monthTime.getFullYear(),monthTime.getMonth())
    this.month=monthTime.getFullYear() +'-'+ (monthTime.getMonth()+1); 
    this.getData();
    this.free();
  }
  free(){
    let userId=this.getCookie("userId");
    //let userId="1183";
    let body="userId="+userId;
    this.http.post(environment.apiBase+'/pc/api/author/remuneration',body,{headers:this.header})
    .map(res=>res.json()).subscribe(data=>{
        if(data.httpCode==200){
            this.remuneration=data.data.remuneration;
            this.monthNumber=data.data.month;
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
  typeChange(){
  	var queryType=this.authorCome.get("queryType").value;
    if(queryType=='month'){
      this.queryTypeBoolean=true;
    }else{
      this.queryTypeBoolean=false;
    }
  }
  createForm(){
  	this.authorCome = this.fb.group({
        queryType:['', [Validators.required]],
        month:[''],
        bookName:['']
    });
  }
  queryButton(){
  	if(this.authorCome.valid){
      this.curPage=1;
  		let work=this.authorCome.value;
  		console.log(work);
      if(work.queryType=='book'){
        work.month='';
      }else if(work.queryType=='month'){
        work.bookName='';
      }
  		let body="userId="+this.userId+"&pageNum="+this.curPage+"&pageSize="+this.pageSize+"&queryType="+work.queryType+"&bookName="+work.bookName+"&month="+work.month;
  		console.log(body,"作家收入1");
      
  		this.http.post(environment.apiBase+"/pc/api/author/income",body,{headers:this.header})
       .map(res=>res.json()).subscribe(data=>{
       	    if(data.httpCode==200){
	      		this.comeList=data.data.list;
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
  	}
  }
  /*
  * 默认展示；
  */
  getData(){
  	var queryType=this.queryType;
    let body="userId="+this.userId+"&pageNum="+this.curPage+"&pageSize="+this.pageSize+"&queryType="+queryType+"&bookName="+"&month="+this.month;
    console.log(body,"作家专区2")
    this.http.post(environment.apiBase+"/pc/api/author/income",body,{headers:this.header})
    .map(res=>res.json()).subscribe(data=>{
      if(data.httpCode==200){
      	this.comeList=data.data.list;
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
  }
  getPageData(pageNo) {
  this.curPage = pageNo;
  console.log('触发页面', pageNo);
  let work=this.authorCome.value;
  console.log(work);
  if(work.queryType=='book'){
    work.month='';
  }else if(work.queryType=='month'){
    work.bookName='';
  }
  let body="userId="+this.userId+"&pageNum="+this.curPage+"&pageSize="+this.pageSize+"&queryType="+work.queryType+"&bookName="+work.bookName+"&month="+work.month;
   this.http.post(environment.apiBase+"/pc/api/author/income",body,{headers:this.header})
    //this.http.get("http://localhost:4200/assets/data/authorWorkList.json")
    .map(res=>res.json())
    .subscribe((data)=>{
      if(data.httpCode==200){
        this.comeList=data.data.list;
        //this.authorWorkList=data.data.list;
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

  timeClike(){
    laydate({
        format: 'YYYY-MM',
        elem: '#test',
        choose: function(date){
          
        }
      });
  }
}

/*laydate.render({
    elem: '#test3'
    ,type: 'month'
  });*/