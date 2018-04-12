import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})

export class RankComponent implements OnInit {

	
	  constructor() { }
	 	
	  ngOnInit() {
	  	$(window).unbind("scroll");
	  }
}
