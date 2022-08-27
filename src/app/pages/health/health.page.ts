import {Component, OnInit} from '@angular/core';
import {PreferenceService} from '../../services/preferences.services';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-health',
  templateUrl: './health.page.html',
  styleUrls: ['./health.page.scss'],
})
export class HealthPage implements OnInit {

  dietSelect: FormControl = new FormControl([]);
  healthSelect: FormControl = new FormControl([]);
  message;

  constructor(private preferenceService: PreferenceService) {
  }

  ngOnInit() {
    const diets = [];
    this.preferenceService.loadPreferences().then((pref) => {
      pref[0].then((diet) => {
        // @ts-ignore
        diet.map((dieta) => diets.push(dieta.label));
        this.dietSelect.setValue(diets);
      });
    });

    const healths = [];
    this.preferenceService.loadPreferences().then((preferences) => {
      preferences[1].then((health) => {
        // @ts-ignore
        health.map((salute) => healths.push(salute.label));
        this.healthSelect.setValue(healths);
      });
    });
  }

  ionViewWillEnter() {
    this.message = document.getElementById('msg');
  }

  async loadPreferences() {
    return this.preferenceService.loadPreferences();
  }

  async savePreferences() {
    await this.preferenceService.savePreferences(this.dietSelect.value, this.healthSelect.value);

    this.message.style.display = 'block';
    this.message.innerHTML = 'Preferences updated successfully!';
    setTimeout(() => {
      this.message.style.display = 'none';
    } , 4000);
    return;
  }
}
