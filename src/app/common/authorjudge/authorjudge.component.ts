import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ActivatedRoute,Params,Router } from '@angular/router';

@Component({
  selector: 'app-authorjudge',
  templateUrl: './authorjudge.component.html',
  styleUrls: ['./authorjudge.component.css']
})
export class AuthorjudgeComponent implements OnInit {
	@Output() outerunauthor=new EventEmitter<boolean>();
  @Input() contentAuthor;
  @Input() tempUrl;
  @Input() btn;
	sendToParent(){
		this.outerunauthor.emit(false);
	}
  constructor(private router:Router) { }
	
  ngOnInit() {
  }
  tempUrlClick(){
    this.router.navigate([this.tempUrl])
  }

}
