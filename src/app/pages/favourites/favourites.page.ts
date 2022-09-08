import {Component, OnInit,ViewChild} from '@angular/core';
import {RecipeService} from '../../services/recipes.service';
import {IonSelect, LoadingController} from '@ionic/angular';
import {PreferenceService} from '../../services/preferences.services';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {
  @ViewChild('dietTypes') dietTypes: IonSelect;
  @ViewChild('healthTypes') healthTypes: IonSelect;
  @ViewChild('mealTypes') mealTypes: IonSelect;
  @ViewChild('cuisineTypes') cuisineTypes: IonSelect;
  @ViewChild('dishTypes') dishTypes: IonSelect;
  searchTerm = '';
  filtersContainer;
  diets: string[] = [];
  healths = [];
  currentPage = 1;
  recipes = [];

  constructor(private loadingCtrl: LoadingController,
              private recipeService: RecipeService,
              private preferenceService: PreferenceService) {
  }

  ionViewWillEnter() {
    this.filtersContainer.style.display = 'none';

    this.preferenceService.loadPreferences().then((preferences) => {
      preferences[0].then((diet) => {
        diet.map((dieta) =>  // @ts-ignore
          this.diets.push(dieta.label));
      });
    });

    this.preferenceService.loadPreferences().then((preferences) => {
      preferences[1].then((health) => {
        health.map((salute) =>  // @ts-ignore
          this.healths.push(salute.label));
      });
    });

    this.dietTypes.value = this.diets;
    this.healthTypes.value = this.healths;

    this.recipes = [];
    this.loadRecipes();
  }

  ngOnInit() {
    this.filtersContainer = document.getElementById('filtersContainer');
  }

  async loadRecipes() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();

    this.recipeService.getFavorites().then(
      (res) => {
        for (const recipe of res) {
          this.recipeService.getRecipeDetails(recipe.id).subscribe((result) => {
            this.recipes.push(result);
          });
        }
        loading.dismiss();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //TODO: creare il filtro
  filter() {

  }

  //Mostra i filtri di ricerca
  async toggleFilterContainer() {
    this.filtersContainer.style.display = this.filtersContainer.style.display === 'none' ? 'block' : 'none';
  }

  //Reimposta tutti i filtri di ricerca a default
  async resetFilters() {
    this.dietTypes.value = '';
    this.healthTypes.value = '';
    this.mealTypes.value = '';
    this.cuisineTypes.value = '';
    this.dishTypes.value = '';
  }
}
