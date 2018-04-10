import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { SuperTabsController } from 'ionic2-super-tabs';
import { CartPage } from '../cart/cart';
import { ProfilePage } from '../profile/profile';
import { ProfileProvider } from '../../providers/profile/profile';
import { Storage } from '@ionic/storage';

declare var window;

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CartPage;
  tab3Root = ProfilePage;
  tab4Root = HomePage;
  storeCredit;

  pageTitle = "Home";

  constructor(private superTabsCtrl: SuperTabsController,
    private storage: Storage,
    private profileService: ProfileProvider) {
  }

  ngAfterViewInit() {
    this.storage.get('token').then(result => {
      this.profileService.retrieveProfile(result).subscribe(data => {
        this.storeCredit = data.result.store_credit;
      })
    })
    // must wait for AfterViewInit if you want to modify the tabs instantly
    // this.superTabsCtrl.setBadge('homeTab', 5);
  }

  hideToolbar() {
    this.superTabsCtrl.showToolbar(false);
  }

  showToolbar() {
    this.superTabsCtrl.showToolbar(true);
  }

  onTabSelect(ev: any) {
    this.storage.get('token').then(result => {
      this.profileService.retrieveProfile(result).subscribe(data => {
        this.storeCredit = data.result.store_credit;
      })

    })

    console.log('Tab selected', 'Index: ' + ev.index, 'Unique ID: ' + ev.id);
    // if (ev.index == 0) {
    //   this.pageTitle = "Home"
    // }
    // else if (ev.index == 1) {
    //   this.pageTitle = "Cart"
    // }
    // else {
    //   this.pageTitle = "Profile"
    // }
    if (ev.index == 3) {
      window.plugins.launcher.launch({ packageName: 'com.app.vivobee' }, success => {

      }, err => {
        window.location.href = "https://play.google.com/store/apps/details?id=com.app.vivobee";
      });
    }
  }
}
