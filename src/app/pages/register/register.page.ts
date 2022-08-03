import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AlertController, NavController} from '@ionic/angular';
import {UtenteService} from '../../services/utente.service';
import {IonicAuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

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

  registerFormModel: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private alertController: AlertController,
              private navController: NavController,
              private utenteService: UtenteService,
              private ionicAuthService: IonicAuthService) {
  }

  ngOnInit() {
    this.registerFormModel = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],

      passwords: this.formBuilder.group({
        password: ['', Validators.compose( [Validators.required, Validators.minLength(6)])],
        passwordConfirm: ['', Validators.compose( [Validators.required, Validators.minLength(6)])],
      }, {validator: this.validatePassword}),
    });
  }

  onRegister() {
    this.ionicAuthService.createUser(this.registerFormModel.value)
      .then((response) => {
        console.log(response);
        this.errorMsg = '';
        this.navController.navigateRoot('/recipes');
      }, error => {
        this.errorMsg = error.message;
        this.successMsg = '';
      });
  }

  validatePassword(control: AbstractControl): ValidationErrors | null {
    if (control && control.get('password') && control.get('passwordConfirm')) {
      const password = control.get('password').value;
      const passwordConfirm = control.get('passwordConfirm').value;
      if (password !== passwordConfirm) {
        control.get('passwordConfirm').setErrors({passMismatch: true});
      }
    }
    return null;
  }

  redirectLogin() {
    this.navController.navigateRoot('/login');
  }
}
