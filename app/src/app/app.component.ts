import { Sim } from '@ionic-native/sim';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { Network } from '@ionic-native/network';
import { Facebook } from '@ionic-native/facebook';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    network: Network,
    sim: Sim,
    fb: Facebook,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      splashScreen.hide();

      fb.getLoginStatus().then(result => {
        console.log(JSON.stringify(result))
        if (result.status == "connected") {
          this.rootPage = TabsPage;
          // this.rootPage = LoginPage;
        }
        else {
          this.rootPage = LoginPage;
        }
      })



      // // watch network for a disconnect
      // let disconnectSubscription = network.onDisconnect().subscribe(() => {
      //   console.log('network was disconnected :-(');
      // });

      // // stop disconnect watch
      // disconnectSubscription.unsubscribe();

      // // watch network for a connection
      // let connectSubscription = network.onConnect().subscribe(() => {
      //   console.log('network connected!');
      //   // We just got a connection but we need to wait briefly
      //   // before we determine the connection type. Might need to wait.
      //   // prior to doing any api requests as well.
      //   setTimeout(() => {
      //     if (network.type === 'wifi') {
      //       console.log('we got a wifi connection, woohoo!');
      //     }
      //   }, 3000);
      // });

      // sim.hasReadPermission().then(
      //   (info) => console.log('Has permission:', info)
      // );

      // sim.getSimInfo().then(result => {
      //   console.log(JSON.stringify(result))
      //   // storage.set('phoneNumber', result.cards[0].phoneNumber)
      //   // platform.exitApp()
      // })

      // sim.hasReadPermission().then(
      //   (info) => console.log('Has permission:', info)

      // );
    });
  }
}
