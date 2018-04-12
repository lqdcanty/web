import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-tip-layer',
  templateUrl: './tip-layer.component.html',
  styleUrls: ['./tip-layer.component.css']
})
export class TipLayerComponent implements OnInit {
	@Input() tipMessage;
	@Output() outertip=new EventEmitter<boolean>();
	sendToParent(){
		this.outertip.emit(false);
	}
  constructor() { }

  ngOnInit() {
  }

}
