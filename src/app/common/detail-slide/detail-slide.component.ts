import { Component, OnInit,Input,AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-detail-slide',
  templateUrl: './detail-slide.component.html',
  styleUrls: ['./detail-slide.component.css']
})
export class DetailSlideComponent implements OnInit {
@Input() lists;
@Input() listsLength;
private currentIndex:number=0;
private flage:number=0;
private listsNew:Array<any>;
private arrlength:number=0;
  constructor() {


  }
  

  ngOnInit() {
    this.listsNew=this.lists;
    setInterval(() => {
          var newArr=[];
          let id = (this.currentIndex+1) % this.lists.length;
          this.currentIndex=id;
          if(this.listsLength<=4){
            this.listsNew=this.lists;
          }else if(this.listsLength>4&&this.currentIndex<this.listsLength-3){
            this.flage=(this.currentIndex+3)%this.lists.length;
            for(var i=this.currentIndex;i<=this.flage;i++){
              newArr.push(this.lists[i]);
              this.listsNew=newArr;
            }
          }else if(this.listsLength>4&&this.currentIndex>this.listsLength-4){
            //this.currentIndex=this.listsLength-3;
            this.flage=(this.currentIndex+4); 
            for(var i=this.currentIndex;i<this.listsLength;i++){
              newArr.push(this.lists[i]);
            }
            if(newArr.length<=4){
              for(var j=0;j<6-newArr.length;j++){
                console.log(6-newArr.length,"chag")
                newArr.push(this.lists[j])
              }
              this.listsNew=newArr;
            }
            
          }
      },3500)
  }

}
