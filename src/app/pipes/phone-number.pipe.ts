import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "phoneNumber"
})
export class PhoneNumberPipe implements PipeTransform {

  transform(phoneNumber: string): string {
    const result: string[] = [];
    [...phoneNumber].forEach((digit, index) => {
      result.push(digit);
      if (index % 3 === 0 && index !== 0) {
        result.push(" ");
      }
    });
    return result.join("");
  }

}
