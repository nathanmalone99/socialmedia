import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestampToDate'
})
export class TimestampToDatePipe implements PipeTransform {
  transform(timestamp: any): string {
    if (timestamp && timestamp.seconds && timestamp.nanoseconds) {
      const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
      const date = new Date(milliseconds);
      return date.toDateString(); // Adjust the format as needed
    } else {
      return 'Invalid Timestamp';
    }
  }
}