import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'},
    {
      title: 'Profile',
      url: '/profile',
      icon: 'person'}
  ];

  constructor(private storage: Storage) {
  }
  async ngOnInit() {
    //// If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
  }
}
