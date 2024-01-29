import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DemoComponent } from './demo.component';
import { DemoRoutingModule } from './demo-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChipModule } from 'primeng/chip';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DemoFilterComponent } from './demo-filter/demo-filter.component';
import { DemoAddComponent } from './demo-add/demo-add.component';
import { DemoDetailComponent } from './demo-detail/demo-detail.component';

@NgModule({
  declarations: [DemoComponent, DemoFilterComponent, DemoAddComponent, DemoDetailComponent],
  imports: [
    CommonModule,
    DemoRoutingModule,
    BreadcrumbModule,
    SharedModule,
    TableModule,
    PaginatorModule,
    AvatarModule,
    ButtonModule,
    MenuModule,
    InputTextModule,
    OverlayPanelModule,
    CalendarModule,
    DividerModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
    ChipModule,
    DropdownModule,
    InputTextareaModule,
    ContextMenuModule,
  ],
  exports: [DemoFilterComponent],
  providers: [DatePipe],
})
export class DemoModule {}
