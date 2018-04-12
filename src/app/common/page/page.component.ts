import { Component,Input, Output,EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent {
 @Input('pageParams') pageParams;// 父组件向子组件传值
 @Output() changeCurPage:EventEmitter<Number> = new EventEmitter;// 子组件向父组件广播事件，触发改变当前页面的事件
 
 public pageList :Array<number>= [1, 2, 3, 4, 5];
 public totalPage:number = 5;
 public inputValue:number;
 
 constructor() {
 
 }
 
 getPageList(pageParams){
  /*分页设置*/
  let pageList=[];
  if (pageParams.totalPage <= 5) {//如果总的页码数小于5（前五页），那么直接放进数组里显示
   for (let i = 0; i < pageParams.totalPage; i++) {
    pageList.push({
     pageNo: i + 1
    });
   }
  } else if (pageParams.totalPage - pageParams.curPage < 5 && pageParams.curPage > 4) {//如果总的页码数减去当前页码数小于5（到达最后5页），那么直接计算出来显示
   pageList = [
    {
     pageNo: pageParams.curPage - 4
    }, {
     pageNo: pageParams.curPage - 3
    }, {
     pageNo: pageParams.curPage - 2
    }, {
     pageNo: pageParams.curPage - 1
    }, {
     pageNo: pageParams.curPage
    }
   ];
  } else {//在中间的页码数
   let cur = Math.floor((pageParams.curPage - 1) / 5) * 5 + 1;
   pageList = [
    {
     pageNo: cur
    }, {
     pageNo: cur + 1
    }, {
     pageNo: cur + 2
    }, {
     pageNo: cur + 3
    }, {
     pageNo: cur + 4
    },
   ];
  }
  return pageList;
 }
 changePage(pageNo) {
  console.log("组件点击了")
  console.log('修改组件', pageNo);
  this.pageParams.curPage = pageNo;
  this.changeCurPage.emit(this.pageParams.curPage);
  //this.changeCurPage.emit(pageNo);
 }
 changePageOut(totalPage) {
  let pageNo=$("#inputValue").val();
  if(pageNo<totalPage||pageNo==totalPage){
    console.log('修改页码2', pageNo);
    this.pageParams.curPage = pageNo;
    this.changeCurPage.emit(this.pageParams.curPage);
  }
 }


}
