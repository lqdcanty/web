import { Injectable } from '@angular/core';

@Injectable()
export class SettimeService{
//private  userInfo = new UserInfo();
private timeString;
private timeObj;
private timeData;
private newData;
	constructor(){
		//var data=new Data();
		this.timeObj=new Date();
		this.timeString=this.timeObj.getTime();
		this.timeData=this.timeObj.toLocaleString();
		setInterval(()=>{
			this.timeString+=15000;
		},15000);

		
	}
	getTimeFun():void{
		var newTimeObj=new Date();
		newTimeObj.setTime(this.timeString);
		this.newData=newTimeObj.toLocaleString();
		return this.newData;
	}
}
