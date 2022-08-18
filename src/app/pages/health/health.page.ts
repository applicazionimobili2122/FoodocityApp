import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
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

  ionViewWillEnter() {
    const diets = [];
    this.preferenceService.loadPreferences().then((preferences) => {
      preferences[0].then((diet) => {
        diet.map((dieta) =>  // @ts-ignore
          diets.push(dieta.label));
      });
    });

    const healths = [];
    this.preferenceService.loadPreferences().then((preferences) => {
      preferences[1].then((health) => {
        health.map((salute) =>  // @ts-ignore
          healths.push(salute.label));
      });
    });

    this.dietSelect.setValue(diets);
    this.healthSelect.setValue(healths);

    this.message = document.getElementById('msg');
  }

  ngOnInit() {
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
