import { Component, OnInit ,HostListener,Input } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-homerank',
  templateUrl: './homerank.component.html',
  styleUrls: ['./homerank.component.css']
})
export class HomerankComponent implements OnInit {

 @Input() ranklists:Array<any>;
 @Input() ranklistName:string;
 @Input() ranklistId:number;
	public currindex=0;
	public mouseenterON(index:number){
	    this.currindex=index;
	}
	
  constructor() { }

  ngOnInit() {
  }

}

