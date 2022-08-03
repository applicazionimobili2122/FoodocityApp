import {Component} from '@angular/core';
import {RecipeService} from '../../services/recipes.service';
import {LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage {

  recipes = [];

  constructor(private loadingCtrl: LoadingController,
              private recipeService: RecipeService) {
  }

  ionViewWillEnter() {
    this.recipes = [];
    this.loadRecipes();
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
}
