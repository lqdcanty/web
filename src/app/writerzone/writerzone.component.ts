import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-writerzone',
  templateUrl: './writerzone.component.html',
  styleUrls: ['./writerzone.component.css']
})
export class WriterzoneComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	$(window).unbind("scroll");
  }
}
