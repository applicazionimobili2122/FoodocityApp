import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AlertController, NavController} from '@ionic/angular';
import {UtenteService} from '../../services/utente.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  successMsg = '';
  errorMsg = '';
  // eslint-disable-next-line @typescript-eslint/naming-convention
  error_msg = {

    oldPassword: [
      {
        type: 'required',
        message: 'Old password is required.'
      }
    ],
    password: [
      {
        type: 'required',
        message: 'Password is required.'
      },
      {
        type: 'minlength',
        message: 'Password length should be 6 characters long.'
      }
    ],
    passwordConfirm: [
      {
        type: 'passMismatch',
        message: 'Password mismatch.'
      },
      {
        type: 'minlength',
        message: 'Password length should be 6 characters long.'
      },
      {
        type: 'required',
        message: 'Password is required.'
      }
    ]
  };


  editProfileFormModel: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private alertController: AlertController,
              private navController: NavController,
              private utenteService: UtenteService) { }

  ngOnInit() {
  }

/*  onEditProfile() {
    this.utenteService.updateProfilo(this.editProfileFormModel.value)
      .then((response) => {
        console.log(response);
        this.errorMsg = '';
        this.navController.navigateRoot('/profile');
      }, error => {
        this.errorMsg = error.message;
        this.successMsg = '';
      });
  }*/

}
