import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, NavController} from '@ionic/angular';
import {UtenteService} from '../../services/utente.service';
import {IonicAuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  successMsg = '';
  errorMsg = '';
  // eslint-disable-next-line @typescript-eslint/naming-convention
  error_msg = {
    email: [
      {
        type: 'required',
        message: 'Provide email.'
      },
      {
        type: 'pattern',
        message: 'Email is not valid.'
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
    ]
  };

  loginFormModel: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private alertController: AlertController,
              private navController: NavController,
              private utenteService: UtenteService,
              private ionicAuthService: IonicAuthService) {
  }

  ngOnInit() {
    this.loginFormModel = this.formBuilder.group({
      email: ['user13@example.com', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      password: ['password', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])]
    });
  }

  onLogin() {
    this.ionicAuthService.signinUser(this.loginFormModel.value)
      .then((response) => {
        this.errorMsg = '';
        this.navController.navigateRoot('/recipes');
      }, error => {
        this.errorMsg = error.message;
        this.successMsg = '';
      });
  }

  redirectRegister() {
    this.navController.navigateRoot('/register');
  }
}

