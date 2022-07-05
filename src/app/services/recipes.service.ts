import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
  constructor(private http: HttpClient) {}

  getSimpleSearch(query = ''): Observable<ApiResult> {
    return this.http.get<ApiResult>(
      `${environment.baseUrl}?q=${query}&app_key=${environment.appKey}`
    );
  }

  getRecipeDetails(id: string): Observable<any> {
    return this.http.get<ApiResult>(
      `${environment.baseUrl}/${id}/?app_key=${environment.appKey}`
    );
  }

  getRandomRecipes(): Observable<ApiResult> {
    const items = ['pizza', 'pasta', 'meat', 'fish', 'veggies'];
    const query = items[Math.floor(Math.random()*items.length)];

    return this.http.get<ApiResult>(
      `${environment.baseUrl}?q=${query}&app_key=${environment.appKey}&random=true`
    );
  }
}
