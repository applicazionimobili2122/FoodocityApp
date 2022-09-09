import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})

export class IonicAuthService {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore
  ) {
  }

  createUser(value) {
    return new Promise<any>(async (resolve, reject) => {
      const userCredential = await this.angularFireAuth.createUserWithEmailAndPassword(value.email, value.passwords.password);
      const user = userCredential.user;
      if (user) {
        const userRef = this.angularFirestore.doc(`users/${user.uid}`);
        const userData = {
          uid: user.uid,
          email: user.email,
        };
        await userRef.set(userData);
        resolve(userCredential);
      } else {
        reject(userCredential);
      }
    });
  }

  signinUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => {
            resolve(res);
          },
          err => reject(err));
    });
  }

  signoutUser() {
    return new Promise<void>((resolve, reject) => {
      if (this.angularFireAuth.currentUser) {
        this.angularFireAuth.signOut()
          .then(() => {
            resolve();
          }).catch(() => {
          reject();
        });
      }
    });
  }

  userDetails() {
    return this.angularFireAuth.currentUser;
  }

}
