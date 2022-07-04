export const USE_PROXY = true;

export const URL_BASE = USE_PROXY ? 'api' : 'http://localhost:8080/foodocity/api';

export const URL = {
    LOGIN: URL_BASE + '/login',
    LOGOUT: URL_BASE + '/logout',
    UPDATE_PROFILO: URL_BASE + '/utente/updateprofilo',
    UPDATE_PASSWORD: URL_BASE + '/utente/updatepassword',
    GESTIONE_RICETTE: URL_BASE + '/utente/ricette_preferite',
    GESTIONE_PREFERENZE: URL_BASE + '/utente/preferenze',
    RICETTEPREFERITE: URL_BASE + '/ricette_preferite',
    PREFERENZE: URL_BASE + '/preferenze',
};

export const X_AUTH = 'X-Auth';

export const AUTH_TOKEN = 'auth-token';

export const UTENTE_STORAGE = 'utente';

export const LINGUA = 'lingua';
