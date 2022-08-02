// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appKey: '7d200e1b43a9ec871e660650f3ab6075&app_id=7889584e&type=public',
  baseUrl: 'https://api.edamam.com/api/recipes/v2',

  firebase: {
    apiKey: 'AIzaSyBy6BbtBiqdDHI6Gwf83VxXUXgKGsAwVQM',
    authDomain: 'foodocity-58ee2.firebaseapp.com',
    projectId: 'foodocity-58ee2',
    storageBucket: 'foodocity-58ee2.appspot.com',
    messagingSenderId: '56402199271',
    appId: '1:56402199271:web:0bb9d7badcb2ed064a1842'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
