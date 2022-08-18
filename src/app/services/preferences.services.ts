import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {IonicAuthService} from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PreferenceService {

  constructor(private http: HttpClient,
              private ionicAuthService: IonicAuthService,
              private firestore: AngularFirestore) {
  }

  async loadPreferences(): Promise<Promise<unknown[]>[]> {
    const user = await this.ionicAuthService.userDetails();
    if (user) {
      const diet = this.firestore.collection(`users/${user.uid}/diet`);
      const health = this.firestore.collection(`users/${user.uid}/health`);
      // eslint-disable-next-line max-len
      return [diet.get().toPromise().then((querySnapshot) => querySnapshot.docs.map(doc => doc.data())), health.get().toPromise().then((querySnapshot) => querySnapshot.docs.map(doc => doc.data()))];
    }
  }

  async savePreferences(diet: any, health: any) {
    const user = await this.ionicAuthService.userDetails();
    if (user) {
      const dietRef = this.firestore.collection(`users/${user.uid}/diet`);
      dietRef.get().subscribe(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          dietRef.doc(doc.id).delete();
        });
        diet.map((dieta) => dietRef.doc(dieta).set({
          label: dieta,
        }));
      });

      const healthRef = this.firestore.collection(`users/${user.uid}/health`);
      healthRef.get().subscribe(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          healthRef.doc(doc.id).delete();
        });
        health.map((salute) => healthRef.doc(salute).set({
          label: salute,
        }));
      });
    }
  }
}

