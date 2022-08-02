import {Component, OnInit, ViewChild} from '@angular/core';
import {RecipeService} from '../../services/recipes.service';
import {
  InfiniteScrollCustomEvent,
  IonCard,
  IonInfiniteScroll,
  IonModal,
  LoadingController,
  ModalController
} from '@ionic/angular';
import {ModalPageComponent} from '../components/modal.component';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {

  @ViewChild('normalis') infiniteScroll: IonInfiniteScroll;
  @ViewChild('searchis') infiniteScroll2: IonInfiniteScroll;
  recipes = [];
  currentPage = 1;
  searchTerm = '';

  constructor(private recipeService: RecipeService,
              private loadingCtrl: LoadingController,
              private modalController: ModalController) { }

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

  async search(value) {
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
    }
  }

  async toggleFilterContainer() {
    const modal = await this.modalController.create({
      component: ModalPageComponent,
      cssClass: 'fullscreen'
    });
    return await modal.present();
  }
}
