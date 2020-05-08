import {Component, OnInit} from '@angular/core';
import {NbIconConfig, NbMenuItem, NbSidebarService} from "@nebular/theme";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  disabledIconConfig: NbIconConfig = {icon: 'settings-2-outline', pack: 'eva'}
  isCompact = true;
  items: NbMenuItem[] = [

    {
      title: 'Profile',
      icon: 'person-outline',
    },
    {
      title: 'Messages',
      icon: 'email-outline',
    },
    {
      title: 'User Management',
      icon: {icon: 'checkmark-outline', pack: 'eva'},
    },
    {
      title: 'Logout',
      icon: 'unlock-outline',
    },
  ];

  constructor(private sidebarService: NbSidebarService) {
  }
  ngOnInit(): void {

  }

  toggleCompact() {
    this.sidebarService.toggle(true, 'left');

    this.isCompact = !this.isCompact

   // this.isCompact = !this.isCompact

  }


}
