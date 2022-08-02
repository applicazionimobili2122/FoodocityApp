import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalPageComponent implements OnInit {
  pdfSrc: string;
  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {

  }
  closeModal() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
