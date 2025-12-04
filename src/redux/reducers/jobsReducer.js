// ========================================
// JOBS REDUCER
// ========================================
// Questo reducer gestisce SOLO i jobs (offerte di lavoro).
// Gestisce: la lista dei jobs, lo stato di caricamento, gli errori.
// Non sa nulla dei preferiti.
// Ha UNA sola responsabilità: gestire i jobs.
//

import { SET_JOBS, SET_LOADING, SET_ERROR } from "../actions/actionTypes";

// ========================================
// STATO INIZIALE PER I JOBS
// ========================================
// Questa è la "forma" che avrà la sezione "jobs" nel Redux Store
const initialState = {
  list: [], // Array di jobs ottenuti dalla fetch
  isLoading: false, // true quando la fetch è in corso
  error: "", // Messaggio di errore se la fetch fallisce
};

// ========================================
// REDUCER
// ========================================
/**
 * jobsReducer
 * Gestisce tutte le azioni relative ai jobs
 *
 * @param {object} state - Lo stato precedente (solo della sezione jobs)
 * @param {object} action - L'azione ricevuta
 * @returns {object} Il nuovo stato della sezione jobs
 */
const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_JOBS:
      // Quando arrivano i jobs dalla fetch
      // Salviamo l'array nel Redux Store
      return {
        ...state,
        list: action.payload, // action.payload contiene l'array di jobs
        error: "", // Azzeriamo l'errore (fetch riuscita)
      };

    case SET_LOADING:
      // Quando la fetch inizia o finisce
      // Aggiorniamo lo stato di caricamento
      return {
        ...state,
        isLoading: action.payload, // true quando sta caricando, false quando finisce
      };

    case SET_ERROR:
      // Quando la fetch fallisce
      // Salviamo il messaggio di errore
      return {
        ...state,
        error: action.payload, // action.payload contiene il messaggio di errore
      };

    default:
      // Se l'azione non è riconosciuta, ritorniamo lo stato senza modifiche
      return state;
  }
};

export default jobsReducer;
