import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewRecipesPage } from './new-recipes.page';

const routes: Routes = [
  {
    path: '',
    component: NewRecipesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewRecipesPageRoutingModule {}
