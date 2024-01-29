import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcumbComponent } from './breadcumb/breadcumb.component';

@NgModule({
  declarations: [BreadcumbComponent],
  imports: [CommonModule],
  exports: [BreadcumbComponent],
})
export class SharedModule {}
