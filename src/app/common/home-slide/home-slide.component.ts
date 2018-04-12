import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-home-slide',
  templateUrl: './home-slide.component.html',
  styleUrls: ['./home-slide.component.css']
})
export class HomeSlideComponent implements OnInit {
@Input() banners;
private currentPic:number=0;
  constructor() { 
  	setInterval(() => {
        let id = (this.currentPic + 1) % this.banners.length;
        this.currentPic = id;
      },3000)
  }
changebanner(id) {
     console.log(id)
    this.currentPic = id;
}
  ngOnInit() {
  	

  }

}

