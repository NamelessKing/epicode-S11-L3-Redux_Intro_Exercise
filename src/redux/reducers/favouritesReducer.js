// ========================================
// FAVOURITES REDUCER
// ========================================
// Questo reducer gestisce SOLO i preferiti (aziende).
// Non sa nulla di jobs, loading, o errori.
// Ha UNA sola responsabilità: gestire l'array dei preferiti.
//

import {
  ADD_TO_FAVOURITES,
  REMOVE_FROM_FAVOURITES,
} from "../actions/actionTypes";

// ========================================
// STATO INIZIALE PER I PREFERITI
// ========================================
// Questa è la "forma" che avrà la sezione "favourites" nel Redux Store
const initialState = {
  companies: [], // Array di nomi di aziende preferite
};

// ========================================
// REDUCER
// ========================================
/**
 * favouritesReducer
 * Gestisce tutte le azioni relative ai preferiti
 *
 * @param {object} state - Lo stato precedente (solo della sezione favourites)
 * @param {object} action - L'azione ricevuta
 * @returns {object} Il nuovo stato della sezione favourites
 */
const favouritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVOURITES:
      // Quando aggiungiamo un'azienda ai preferiti
      // Creiamo un NUOVO array con l'azienda nuova
      return {
        ...state, // Copia le altre proprietà (se ce ne fossero)
        companies: [...state.companies, action.payload],
        // Spread dell'array vecchio + il nuovo elemento
      };

    case REMOVE_FROM_FAVOURITES:
      // Quando rimuoviamo un'azienda dai preferiti
      // Filtriamo l'array per escludere quella azienda
      return {
        ...state,
        companies: state.companies.filter(
          (company) => company !== action.payload
          // Manteniamo solo le aziende diverse da quella da rimuovere
        ),
      };

    default:
      // Se l'azione non è riconosciuta, ritorniamo lo stato senza modifiche
      return state;
  }
};

export default favouritesReducer;
