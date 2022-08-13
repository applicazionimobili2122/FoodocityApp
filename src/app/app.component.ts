import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import {IonicAuthService} from './services/auth.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
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
    },
    {
      title: 'Health and Diet',
      url: '/health',
      icon: 'nutrition'
    }
  ];

  constructor(private storage: Storage,
              private authService: IonicAuthService,
              private navController: NavController) {
  }

  async ngOnInit() {
    //// If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
  }

  logout() {
    this.authService.signoutUser();
    this.navController.navigateRoot('/login');
  }
}
