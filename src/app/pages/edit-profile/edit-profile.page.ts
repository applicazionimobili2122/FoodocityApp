import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AlertController, NavController} from '@ionic/angular';
import {UtenteService} from '../../services/utente.service';
import {IonicAuthService} from '../../services/auth.service';

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
      },
      {
        type: 'wrongPassword',
        message: 'Old password is incorrect.'
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
 user = null;

  constructor(private formBuilder: FormBuilder,
              private alertController: AlertController,
              private navController: NavController,
              private utenteService: UtenteService,
              private ionicAuthService: IonicAuthService) { }



  ngOnInit() {
    this.editProfileFormModel = this.formBuilder.group({
      passwords: this.formBuilder.group({
        oldPassword: ['', [Validators.required]],
        password: ['', Validators.compose( [Validators.required, Validators.minLength(6)])],
        passwordConfirm: ['', Validators.compose( [Validators.required, Validators.minLength(6)])],
      }, {validator: this.validatePassword}),
    });
  }


  validatePassword(control: AbstractControl): ValidationErrors | null {
   /* this.ionicAuthService.userDetails().then(
      (response) => {
        this.user = response;
      }
    );*/

    //check sulla vecchia password
     /* if (control && control.get('oldPassword')) {
        const oldPassword = control.get('oldPassword').value;
        if (oldPassword !==this.currentPassword) {
          control.get('oldPassword').setErrors({wrongPassword: true});
        }
      }*/

    //check sul matching tra nuova password e conferma nuova password
    if (control && control.get('password') && control.get('passwordConfirm')) {
      const password = control.get('password').value;
      const passwordConfirm = control.get('passwordConfirm').value;
      if (password !== passwordConfirm) {
        control.get('passwordConfirm').setErrors({passMismatch: true});
      }
    }
    return null;
  }

  /*checkOldPassword(control: AbstractControl): ValidationErrors | null {
    this.ionicAuthService.userDetails().then(
      (response) => {
        this.user = response;
      }
    );

      if (control && control.get('oldPassword')) {
            const oldPassword = control.get('oldPassword').value;
            const currentPassword =  this.user.password ;
            if (oldPassword !== currentPassword) {
              control.get('oldPassword').setErrors({wrongPassword: true});
            }
          }
          return null;

        }*/


 onEditPassword() {
   this.ionicAuthService.userDetails().then(
     (response) => {
       this.user= response.updatePassword(this.editProfileFormModel.value.passwords.password);
       this.errorMsg = '';
       this.navController.navigateRoot('/profile');
     }, error => {
       this.errorMsg = error.message;
       this.successMsg = '';
     });
  }

}
