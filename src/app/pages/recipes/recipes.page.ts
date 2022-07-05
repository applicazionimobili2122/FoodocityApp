import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../../services/recipes.service';
import {InfiniteScrollCustomEvent, LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {

  recipes = [];
  currentPage = 1;

  constructor(private recipeService: RecipeService,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadRecipes();
  }

  async loadRecipes(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();

    this.recipeService.getRandomRecipes().subscribe(
      (res) => {
        console.log(res);
        loading.dismiss();
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
}
