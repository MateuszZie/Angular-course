import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "shorted" })
export class ShortenPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    if (value.length > 11) {
      return value.substr(0, 10) + " ...";
    } else {
      return value.substr(0, 10);
    }
  }
}
