import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, NavController} from '@ionic/angular';
import {Account, UtenteService} from '../../services/utente.service';
import {Utente} from '../../model/utente.model';
import {HttpErrorResponse} from '@angular/common/http';
import {FirebaseAuthentication} from '@awesome-cordova-plugins/firebase-authentication/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private loginFormModel: FormGroup;
  private loginTitle: string;
  private loginSubTitle: string;

  constructor(private formBuilder: FormBuilder,
              private alertController: AlertController,
              private navController: NavController,
              private utenteService: UtenteService,
              private firebaseAuthentication: FirebaseAuthentication) {
  }

  ngOnInit() {
    this.loginFormModel = this.formBuilder.group({
      email: ['email', Validators.compose([
        Validators.required
      ])],
      password: ['password', Validators.compose([
        Validators.required
      ])]
    });
  }

  onLogin() {
    this.firebaseAuthentication.signInWithEmailAndPassword(this.loginFormModel.value.email, this.loginFormModel.value.password).then(() => {
      this.navController.navigateRoot('/recipes');
    });
  }

  async showLoginError() {
    const alert = await this.alertController.create({
      header: this.loginTitle,
      message: this.loginSubTitle,
      buttons: ['OK']
    });

    await alert.present();
  }


}

