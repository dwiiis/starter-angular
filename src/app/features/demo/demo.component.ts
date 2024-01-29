import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Breadcrumb } from 'src/app/core/models/interfaces/breadcrumb';
import { Users } from 'src/app/core/models/interfaces/users';
import { FilterService } from 'src/app/core/services/filter.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  templateUrl: './demo.component.html',
})
export class DemoComponent implements OnInit {
  @ViewChild('panelFilter') overlayPanel: OverlayPanel;

  breadcrumbs: Breadcrumb;
  users: Users[];
  selectedUser: Users;
  loadingUsers: boolean = true;
  totalRecords = 0;
  itemsBtn: MenuItem[] | undefined;
  dataFiltered: string[] = [];
  initialFiltered: any;
  searchValue = new FormControl('');
  eventTable: LazyLoadEvent;

  constructor(private userSv: UserService, private datePipe: DatePipe, private globalSv: GlobalService, private filterSv: FilterService, private router: Router) {
    this.searchValue.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe((value) => {
      this.eventTable.first = 0;
      if (this.globalSv.includesNull(value.trim())) {
        this.filterSv.removeFilter(['search'], this.eventTable);
      } else {
        this.filterSv.setFilter('search', value, this.eventTable);
      }

      this.loadData(this.eventTable);
    });
  }

  ngOnInit() {
    this.breadcrumbs = {
      list: [
        {
          label: 'Dashboard',
          link: '/',
        },
        {
          label: 'Demo',
          link: '/demo',
        },
      ],
    };
    this.initMenuBtn();
  }

  initMenuBtn() {
    this.itemsBtn = [
      {
        label: 'Detail',
        icon: 'pi pi-refresh',
        command: (ev: any) => {
          console.log('EV: ', this.selectedUser);

          this.goToDetail(this.selectedUser.id);
        },
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
        command: () => {
          console.log('DELETE CLICKED');
        },
      },
    ];
  }

  loadData(event?: LazyLoadEvent) {
    this.eventTable = event;
    this.loadingUsers = true;

    setTimeout(() => {
      this.userSv.getUsers(event).subscribe({
        next: (data) => {
          this.users = data.data;
          this.totalRecords = data.total;
          this.loadingUsers = false;
        },
      });
    }, 1000);
  }

  closeOverlay() {
    this.overlayPanel.hide();
  }

  onFilterData(e: any) {
    this.initialFiltered = e;

    if (!this.globalSv.includesNull(e.username)) {
      this.dataFiltered = this.dataFiltered.filter((item) => !item.includes('Username'));
      this.dataFiltered.push(`Username: ${e.username}`);
      this.filterSv.setFilter('username', e.username, this.eventTable);
    }
    if (!this.globalSv.includesNull(e.pic)) {
      this.dataFiltered = this.dataFiltered.filter((item) => !item.includes('PIC'));
      this.dataFiltered.push(`PIC: ${e.pic}`);
      this.filterSv.setFilter('pic', e.pic, this.eventTable);
    }
    if (!this.globalSv.includesNull(e.dateFrom) && !this.globalSv.includesNull(e.dateFrom)) {
      const dateFrom: Date = new Date(e.dateFrom);
      const dateTo: Date = new Date(e.dateTo);
      this.dataFiltered = this.dataFiltered.filter((item) => !item.includes('Date'));
      this.dataFiltered.push(`Date: ${this.datePipe.transform(dateFrom, 'MM/dd/yyyy')} - ${this.datePipe.transform(dateTo, 'MM/dd/yyyy')}`);
      this.filterSv.setFilter('dateFrom', dateFrom, this.eventTable);
      this.filterSv.setFilter('dateFrom', dateTo, this.eventTable);
    }

    this.loadData(this.eventTable);
  }

  onResetFilter() {
    this.dataFiltered = [];
    this.initialFiltered = {};
  }

  onRemoveChip(item: string) {
    this.dataFiltered = this.dataFiltered.filter((x) => !x.includes(item));
    if (item.includes('PIC')) {
      this.initialFiltered.pic = '';
      this.filterSv.removeFilter(['pic'], this.eventTable);
    }
    if (item.includes('Username')) {
      this.initialFiltered.username = '';
      this.filterSv.removeFilter(['username'], this.eventTable);
    }
    if (item.includes('Date')) {
      this.initialFiltered.dateFrom = undefined;
      this.initialFiltered.dateTo = undefined;
      this.filterSv.removeFilter(['dateFrom', 'dateTo'], this.eventTable);
    }

    this.loadData(this.eventTable);
  }

  onShowMenu(ev: any, menu: any, data: any) {
    this.selectedUser = data;
    return menu.toggle(ev);
  }

  removeFilter(names: string[]) {
    for (let name in names) {
      this.eventTable.filters[name] = null;
    }
  }

  goToAdd() {
    this.router.navigate(['/demo/add']);
  }

  goToDetail(id) {
    const queryParams = {
      id: id,
    };
    this.router.navigate(['/demo/detail'], { queryParams: queryParams });
  }
}
