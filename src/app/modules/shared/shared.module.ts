import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalPageComponent} from 'src/app/pages/components/modal.component';

@NgModule({
  declarations: [ModalPageComponent],
  imports: [
    CommonModule,
    Routing
  ],
  exports: [ModalPageComponent],
})
export class SharedComponentModule {
}
