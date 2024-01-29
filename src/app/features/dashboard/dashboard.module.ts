import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { DividerModule } from 'primeng/divider';
import { ChipModule } from 'primeng/chip';

@NgModule({
  imports: [CommonModule, FormsModule, ChartModule, MenuModule, TableModule, StyleClassModule, PanelMenuModule, ButtonModule, DashboardsRoutingModule, DividerModule, ChipModule],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
