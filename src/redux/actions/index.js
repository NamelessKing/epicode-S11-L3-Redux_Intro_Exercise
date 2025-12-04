// ========================================
// IMPORTA LE COSTANTI DAI ACTION TYPES
// ========================================
import {
  ADD_TO_FAVOURITES,
  REMOVE_FROM_FAVOURITES,
  SET_JOBS,
  SET_LOADING,
  SET_ERROR,
} from "./actionTypes";

// ========================================
// ACTION CREATORS - FUNZIONI SINCRONE
// ========================================
// Queste funzioni creano gli oggetti "action" che verranno inviati al reducer.
// Sono "sincrone" perché ritornano SUBITO un oggetto azione.

/**
 * Action Creator: Aggiungere un'azienda ai preferiti
 * @param {string} companyName - Nome dell'azienda da aggiungere
 * @returns {object} Oggetto azione con type e payload
 */
export const addToFavouritesAction = (companyName) => {
  return {
    type: ADD_TO_FAVOURITES, // ← Usiamo la COSTANTE (no stringa!)
    payload: companyName, // Il nome dell'azienda da aggiungere
  };
};

/**
 * Action Creator: Rimuovere un'azienda dai preferiti
 * @param {string} companyName - Nome dell'azienda da rimuovere
 * @returns {object} Oggetto azione con type e payload
 */
export const removeFromFavouritesAction = (companyName) => {
  return {
    type: REMOVE_FROM_FAVOURITES, // ← Usiamo la COSTANTE (no stringa!)
    payload: companyName, // Il nome dell'azienda da rimuovere
  };
};

// ========================================
// ACTION CREATORS - FUNZIONE ASINCRONA (THUNK)
// ========================================
// Questo action creator ritorna una FUNZIONE invece di un oggetto.
// Redux-Thunk intercetta la funzione e l'esegue, passandole dispatch e getState.
// Qui possiamo fare operazioni asincrone (fetch, API calls, etc.)

/**
 * Action Creator Asincrono: Fetch dei Jobs
 * ⭐ Questo ritorna una FUNZIONE, non un oggetto!
 *
 * @param {string} query - La query di ricerca (es. "developer")
 * @returns {function} Una funzione che riceve (dispatch, getState) come parametri
 *
 * FLUSSO:
 * 1. dispatch(SET_LOADING, true) → "Sto caricando..."
 * 2. fetch() → Attendo la risposta
 * 3. Risposta OK → dispatch(SET_JOBS, data) → "Ecco i risultati"
 * 4. Errore → dispatch(SET_ERROR, errore) → "C'è stato un errore"
 * 5. dispatch(SET_LOADING, false) → "Ho finito di caricare"
 */
export const fetchJobsAction = (query) => {
  // ← Questa è la funzione che Redux-Thunk riceverà
  return (dispatch, getState) => {
    // dispatch: funzione per inviare azioni
    // getState: funzione per leggere lo stato attuale

    const baseEndpoint =
      "https://strive-benchmark.herokuapp.com/api/jobs?search=";

    // 1. Inizio il caricamento
    dispatch({ type: SET_LOADING, payload: true });

    // 2. Faccio la fetch
    fetch(baseEndpoint + query + "&limit=20")
      .then((response) => {
        // Se la risposta non è OK, lancia un errore
        if (response.ok) {
          return response.json(); // ← Ritorna la promessa del JSON
        } else {
          throw new Error("Errore nel recupero dei jobs");
        }
      })
      .then((data) => {
        // 3. Quando i dati arrivano...

        // Dispatchio l'azione SET_JOBS con i dati
        dispatch({ type: SET_JOBS, payload: data.data });

        // Faccio terminare il caricamento
        dispatch({ type: SET_LOADING, payload: false });

        // Azzero l'errore (caricamento riuscito)
        dispatch({ type: SET_ERROR, payload: "" });
      })
      .catch((error) => {
        // 4. Se c'è un errore...

        // Dispatchio l'azione SET_ERROR con il messaggio
        dispatch({ type: SET_ERROR, payload: error.message });

        // Faccio terminare il caricamento
        dispatch({ type: SET_LOADING, payload: false });
      });
  };
};

// ========================================
// ACTION CREATOR ASINCRONO - RICERCA PER AZIENDA
// ========================================
// Questo thunk è simile a fetchJobsAction, ma cerca per AZIENDA
// invece che per parola chiave.

/**
 * Action Creator Asincrono: Fetch dei Jobs per Azienda
 * ⭐ Questo ritorna una FUNZIONE (thunk)
 *
 * @param {string} companyName - Nome dell'azienda (es. "Google")
 * @returns {function} Una funzione che riceve (dispatch, getState)
 *
 * DIFFERENZA CON fetchJobsAction:
 * - Usa: ?company=Google (invece di ?search=developer)
 * - Non ha &limit=20 (mostra tutti i jobs dell'azienda)
 */
export const fetchJobsByCompanyAction = (companyName) => {
  return (dispatch, getState) => {
    const baseEndpoint =
      "https://strive-benchmark.herokuapp.com/api/jobs?company=";

    // 1. Inizio il caricamento
    dispatch({ type: SET_LOADING, payload: true });

    // 2. Faccio la fetch per l'azienda specifica
    fetch(baseEndpoint + companyName)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Errore nel recupero dei jobs per ${companyName}`);
        }
      })
      .then((data) => {
        // 3. Quando i dati arrivano...
        dispatch({ type: SET_JOBS, payload: data.data });
        dispatch({ type: SET_LOADING, payload: false });
        dispatch({ type: SET_ERROR, payload: "" });
      })
      .catch((error) => {
        // 4. Se c'è un errore...
        dispatch({ type: SET_ERROR, payload: error.message });
        dispatch({ type: SET_LOADING, payload: false });
      });
  };
};
