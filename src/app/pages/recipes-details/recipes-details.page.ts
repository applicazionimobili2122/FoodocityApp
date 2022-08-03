import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RecipeService} from '../../services/recipes.service';

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.page.html',
  styleUrls: ['./recipes-details.page.scss'],
})
export class RecipesDetailsPage implements OnInit {
  recipe = null;
  isFavorite: boolean;
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.recipeService.getRecipeDetails(id).subscribe((res) => {
      this.recipe = res;
      this.isFavoriteRecipe(this.recipe.recipe.uri).then((result) => {
        this.isFavorite = result;
      });
    });
  }

  openHomepage(url) {
    window.open(url, '_blank');
  }

  favorite(recipe) {
    if (this.isFavorite) {
      this.recipeService.favoriteRecipe(recipe);
      this.isFavorite = false;
    } else {
      this.recipeService.favoriteRecipe(recipe);
      this.isFavorite = true;
    }
  }

  isFavoriteRecipe(recipe) {
    return this.recipeService.isFavoriteRecipe(recipe.substring(51));
  }
}
