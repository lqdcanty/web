import { Component, OnInit ,HostListener,Input } from '@angular/core';
import { environment } from '../../../environments/environment';
/*import { Ranklist } from './ranklist';*/

@Component({
  selector: 'app-rank-list',
  templateUrl: './rank-list.component.html',
  styleUrls: ['./rank-list.component.css']
})

export class RankListComponent implements OnInit {
	 @Input() ranklists:any;
   @Input() ranklistName:string;
	public currindex=0;
	public mouseenterON(index:number){
	    this.currindex=index;
	}
	
  constructor() { }

  ngOnInit() {
  }

}

