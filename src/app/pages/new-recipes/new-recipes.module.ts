
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewRecipesPageRoutingModule } from './new-recipes-routing.module';

import { NewRecipesPage } from './new-recipes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewRecipesPageRoutingModule
  ],
  declarations: [NewRecipesPage]
})
export class NewRecipesPageModule {}
