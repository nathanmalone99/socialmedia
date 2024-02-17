import { NgModule } from '@angular/core';
import { TimestampToDatePipe } from './timestamp-to-date.pipe';

@NgModule({
  declarations: [
    TimestampToDatePipe,
  ],
  exports: [
    TimestampToDatePipe, 
  ],
})
export class TimestampToDateModule { }