import { Component, OnInit } from '@angular/core';
import {IonicAuthService} from '../../services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {InfiniteScrollCustomEvent, NavController} from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
user = null;

  constructor(private ionicAuthService: IonicAuthService,
              private navController: NavController) { }

  ionViewWillEnter() {
    this.user = null;
    this.loadUser();
  }

  async loadUser() {
  this.ionicAuthService.userDetails().then(
    (response) => {
      this.user = response;
    }
  );
  }

  editProfile() {
    this.navController.navigateRoot('/edit-profile');
  }
}
