import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import {SplashScreen} from '@awesome-cordova-plugins/splash-screen/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  public appPages = [
    {
      title: 'Home',
      url: '/recipes',
      icon: 'home'
    },
    {
      title: 'Favourite Recipes',
      url: '/favourites',
      icon: 'list'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'person'
    }
  ];

  constructor(private storage: Storage,
              private splashScreen: SplashScreen) {
  }

  async ngOnInit() {
    //// If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
  }
}
