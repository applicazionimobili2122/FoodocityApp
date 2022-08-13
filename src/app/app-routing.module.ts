import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'recipes',
    loadChildren: () => import('./pages/recipes/recipes.module').then(m => m.RecipesPageModule)
  },
  {
    path: 'recipes/:id',
    loadChildren: () => import('./pages/recipes-details/recipes-details.module').then(m => m.RecipesDetailsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'favourites',
    loadChildren: () => import('./pages/favourites/favourites.module').then(m => m.FavouritesPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then(m => m.EditProfilePageModule)
  },
  {
    path:'new-recipes',
    loadChildren: () => import('./pages/new-recipes/new-recipes.module').then(m => m.NewRecipesPageModule)
  },
  {
    path: 'health',
    loadChildren: () => import('./pages/health/health.module').then(m => m.HealthPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
