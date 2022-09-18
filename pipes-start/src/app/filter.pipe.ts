import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter",
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filter: string, propName: string): any {
    if (value.length === 0 || filter === "") {
      return value;
    }
    const arrayResult = [];
    for (let item of value) {
      if (item[propName] === filter) {
        arrayResult.push(item);
      }
    }
    return arrayResult;
  }
}
