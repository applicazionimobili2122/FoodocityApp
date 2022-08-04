import { Component, OnInit } from '@angular/core';
import {IonicAuthService} from '../../services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user = null;

  constructor(private ionicAuthService: IonicAuthService,
              private navController: NavController) { }

  ngOnInit() {
   /* this.ionicAuthService.getUserDetails(this.user.value)
      .then((response) => {
        console.log(response);
        this.user = response;
      }, error => {
        console.log(error);
      });*/
  }

  editProfile() {
    this.navController.navigateRoot('/edit-profile');
  }
}
