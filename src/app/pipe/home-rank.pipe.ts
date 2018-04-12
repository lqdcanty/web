import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'homeRank'
})
export class HomeRankPipe implements PipeTransform {

   transform(list: any[], type: string,inputNumber : number): any {
  	if(!type){
  		return list;
  	}
    return list.filter(item=>{
    	let hometypeValue = item[type];
    	return hometypeValue==inputNumber;
    });
  }

}
