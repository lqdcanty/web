import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'homeType'
})
export class HomeTypePipe implements PipeTransform {

  transform(list: any[], type: string,inputNumber : string): any {
  	if(!type){
  		return list;
  	}
    return list.filter(item=>{
    	let hometypeValue = item[type];
    	return hometypeValue==inputNumber;
    });
  }

}
