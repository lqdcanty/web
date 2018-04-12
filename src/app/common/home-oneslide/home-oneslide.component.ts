import { Component, OnInit ,Input,OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home-oneslide',
  templateUrl: './home-oneslide.component.html',
  styleUrls: ['./home-oneslide.component.css']
})
export class HomeOneslideComponent implements OnInit {
private currentIndex:number=0
private setTime:any;
private timeflage:boolean=true;
@Input() homeSlide;
  constructor() { 
       this.setTime=setInterval(() => {
        let id = (this.currentIndex + 1) % this.homeSlide.length;
        this.currentIndex = id;
      },5000)
    
  }
  changeSlide(i){
  	 console.log(i)
    this.currentIndex = i;
    clearInterval(this.setTime);
  }
  changeSlideLeave(i){
      this.setTime=setInterval(() => {
        let id = (this.currentIndex + 1) % this.homeSlide.length;
        this.currentIndex = id;
      },5000)
    
  }
  //主要是清除定时
  ngOnDestroy(){
    clearInterval(this.setTime);
  }


  ngOnInit() {
    
  }

}

