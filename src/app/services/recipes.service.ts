import {HttpClient, HttpUrlEncodingCodec} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {IonicAuthService} from './auth.service';


export interface ApiResult {
  page: number;
  hits: any[];
  totalPages: number;
  totalResults: number;
}

@Injectable({
  providedIn: 'root',
})
export class RecipeService {

  constructor(private http: HttpClient,
              private ionicAuthService: IonicAuthService,
              private firestore: AngularFirestore) {
  }

  getSimpleSearch(query = ''): Observable<ApiResult> {
    return this.http.get<ApiResult>(
      `${environment.baseUrl}?q=${query}&app_key=${environment.appKey}&random=true`
    );
  }

  getAdvancedSearch(query = '',
                    diet: string[] = [],
                    health: string[] = [],
                    cuisineType: string[] = [],
                    mealType: string[] = [],
                    dishType: string[] = []): Observable<ApiResult> {

    let url = `${environment.baseUrl}?q=${query}&app_key=${environment.appKey}&random=true`;
    if (diet.length > 0) {
      diet.forEach(q => {
        if (!(q === '')) {
          url += `&diet=${q}`;
        }
      });
    }
    if (health.length > 0) {
      health.forEach(q => {
        if (!(q === '')) {
          url += `&health=${q}`;
        }
      });
    }
    if (cuisineType.length > 0) {
      cuisineType.forEach(q => {
        if (!(q === '')) {
          url += `&cuisine=${q}`;
        }
      });
    }
    if (mealType.length > 0) {
      mealType.forEach(q => {
        if (!(q === '')) {
          url += `&mealType=${q}`;
        }
      });
    }
    if (dishType.length > 0) {
      dishType.forEach(q => {
        if (!(q === '')) {
          url += `&dishType=${q}`;
        }
      });
    }

    console.log(url);

    return this.http.get<ApiResult>(
      url
    );
  }

  getRecipeDetails(id: string): Observable<any> {
    return this.http.get<ApiResult>(
      `${environment.baseUrl}/${id}/?app_key=${environment.appKey}`
    );
  }

  getRandomRecipes(): Observable<ApiResult> {
    const items = ['pizza', 'pasta', 'meat', 'fish', 'veggies'];
    const query = items[Math.floor(Math.random() * items.length)];

    return this.http.get<ApiResult>(
      `${environment.baseUrl}?q=${query}&app_key=${environment.appKey}&random=true`
    );
  }

  async favoriteRecipe(recipe) {
    const user = await this.ionicAuthService.userDetails();
    if (user) {
      const favorites = this.firestore.collection(`users/${user.uid}/favorites`);
      favorites.doc(recipe.substring(51)).get().subscribe(doc => {
        if (doc.exists) {
          favorites.doc(recipe.substring(51)).delete();
        } else {
          favorites.doc(recipe.substring(51)).set({
            id: recipe.substring(51),
          });
        }
      });
    }
  }

  async isFavoriteRecipe(recipe): Promise<boolean> {
    const user = await this.ionicAuthService.userDetails();
    if (user) {
      const favorites = this.firestore.collection(`users/${user.uid}/favorites`);
      return favorites.doc(recipe).get().toPromise().then((doc) => doc.exists);
    }
  }

  async getFavorites(): Promise<any> {
    const user = await this.ionicAuthService.userDetails();
    if (user) {
      const favorites = this.firestore.collection(`users/${user.uid}/favorites`);
      return favorites.get().toPromise().then((querySnapshot) => querySnapshot.docs.map(doc => doc.data()));
    } else {
      return [];
    }
  }
}

