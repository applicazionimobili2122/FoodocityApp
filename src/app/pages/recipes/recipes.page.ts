import {Component, OnInit, ViewChild} from '@angular/core';
import {RecipeService} from '../../services/recipes.service';
import {
  InfiniteScrollCustomEvent,
  IonInfiniteScroll,
  IonSelect,
  LoadingController
} from '@ionic/angular';
import {PreferenceService} from '../../services/preferences.services';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {

  @ViewChild('normalis') infiniteScroll: IonInfiniteScroll;
  @ViewChild('searchis') infiniteScroll2: IonInfiniteScroll;
  @ViewChild('dietTypes') dietTypes: IonSelect;
  @ViewChild('healthTypes') healthTypes: IonSelect;
  @ViewChild('mealTypes') mealTypes: IonSelect;
  @ViewChild('cuisineTypes') cuisineTypes: IonSelect;
  @ViewChild('dishTypes') dishTypes: IonSelect;
  filtersContainer;
  recipes = [];
  diets: string[] = [];
  healths = [];
  currentPage = 1;
  searchTerm = '';

  constructor(private recipeService: RecipeService,
              private loadingCtrl: LoadingController,
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
  }

  ngOnInit() {
    this.loadRecipes();
    this.filtersContainer = document.getElementById('filtersContainer');
  }

  async loadRecipes(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();

    this.recipeService.getRandomRecipes().subscribe(
      (res) => {
        loading.dismiss();
        console.log(...res.hits);
        this.recipes.push(...res.hits);

        event?.target.complete();
        if (event) {
          event.target.disabled = res.totalPages === this.currentPage;
        }
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadRecipes(event);
  }

  loadMoreSearch(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.newSearch(event);
  }

  newSearch(event: InfiniteScrollCustomEvent) {
    this.recipeService.getSimpleSearch(this.searchTerm).subscribe(
      (res) => {
        this.recipes.push(...res.hits);
        event.target.complete();
        if (event) {
          event.target.disabled = res.totalPages === this.currentPage;
        }
      }, (err) => {
        console.log(err);
        event.target.complete();
      }
    );
  }

  async search(value, dietTypes, healthTypes, dishTypes, cuisineTypes, mealTypes) {
    if (value === '') {
      this.recipes = [];
      this.currentPage = 1;
      this.loadRecipes();
      this.infiniteScroll.disabled = false;
      this.infiniteScroll2.disabled = true;
    } else {
      const loading = await this.loadingCtrl.create({
        message: 'Loading..',
        spinner: 'bubbles',
      });
      await loading.present();
      if (dishTypes[0] === '' && cuisineTypes[0] === '' && mealTypes[0] === '' && healthTypes[0] === '' && dietTypes[0] === '') {
        this.recipeService.getSimpleSearch(value).subscribe(
          (res) => {
            loading.dismiss();
            this.recipes = [...res.hits];
            this.infiniteScroll.disabled = true;
            this.infiniteScroll2.disabled = false;
          },
          (err) => {
            console.log(err);
            loading.dismiss();
            this.recipes = [];
          }
        );
      } else {
        this.recipeService.getAdvancedSearch(value, dietTypes, healthTypes, cuisineTypes, mealTypes, dishTypes).subscribe(
          (res) => {
            loading.dismiss();
            this.recipes = [...res.hits];
            this.infiniteScroll.disabled = true;
            this.infiniteScroll2.disabled = false;
          },
          (err) => {
            console.log(err);
            loading.dismiss();
            this.recipes = [];
          }
        );
      }
    }
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
