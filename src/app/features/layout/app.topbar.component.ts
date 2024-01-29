import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
  items!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  itemsBtn: MenuItem[] | undefined;

  constructor(
    public layoutService: LayoutService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.itemsBtn = [
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
        command: (e: any) => {
          this.signOutConfirm(e);
        },
      },
    ];
  }

  set theme(val: string) {
    this.layoutService.config.update((config) => ({
      ...config,
      theme: val,
    }));
  }
  get theme(): string {
    return this.layoutService.config().theme;
  }

  set colorScheme(val: string) {
    this.layoutService.config.update((config) => ({
      ...config,
      colorScheme: val,
    }));
  }
  get colorScheme(): string {
    return this.layoutService.config().colorScheme;
  }

  changeTheme(theme: string, colorScheme: string) {
    this.theme = theme;
    this.colorScheme = colorScheme;
  }

  signOut() {
    this.tokenStorageService.signOut();
    this.router.navigate(['/auth/login']);
  }

  signOutConfirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to signout?',
      header: 'Signout',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Logout Success' });
        this.tokenStorageService.signOut();
        this.router.navigate(['/auth/login']);
      },
      reject: () => {},
    });
  }
}
